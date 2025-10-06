/**
 * Conversation Management Service
 * Handles conversation storage, retrieval, and context management
 */

import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/prisma';

// Local type definitions (Prisma client may not be generated yet)
type MessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM';
type ConversationStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED' | 'TRANSFERRED' | 'BLOCKED';
type LeadQuality = 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH' | 'QUALIFIED';
type Sentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'MIXED';

export interface ConversationContext {
  visitorId?: string;
  sessionId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export interface MessageInput {
  role: MessageRole | string;
  content: string;
  model?: string;
  tokens?: number;
  finishReason?: string;
  contextUsed?: Record<string, any>;
  toolCalls?: Record<string, any>;
}

export interface ConversationWithMessages {
  messages: any[];
  [key: string]: any;
}

export class ConversationService {
  private prisma: PrismaClient;
  private readonly MAX_CONTEXT_MESSAGES = 20; // Keep last 20 messages for context
  private readonly CONVERSATION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  constructor() {
    this.prisma = prisma;
  }

  /**
   * Create or retrieve active conversation
   */
  async getOrCreateConversation(context: ConversationContext): Promise<any> {
    try {
      // Try to find existing active conversation
      let conversation = await this.prisma.conversation.findFirst({
        where: {
          sessionId: context.sessionId,
          status: 'ACTIVE',
          lastMessageAt: {
            gte: new Date(Date.now() - this.CONVERSATION_TIMEOUT),
          },
        },
      });

      if (!conversation) {
        // Create new conversation
        conversation = await this.prisma.conversation.create({
          data: {
            sessionId: context.sessionId,
            visitorId: context.visitorId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            context: context.metadata,
            status: 'ACTIVE',
            startedAt: new Date(),
            lastMessageAt: new Date(),
          },
        });
      }

      return conversation;
    } catch (error) {
      console.error('Error in getOrCreateConversation:', error);
      throw new Error('Failed to retrieve or create conversation');
    }
  }

  /**
   * Add message to conversation
   */
  async addMessage(conversationId: string, messageInput: MessageInput): Promise<any> {
    try {
      const message = await this.prisma.message.create({
        data: {
          conversationId,
          role: messageInput.role,
          content: messageInput.content,
          model: messageInput.model,
          tokens: messageInput.tokens,
          finishReason: messageInput.finishReason,
          contextUsed: messageInput.contextUsed,
          toolCalls: messageInput.toolCalls,
        },
      });

      // Update conversation stats
      await this.updateConversationStats(conversationId, messageInput.tokens || 0);

      return message;
    } catch (error) {
      console.error('Error adding message:', error);
      throw new Error('Failed to add message');
    }
  }

  /**
   * Get conversation context (recent messages)
   */
  async getConversationContext(conversationId: string, limit?: number): Promise<any[]> {
    try {
      const messages = await this.prisma.message.findMany({
        where: {
          conversationId,
          deleted: false,
        },
        orderBy: {
          timestamp: 'desc',
        },
        take: limit || this.MAX_CONTEXT_MESSAGES,
      });

      return messages.reverse(); // Return in chronological order
    } catch (error) {
      console.error('Error getting conversation context:', error);
      throw new Error('Failed to retrieve conversation context');
    }
  }

  /**
   * Update conversation statistics
   */
  private async updateConversationStats(conversationId: string, tokensUsed: number): Promise<void> {
    try {
      await this.prisma.conversation.update({
        where: { id: conversationId },
        data: {
          messageCount: { increment: 1 },
          totalTokens: { increment: tokensUsed },
          lastMessageAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Error updating conversation stats:', error);
    }
  }

  /**
   * Update conversation metadata
   */
  async updateConversation(
    conversationId: string,
    updates: {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      title?: string;
      tags?: string[];
      status?: ConversationStatus;
      sentiment?: Sentiment;
      leadQuality?: LeadQuality;
      interestedServices?: string[];
    }
  ): Promise<any> {
    try {
      return await this.prisma.conversation.update({
        where: { id: conversationId },
        data: updates,
      });
    } catch (error) {
      console.error('Error updating conversation:', error);
      throw new Error('Failed to update conversation');
    }
  }

  /**
   * Mark conversation as completed
   */
  async completeConversation(conversationId: string): Promise<any> {
    try {
      const conversation = await this.prisma.conversation.update({
        where: { id: conversationId },
        data: {
          status: 'COMPLETED',
          endedAt: new Date(),
        },
        include: {
          messages: true,
        },
      });

      // Calculate total duration
      const duration = Math.floor(
        (conversation.endedAt!.getTime() - conversation.startedAt.getTime()) / 1000
      );

      await this.prisma.conversation.update({
        where: { id: conversationId },
        data: { duration },
      });

      return conversation;
    } catch (error) {
      console.error('Error completing conversation:', error);
      throw new Error('Failed to complete conversation');
    }
  }

  /**
   * Get conversation by ID with messages
   */
  async getConversationById(conversationId: string): Promise<ConversationWithMessages | null> {
    try {
      return await this.prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            where: { deleted: false },
            orderBy: { timestamp: 'asc' },
          },
        },
      });
    } catch (error) {
      console.error('Error getting conversation:', error);
      return null;
    }
  }

