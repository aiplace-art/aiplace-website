/**
 * Analytics Service
 * Track and analyze conversation metrics
 */

import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/prisma';

// Define analytics event types locally
type AnalyticsEvent = 'MESSAGE_SENT' | 'MESSAGE_RECEIVED' | 'FEEDBACK_RECEIVED' | 'LEAD_QUALIFIED' | 'ERROR_OCCURRED';

export interface AnalyticsEventInput {
  conversationId?: string;
  eventType: AnalyticsEvent | string;
  eventData?: Record<string, any>;
  sessionId?: string;
  visitorId?: string;
  responseTime?: number;
  tokensUsed?: number;
  userSatisfaction?: number;
  feedback?: string;
}

export interface AnalyticsReport {
  totalConversations: number;
  activeConversations: number;
  completedConversations: number;
  averageMessageCount: number;
  averageResponseTime: number;
  totalTokensUsed: number;
  leadQualityDistribution: Record<string, number>;
  sentimentDistribution: Record<string, number>;
  topServices: Array<{ service: string; count: number }>;
  conversionRate: number;
}

export class AnalyticsService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  /**
   * Track analytics event
   */
  async trackEvent(event: AnalyticsEventInput): Promise<void> {
    try {
      await this.prisma.chatAnalytics.create({
        data: {
          conversationId: event.conversationId,
          eventType: event.eventType,
          eventData: event.eventData,
          sessionId: event.sessionId,
          visitorId: event.visitorId,
          responseTime: event.responseTime,
          tokensUsed: event.tokensUsed,
          userSatisfaction: event.userSatisfaction,
          feedback: event.feedback,
        },
      });
    } catch (error) {
      console.error('Error tracking analytics event:', error);
      // Don't throw - analytics should not break main flow
    }
  }

  /**
   * Get analytics report for a date range
   */
  async getAnalyticsReport(startDate: Date, endDate: Date): Promise<AnalyticsReport> {
    try {
      // Get conversations in range
      const conversations = await this.prisma.conversation.findMany({
        where: {
          startedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          messages: true,
        },
      });

      const total = conversations.length;
      const active = conversations.filter((c: any) => c.status === 'ACTIVE').length;
      const completed = conversations.filter((c: any) => c.status === 'COMPLETED').length;

      // Calculate averages
      const totalMessages = conversations.reduce((sum: number, c: any) => sum + c.messageCount, 0);
      const avgMessageCount = total > 0 ? totalMessages / total : 0;

      // Get response times
      const responseTimes = await this.prisma.chatAnalytics.findMany({
        where: {
          createdAt: { gte: startDate, lte: endDate },
          responseTime: { not: null },
        },
        select: { responseTime: true },
      });

      const avgResponseTime = responseTimes.length > 0
        ? responseTimes.reduce((sum: number, r: any) => sum + (r.responseTime || 0), 0) / responseTimes.length
        : 0;

      // Total tokens
      const totalTokens = conversations.reduce((sum: number, c: any) => sum + c.totalTokens, 0);

      // Lead quality distribution
      const leadQualityDist: Record<string, number> = {};
      conversations.forEach((c: any) => {
        leadQualityDist[c.leadQuality] = (leadQualityDist[c.leadQuality] || 0) + 1;
      });

      // Sentiment distribution
      const sentimentDist: Record<string, number> = {};
      conversations.forEach((c: any) => {
        sentimentDist[c.sentiment] = (sentimentDist[c.sentiment] || 0) + 1;
      });

      // Top services
      const serviceCount: Record<string, number> = {};
      conversations.forEach((c: any) => {
        c.interestedServices.forEach((service: string) => {
          serviceCount[service] = (serviceCount[service] || 0) + 1;
        });
      });

      const topServices = Object.entries(serviceCount)
        .map(([service, count]) => ({ service, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Conversion rate (appointments booked / total qualified leads)
      const qualified = conversations.filter((c: any) => c.leadQuality === 'QUALIFIED' || c.leadQuality === 'HIGH').length;
      const booked = conversations.filter((c: any) => c.appointmentBooked).length;
      const conversionRate = qualified > 0 ? (booked / qualified) * 100 : 0;

      return {
        totalConversations: total,
        activeConversations: active,
        completedConversations: completed,
        averageMessageCount: Math.round(avgMessageCount * 10) / 10,
        averageResponseTime: Math.round(avgResponseTime),
        totalTokensUsed: totalTokens,
        leadQualityDistribution: leadQualityDist,
        sentimentDistribution: sentimentDist,
        topServices,
        conversionRate: Math.round(conversionRate * 10) / 10,
      };
    } catch (error) {
      console.error('Error generating analytics report:', error);
      throw new Error('Failed to generate analytics report');
    }
  }

  /**
   * Get conversation metrics
   */
  async getConversationMetrics(conversationId: string) {
    try {
      const events = await this.prisma.chatAnalytics.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'asc' },
      });

      const responseTimesRaw = events
        .filter((e: any) => e.responseTime !== null)
        .map((e: any) => e.responseTime!);

      const avgResponseTime = responseTimesRaw.length > 0
        ? responseTimesRaw.reduce((a: number, b: number) => a + b, 0) / responseTimesRaw.length
        : 0;

      const totalTokens = events
        .filter((e: any) => e.tokensUsed !== null)
        .reduce((sum: number, e: any) => sum + (e.tokensUsed || 0), 0);

      const eventTypes = events.reduce((acc: any, e: any) => {
        acc[e.eventType] = (acc[e.eventType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalEvents: events.length,
        averageResponseTime: Math.round(avgResponseTime),
        totalTokens,
        eventTypes,
        feedback: events.filter((e: any) => e.feedback).map((e: any) => ({
          satisfaction: e.userSatisfaction,
          feedback: e.feedback,
          createdAt: e.createdAt,
        })),
      };
    } catch (error) {
      console.error('Error getting conversation metrics:', error);
      return null;
    }
  }

  /**
   * Track rate limit event
   */
  async trackRateLimit(ipAddress: string, endpoint: string, identifier?: string): Promise<void> {
    try {
      const windowStart = new Date();
      const windowEnd = new Date(windowStart.getTime() + 60000); // 1 minute window

      // Check existing rate limit log
      const existing = await this.prisma.rateLimitLog.findFirst({
        where: {
          ipAddress,
          endpoint,
          windowStart: { lte: new Date() },
          windowEnd: { gte: new Date() },
        },
      });

      if (existing) {
        await this.prisma.rateLimitLog.update({
          where: { id: existing.id },
          data: { requestCount: { increment: 1 } },
        });
      } else {
        await this.prisma.rateLimitLog.create({
          data: {
            ipAddress,
            identifier,
            endpoint,
            requestCount: 1,
            windowStart,
            windowEnd,
          },
        });
      }

      // Track as analytics event
      await this.trackEvent({
        eventType: 'RATE_LIMITED',
        eventData: { ipAddress, endpoint },
      });
    } catch (error) {
      console.error('Error tracking rate limit:', error);
    }
  }

  /**
   * Check if rate limited
   */
  async checkRateLimit(ipAddress: string, endpoint: string, limit: number = 60): Promise<boolean> {
    try {
      const now = new Date();

      const record = await this.prisma.rateLimitLog.findFirst({
        where: {
          ipAddress,
          endpoint,
          windowStart: { lte: now },
          windowEnd: { gte: now },
        },
      });

      if (!record) return false;

      return record.requestCount >= limit;
    } catch (error) {
      console.error('Error checking rate limit:', error);
      return false;
    }
  }

  /**
   * Get analytics summary
   */
  async getSummary(days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.getAnalyticsReport(startDate, new Date());
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
