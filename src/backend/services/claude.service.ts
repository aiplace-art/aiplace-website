/**
 * Claude Service
 * Handles all interactions with Anthropic's Claude API
 */

import Anthropic from '@anthropic-ai/sdk';
import { AI_CONFIG, SYSTEM_PROMPTS } from '../config/ai-assistant.config';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeStreamOptions {
  onToken?: (token: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

class ClaudeService {
  private client: Anthropic;
  private model: string;

  constructor() {
    this.client = new Anthropic({
      apiKey: AI_CONFIG.anthropic.apiKey,
    });
    this.model = AI_CONFIG.anthropic.model;
  }

  /**
   * Send a message to Claude and get a streaming response
   */
  async sendMessageStream(
    messages: ClaudeMessage[],
    systemPrompt: string = SYSTEM_PROMPTS.main,
    options: ClaudeStreamOptions = {}
  ): Promise<string> {
    try {
      let fullResponse = '';

      const stream = await this.client.messages.stream({
        model: this.model,
        max_tokens: AI_CONFIG.anthropic.maxTokens,
        temperature: AI_CONFIG.anthropic.temperature,
        top_p: AI_CONFIG.anthropic.topP,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      // Handle streaming tokens
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          const token = chunk.delta.text;
          fullResponse += token;

          if (options.onToken) {
            options.onToken(token);
          }
        }
      }

      if (options.onComplete) {
        options.onComplete(fullResponse);
      }

      return fullResponse;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error occurred');

      if (options.onError) {
        options.onError(err);
      }

      throw err;
    }
  }

  /**
   * Send a message to Claude and get a complete response
   */
  async sendMessage(
    messages: ClaudeMessage[],
    systemPrompt: string = SYSTEM_PROMPTS.main
  ): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: AI_CONFIG.anthropic.maxTokens,
        temperature: AI_CONFIG.anthropic.temperature,
        top_p: AI_CONFIG.anthropic.topP,
        system: systemPrompt,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      // Extract text content from the response
      const textContent = response.content.find((block) => block.type === 'text');
      return textContent && textContent.type === 'text' ? textContent.text : '';
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to get response from AI assistant');
    }
  }

  /**
   * Analyze conversation for lead qualification
   */
  async analyzeForLeadQualification(
    conversationHistory: ClaudeMessage[]
  ): Promise<{
    qualified: boolean;
    score: number;
    insights: {
      budget?: string;
      timeline?: string;
      serviceType?: string;
      decisionAuthority?: string;
      urgency?: string;
    };
  }> {
    const analysisPrompt = `Analyze this conversation and extract lead qualification information:

1. Budget indication (if mentioned)
2. Timeline (if mentioned)
3. Service type of interest
4. Decision-making authority
5. Project urgency

Respond in JSON format:
{
  "budget": "estimated budget or range",
  "timeline": "estimated timeline",
  "serviceType": "web development | ai solutions | business planning | tokenomics",
  "decisionAuthority": "decision maker | influencer | researcher",
  "urgency": "urgent | moderate | low"
}

Only include fields that were explicitly or implicitly mentioned. Return {} if no relevant information found.`;

    try {
      const messages: ClaudeMessage[] = [
        ...conversationHistory,
        { role: 'user', content: analysisPrompt },
      ];

      const response = await this.sendMessage(messages, SYSTEM_PROMPTS.main);

      // Parse JSON response
      const insights = JSON.parse(response);

      // Calculate score based on available information
      let score = 0;

      if (insights.budget) score += 25;
      if (insights.timeline) score += 20;
      if (insights.serviceType) score += 20;
      if (insights.decisionAuthority === 'decision maker') score += 25;
      if (insights.urgency === 'urgent') score += 10;

      const qualified = score >= AI_CONFIG.leadQualification.minimumScore;

      return {
        qualified,
        score,
        insights,
      };
    } catch (error) {
      console.error('Lead analysis error:', error);
      return {
        qualified: false,
        score: 0,
        insights: {},
      };
    }
  }

  /**
   * Generate a project estimate based on conversation
   */
  async generateEstimate(
    projectDetails: {
      serviceType: string;
      features: string[];
      complexity: 'simple' | 'medium' | 'complex' | 'enterprise';
      timeline: string;
    }
  ): Promise<{
    costMin: number;
    costMax: number;
    timelineEstimate: string;
    recommendedServices: string[];
  }> {
    const { serviceType, complexity, timeline } = projectDetails;

    // Get base rate for service type
    const baseRate =
      AI_CONFIG.estimation.baseRates[
        serviceType as keyof typeof AI_CONFIG.estimation.baseRates
      ] || AI_CONFIG.estimation.baseRates.webDevelopment;

    // Apply complexity multiplier
    const complexityMultiplier =
      AI_CONFIG.estimation.complexityMultipliers[complexity];

    // Calculate cost range
    const costMin = Math.round(baseRate * complexityMultiplier);
    const costMax = Math.round(costMin * 1.5);

    // Determine timeline
    let timelineEstimate = '3-6 months';
    if (complexity === 'simple') timelineEstimate = '1-2 months';
    if (complexity === 'medium') timelineEstimate = '2-4 months';
    if (complexity === 'complex') timelineEstimate = '4-8 months';
    if (complexity === 'enterprise') timelineEstimate = '6-12 months';

    // Recommend additional services
    const recommendedServices: string[] = [];
    if (serviceType === 'webDevelopment') {
      recommendedServices.push('SEO optimization', 'Analytics setup', 'Performance monitoring');
    } else if (serviceType === 'aiSolutions') {
      recommendedServices.push('Model training', 'API integration', 'Ongoing optimization');
    } else if (serviceType === 'tokenomics') {
      recommendedServices.push('Smart contract audit', 'Whitepaper', 'Community management');
    }

    return {
      costMin,
      costMax,
      timelineEstimate,
      recommendedServices,
    };
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!AI_CONFIG.anthropic.apiKey && AI_CONFIG.anthropic.apiKey.length > 0;
  }
}

// Export singleton instance
export const claudeService = new ClaudeService();
export default claudeService;