  /**
   * Get conversations by email
   */
  async getConversationsByEmail(email: string): Promise<any[]> {
    try {
      return await this.prisma.conversation.findMany({
        where: { email },
        orderBy: { startedAt: 'desc' },
      });
    } catch (error) {
      console.error('Error getting conversations by email:', error);
      return [];
    }
  }

  /**
   * Get recent conversations with filters
   */
  async getConversations(filters: {
    status?: ConversationStatus;
    leadQuality?: LeadQuality;
    limit?: number;
    offset?: number;
  }): Promise<{ conversations: any[]; total: number }> {
    try {
      const where: any = {};

      if (filters.status) {
        where.status = filters.status;
      }

      if (filters.leadQuality) {
        where.leadQuality = filters.leadQuality;
      }

      const [conversations, total] = await Promise.all([
        this.prisma.conversation.findMany({
          where,
          orderBy: { startedAt: 'desc' },
          take: filters.limit || 50,
          skip: filters.offset || 0,
        }),
        this.prisma.conversation.count({ where }),
      ]);

      return { conversations, total };
    } catch (error) {
      console.error('Error getting conversations:', error);
      return { conversations: [], total: 0 };
    }
  }

  /**
   * Flag conversation for review
   */
  async flagConversation(conversationId: string, reason: string): Promise<any> {
    try {
      return await this.prisma.conversation.update({
        where: { id: conversationId },
        data: {
          flagged: true,
          flagReason: reason,
        },
      });
    } catch (error) {
      console.error('Error flagging conversation:', error);
      throw new Error('Failed to flag conversation');
    }
  }

  /**
   * Review flagged conversation
   */
  async reviewConversation(conversationId: string, reviewedBy: string): Promise<any> {
    try {
      return await this.prisma.conversation.update({
        where: { id: conversationId },
        data: {
          reviewedBy,
          reviewedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Error reviewing conversation:', error);
      throw new Error('Failed to review conversation');
    }
  }

  /**
   * Extract contact information from messages
   */
  extractContactInfo(messages: any[]): {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  } {
    const contactInfo: any = {};
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b(\+?1[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}\b/;

    messages.forEach(msg => {
      if (msg.role === 'USER') {
        // Extract email
        const emailMatch = msg.content.match(emailRegex);
        if (emailMatch && !contactInfo.email) {
          contactInfo.email = emailMatch[0];
        }

        // Extract phone
        const phoneMatch = msg.content.match(phoneRegex);
        if (phoneMatch && !contactInfo.phone) {
          contactInfo.phone = phoneMatch[0];
        }

        // Extract name (simple heuristic)
        if (msg.content.toLowerCase().includes('my name is')) {
          const nameMatch = msg.content.match(/my name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
          if (nameMatch && !contactInfo.name) {
            contactInfo.name = nameMatch[1];
          }
        }

        // Extract company
        if (msg.content.toLowerCase().includes('work at') || msg.content.toLowerCase().includes('work for')) {
          const companyMatch = msg.content.match(/work (?:at|for)\s+([A-Z][a-zA-Z0-9\s&]+)/i);
          if (companyMatch && !contactInfo.company) {
            contactInfo.company = companyMatch[1].trim();
          }
        }
      }
    });

    return contactInfo;
  }

  /**
   * Auto-update conversation with extracted contact info
   */
  async autoUpdateContactInfo(conversationId: string): Promise<void> {
    try {
      const messages = await this.getConversationContext(conversationId);
      const contactInfo = this.extractContactInfo(messages);

      if (Object.keys(contactInfo).length > 0) {
        await this.updateConversation(conversationId, contactInfo);
      }
    } catch (error) {
      console.error('Error auto-updating contact info:', error);
    }
  }
}

// Export singleton instance
export const conversationService = new ConversationService();
