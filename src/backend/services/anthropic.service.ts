/**
 * Anthropic Claude API Service
 * Handles streaming responses and API integration
 */

import Anthropic from '@anthropic-ai/sdk';
import { MessageCreateParamsStreaming, Message } from '@anthropic-ai/sdk/resources/messages';

// Configuration
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;
const DEFAULT_MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
const DEFAULT_MAX_TOKENS = parseInt(process.env.ANTHROPIC_MAX_TOKENS || '4096');

// Rate limiting constants
const RATE_LIMIT = {
  requestsPerMinute: 60,
  requestsPerHour: 1000,
};

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface StreamChunk {
  type: 'content_block_start' | 'content_block_delta' | 'content_block_stop' | 'message_start' | 'message_delta' | 'message_stop';
  delta?: {
    type: string;
    text?: string;
  };
  content_block?: {
    type: string;
    text?: string;
  };
  message?: Partial<Message>;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
  };
}

export interface StreamOptions {
  onChunk?: (chunk: StreamChunk) => void;
  onComplete?: (fullResponse: string, usage: { input_tokens: number; output_tokens: number }) => void;
  onError?: (error: Error) => void;
}

export class AnthropicService {
  private client: Anthropic;
  private requestCount: Map<string, { count: number; resetTime: number }> = new Map();

  constructor() {
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    this.client = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });
  }

  /**
   * Check rate limits before making request
   */
  private checkRateLimit(identifier: string): boolean {
    const now = Date.now();
    const record = this.requestCount.get(identifier);

    if (!record || now > record.resetTime) {
      // Reset the counter
      this.requestCount.set(identifier, {
        count: 1,
        resetTime: now + 60000, // 1 minute
      });
      return true;
    }

    if (record.count >= RATE_LIMIT.requestsPerMinute) {
      return false;
    }

    record.count++;
    return true;
  }

  /**
   * Convert chat messages to Anthropic format
   */
  private formatMessages(messages: ChatMessage[]): MessageCreateParamsStreaming['messages'] {
    return messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));
  }

  /**
   * Extract system message if present
   */
  private extractSystemMessage(messages: ChatMessage[]): string | undefined {
    const systemMsg = messages.find(msg => msg.role === 'system');
    return systemMsg?.content;
  }

  /**
   * Stream chat completion with real-time chunks
   */
  async streamChatCompletion(
    messages: ChatMessage[],
    options: StreamOptions = {},
    identifier: string = 'default'
  ): Promise<ReadableStream> {
    // Check rate limit
    if (!this.checkRateLimit(identifier)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    const formattedMessages = this.formatMessages(messages);
    const systemMessage = this.extractSystemMessage(messages);

    if (formattedMessages.length === 0) {
      throw new Error('No valid messages to send');
    }

    try {
      const stream = await this.client.messages.stream({
        model: DEFAULT_MODEL,
        max_tokens: DEFAULT_MAX_TOKENS,
        messages: formattedMessages,
        ...(systemMessage && { system: systemMessage }),
        stream: true,
      });

      let fullResponse = '';
      let inputTokens = 0;
      let outputTokens = 0;

      // Create a readable stream
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              // Track tokens
              if (chunk.type === 'message_start') {
                inputTokens = chunk.message.usage?.input_tokens || 0;
              }

              if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                const text = chunk.delta.text || '';
                fullResponse += text;

                // Send chunk to client
                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify({ type: 'content', text })}\n\n`)
                );

                // Call onChunk callback
                if (options.onChunk) {
                  options.onChunk(chunk as StreamChunk);
                }
              }

              if (chunk.type === 'message_delta') {
                outputTokens = chunk.usage?.output_tokens || 0;
              }

              if (chunk.type === 'message_stop') {
                // Send completion event
                controller.enqueue(
                  new TextEncoder().encode(
                    `data: ${JSON.stringify({
                      type: 'done',
                      usage: { input_tokens: inputTokens, output_tokens: outputTokens }
                    })}\n\n`
                  )
                );

                // Call onComplete callback
                if (options.onComplete) {
                  options.onComplete(fullResponse, {
                    input_tokens: inputTokens,
                    output_tokens: outputTokens,
                  });
                }

                controller.close();
              }
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown streaming error';
            controller.enqueue(
              new TextEncoder().encode(`data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`)
            );

            if (options.onError) {
              options.onError(error as Error);
            }

            controller.close();
          }
        },
      });

      return readableStream;
    } catch (error) {
      if (options.onError) {
        options.onError(error as Error);
      }
      throw error;
    }
  }

  /**
   * Non-streaming chat completion
   */
  async chatCompletion(
    messages: ChatMessage[],
    identifier: string = 'default'
  ): Promise<{ content: string; usage: { input_tokens: number; output_tokens: number } }> {
    // Check rate limit
    if (!this.checkRateLimit(identifier)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    const formattedMessages = this.formatMessages(messages);
    const systemMessage = this.extractSystemMessage(messages);

    if (formattedMessages.length === 0) {
      throw new Error('No valid messages to send');
    }

    try {
      const response = await this.client.messages.create({
        model: DEFAULT_MODEL,
        max_tokens: DEFAULT_MAX_TOKENS,
        messages: formattedMessages,
        ...(systemMessage && { system: systemMessage }),
      });

      const content = response.content[0]?.type === 'text' ? response.content[0].text : '';

      return {
        content,
        usage: {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Analyze conversation for lead scoring
   */
  async analyzeConversation(messages: ChatMessage[]): Promise<{
    score: {
      engagement: number;
      intent: number;
      budget: number;
      timeline: number;
      qualification: number;
    };
    signals: string[];
    summary: string;
  }> {
    const analysisPrompt = `Analyze this conversation and provide lead scoring:

Conversation:
${messages.map(m => `${m.role}: ${m.content}`).join('\n')}

Provide a JSON response with:
1. Scores (0-20 for each):
   - engagement: How engaged is the user
   - intent: Buying signals strength
   - budget: Budget indicators
   - timeline: Urgency/timeline clarity
   - qualification: Overall qualification

2. signals: Array of key signals detected
3. summary: Brief summary of the conversation

Format: { "score": {...}, "signals": [...], "summary": "..." }`;

    try {
      const response = await this.chatCompletion([
        {
          role: 'system',
          content: 'You are a lead qualification expert. Analyze conversations and provide scoring in JSON format.',
        },
        {
          role: 'user',
          content: analysisPrompt,
        },
      ]);

      const analysis = JSON.parse(response.content);
      return analysis;
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      // Return default scores on error
      return {
        score: {
          engagement: 0,
          intent: 0,
          budget: 0,
          timeline: 0,
          qualification: 0,
        },
        signals: [],
        summary: 'Analysis failed',
      };
    }
  }

  /**
   * Generate conversation summary
   */
  async generateSummary(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await this.chatCompletion([
        {
          role: 'system',
          content: 'You are a conversation summarizer. Create concise, informative summaries.',
        },
        {
          role: 'user',
          content: `Summarize this conversation in 2-3 sentences:\n\n${messages
            .map(m => `${m.role}: ${m.content}`)
            .join('\n')}`,
        },
      ]);

      return response.content;
    } catch (error) {
      console.error('Error generating summary:', error);
      return 'Summary generation failed';
    }
  }
}

// Export singleton instance
export const anthropicService = new AnthropicService();
