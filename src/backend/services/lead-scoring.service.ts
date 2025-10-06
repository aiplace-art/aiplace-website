/**
 * Lead Scoring Service
 * Intelligent lead qualification using conversation analysis
 */

import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { anthropicService, ChatMessage } from './anthropic.service';

// Local type definitions
type LeadQuality = 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH' | 'QUALIFIED';

interface LeadScoreComponents {
  engagementScore: number;
  intentScore: number;
  budgetScore: number;
  timelineScore: number;
  qualificationScore: number;
}

interface LeadScoreResult {
  id: string;
  conversationId: string;
  engagementScore: number;
  intentScore: number;
  budgetScore: number;
  timelineScore: number;
  qualificationScore: number;
  totalScore: number;
  leadQuality: LeadQuality;
  signals: string[];
  keywords: string[];
  summary: string;
  recommendations: string;
}

export class LeadScoringService {
  private prisma: PrismaClient;

  // Scoring constants
  private readonly ENGAGEMENT_MAX = 20;
  private readonly INTENT_MAX = 20;
  private readonly BUDGET_MAX = 20;
  private readonly TIMELINE_MAX = 20;
  private readonly QUALIFICATION_MAX = 20;

  // Keywords for scoring
  private readonly INTENT_KEYWORDS = [
    'need', 'want', 'looking for', 'interested in', 'help me', 'build', 'develop',
    'create', 'solution', 'project', 'hire', 'work with', 'partner', 'implement'
  ];

  private readonly BUDGET_KEYWORDS = [
    'budget', 'cost', 'price', 'invest', 'spend', 'afford', 'funding',
    'range', '$', 'thousand', 'million', 'investment'
  ];

  private readonly TIMELINE_KEYWORDS = [
    'urgent', 'asap', 'soon', 'immediately', 'deadline', 'timeline', 'when',
    'launch', 'start', 'ready', 'quick', 'fast', 'this week', 'this month'
  ];

  private readonly QUALIFICATION_KEYWORDS = [
    'ceo', 'founder', 'director', 'manager', 'decision maker', 'authorized',
    'company', 'business', 'team', 'organization', 'startup', 'enterprise'
  ];

  constructor() {
    this.prisma = prisma;
  }

  /**
   * Calculate comprehensive lead score
   */
  async calculateLeadScore(conversation: {
    id: string;
    messages: any[];
  }): Promise<LeadScoreResult> {
    try {
      const messages = conversation.messages;

      // Calculate individual scores
      const engagementScore = this.calculateEngagementScore(messages);
      const { intentScore, intentSignals } = this.calculateIntentScore(messages);
      const { budgetScore, budgetSignals } = this.calculateBudgetScore(messages);
      const { timelineScore, timelineSignals } = this.calculateTimelineScore(messages);
      const { qualificationScore, qualificationSignals } = this.calculateQualificationScore(messages);

      // Calculate total score
      const totalScore = engagementScore + intentScore + budgetScore + timelineScore + qualificationScore;

      // Determine lead quality
      const leadQuality = this.determineLeadQuality(totalScore);

      // Collect all signals and keywords
      const allSignals = [
        ...intentSignals,
        ...budgetSignals,
        ...timelineSignals,
        ...qualificationSignals,
      ];

      const keywords = this.extractKeywords(messages);

      // Use AI for deeper analysis
      const aiAnalysis = await this.getAIAnalysis(messages);

      // Save to database
      const leadScore = await this.prisma.leadScore.create({
        data: {
          conversationId: conversation.id,
          engagementScore,
          intentScore,
          budgetScore,
          timelineScore,
          qualificationScore,
          totalScore,
          signals: { signals: allSignals },
          keywords,
          summary: aiAnalysis.summary,
          recommendations: aiAnalysis.recommendations,
        },
      });

      return {
        ...leadScore,
        leadQuality,
        signals: allSignals,
      };
    } catch (error) {
      console.error('Error calculating lead score:', error);
      throw new Error('Failed to calculate lead score');
    }
  }

  /**
   * Calculate engagement score based on message count and quality
   */
  private calculateEngagementScore(messages: any[]): number {
    const userMessages = messages.filter(m => m.role === 'USER');

    if (userMessages.length === 0) return 0;

    // Factors: message count, message length, questions asked
    const messageCount = Math.min(userMessages.length, 10); // Cap at 10
    const avgLength = userMessages.reduce((sum, m) => sum + m.content.length, 0) / userMessages.length;
    const questionCount = userMessages.filter(m => m.content.includes('?')).length;

    const score = (
      (messageCount / 10) * 8 + // 8 points for message count
      (Math.min(avgLength, 200) / 200) * 7 + // 7 points for message length
      (Math.min(questionCount, 5) / 5) * 5 // 5 points for questions
    );

    return Math.round(Math.min(score, this.ENGAGEMENT_MAX));
  }

  /**
   * Calculate intent score based on buying signals
   */
  private calculateIntentScore(messages: any[]): { intentScore: number; intentSignals: string[] } {
    const content = messages.map(m => m.content.toLowerCase()).join(' ');
    const signals: string[] = [];

    let score = 0;

    // Check for intent keywords
    this.INTENT_KEYWORDS.forEach(keyword => {
      if (content.includes(keyword)) {
        score += 2;
        signals.push(`Intent: "${keyword}"`);
      }
    });

    // Bonus for specific service mentions
    const services = ['web development', 'ai solution', 'blockchain', 'consulting'];
    services.forEach(service => {
      if (content.includes(service)) {
        score += 3;
        signals.push(`Service interest: ${service}`);
      }
    });

    return {
      intentScore: Math.round(Math.min(score, this.INTENT_MAX)),
      intentSignals: signals.slice(0, 5), // Limit to top 5
    };
  }

  /**
   * Calculate budget score
   */
  private calculateBudgetScore(messages: any[]): { budgetScore: number; budgetSignals: string[] } {
    const content = messages.map(m => m.content.toLowerCase()).join(' ');
    const signals: string[] = [];

    let score = 0;

    // Check for budget keywords
    this.BUDGET_KEYWORDS.forEach(keyword => {
      if (content.includes(keyword)) {
        score += 3;
        signals.push(`Budget indicator: "${keyword}"`);
      }
    });

    // Bonus for specific budget ranges
    if (/\$\d+k|\$\d+,\d+|\d+\s*thousand|\d+\s*million/i.test(content)) {
      score += 5;
      signals.push('Specific budget mentioned');
    }

    return {
      budgetScore: Math.round(Math.min(score, this.BUDGET_MAX)),
      budgetSignals: signals.slice(0, 5),
    };
  }

  /**
   * Calculate timeline score
   */
  private calculateTimelineScore(messages: any[]): { timelineScore: number; timelineSignals: string[] } {
    const content = messages.map(m => m.content.toLowerCase()).join(' ');
    const signals: string[] = [];

    let score = 0;

    // Check for timeline keywords
    this.TIMELINE_KEYWORDS.forEach(keyword => {
      if (content.includes(keyword)) {
        score += 2;
        signals.push(`Timeline: "${keyword}"`);
      }
    });

    // Bonus for urgency
    if (content.includes('urgent') || content.includes('asap') || content.includes('immediately')) {
      score += 5;
      signals.push('High urgency detected');
    }

    return {
      timelineScore: Math.round(Math.min(score, this.TIMELINE_MAX)),
      timelineSignals: signals.slice(0, 5),
    };
  }

  /**
   * Calculate qualification score
   */
  private calculateQualificationScore(messages: any[]): { qualificationScore: number; qualificationSignals: string[] } {
    const content = messages.map(m => m.content.toLowerCase()).join(' ');
    const signals: string[] = [];

    let score = 0;

    // Check for qualification keywords
    this.QUALIFICATION_KEYWORDS.forEach(keyword => {
      if (content.includes(keyword)) {
        score += 2;
        signals.push(`Qualification: "${keyword}"`);
      }
    });

    // Bonus for decision-making authority
    if (content.includes('ceo') || content.includes('founder') || content.includes('owner')) {
      score += 5;
      signals.push('Decision maker identified');
    }

    // Bonus for contact info provided
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b(\+?1[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}\b/;

    if (emailRegex.test(content)) {
      score += 3;
      signals.push('Email provided');
    }

    if (phoneRegex.test(content)) {
      score += 3;
      signals.push('Phone provided');
    }

    return {
      qualificationScore: Math.round(Math.min(score, this.QUALIFICATION_MAX)),
      qualificationSignals: signals.slice(0, 5),
    };
  }

  /**
   * Determine lead quality from total score
   */
  private determineLeadQuality(totalScore: number): LeadQuality {
    if (totalScore >= 80) return 'QUALIFIED';
    if (totalScore >= 60) return 'HIGH';
    if (totalScore >= 40) return 'MEDIUM';
    if (totalScore >= 20) return 'LOW';
    return 'UNKNOWN';
  }

  /**
   * Extract important keywords from messages
   */
  private extractKeywords(messages: any[]): string[] {
    const allKeywords = [
      ...this.INTENT_KEYWORDS,
      ...this.BUDGET_KEYWORDS,
      ...this.TIMELINE_KEYWORDS,
      ...this.QUALIFICATION_KEYWORDS,
    ];

    const content = messages.map(m => m.content.toLowerCase()).join(' ');
    const foundKeywords = allKeywords.filter(keyword => content.includes(keyword));

    return [...new Set(foundKeywords)].slice(0, 10); // Unique, top 10
  }

  /**
   * Get AI-powered analysis
   */
  private async getAIAnalysis(messages: any[]): Promise<{ summary: string; recommendations: string }> {
    try {
      const chatMessages: ChatMessage[] = messages.map(m => ({
        role: m.role.toLowerCase() as 'user' | 'assistant' | 'system',
        content: m.content,
      }));

      const analysis = await anthropicService.analyzeConversation(chatMessages);

      return {
        summary: analysis.summary || 'Analysis unavailable',
        recommendations: analysis.signals.join('; ') || 'No specific recommendations',
      };
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      return {
        summary: 'AI analysis failed',
        recommendations: 'Manual review recommended',
      };
    }
  }

  /**
   * Get latest lead score for a conversation
   */
  async getLatestScore(conversationId: string) {
    try {
      return await this.prisma.leadScore.findFirst({
        where: { conversationId },
        orderBy: { calculatedAt: 'desc' },
      });
    } catch (error) {
      console.error('Error getting latest score:', error);
      return null;
    }
  }

  /**
   * Get lead scores with filters
   */
  async getLeadScores(filters: {
    minScore?: number;
    limit?: number;
    offset?: number;
  }) {
    try {
      const where: any = {};

      if (filters.minScore !== undefined) {
        where.totalScore = { gte: filters.minScore };
      }

      return await this.prisma.leadScore.findMany({
        where,
        include: {
          conversation: {
            select: {
              id: true,
              sessionId: true,
              name: true,
              email: true,
              company: true,
              status: true,
            },
          },
        },
        orderBy: { totalScore: 'desc' },
        take: filters.limit || 50,
        skip: filters.offset || 0,
      });
    } catch (error) {
      console.error('Error getting lead scores:', error);
      return [];
    }
  }
}

// Export singleton instance
export const leadScoringService = new LeadScoringService();
