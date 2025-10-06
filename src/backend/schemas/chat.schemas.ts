/**
 * Chat Validation Schemas
 * Zod schemas for validating chat-related requests
 */

import { z } from 'zod';

/**
 * Chat message schema
 */
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(10000),
});

/**
 * Start conversation schema
 */
export const startConversationSchema = z.object({
  sessionId: z.string().min(1),
  visitorId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

/**
 * Send message schema
 */
export const sendMessageSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(10000),
  conversationId: z.string().optional(),
});

/**
 * Stream chat schema
 */
export const streamChatSchema = z.object({
  conversationId: z.string(),
  message: z.string().min(1).max(10000),
  includeContext: z.boolean().optional().default(true),
  maxContextMessages: z.number().min(1).max(50).optional().default(20),
});

/**
 * Update conversation schema
 */
export const updateConversationSchema = z.object({
  conversationId: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  tags: z.array(z.string()).optional(),
  interestedServices: z.array(z.string()).optional(),
});

/**
 * Lead scoring schema
 */
export const leadScoringSchema = z.object({
  conversationId: z.string(),
  forceRecalculate: z.boolean().optional().default(false),
});

/**
 * Conversation query schema
 */
export const conversationQuerySchema = z.object({
  status: z.enum(['ACTIVE', 'COMPLETED', 'ABANDONED', 'TRANSFERRED', 'BLOCKED']).optional(),
  leadQuality: z.enum(['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'QUALIFIED']).optional(),
  limit: z.number().min(1).max(100).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});

/**
 * Flag conversation schema
 */
export const flagConversationSchema = z.object({
  conversationId: z.string(),
  reason: z.string().min(1).max(500),
});

/**
 * Review conversation schema
 */
export const reviewConversationSchema = z.object({
  conversationId: z.string(),
  reviewedBy: z.string(),
  notes: z.string().optional(),
});

/**
 * Analytics event schema
 */
export const analyticsEventSchema = z.object({
  conversationId: z.string().optional(),
  eventType: z.enum([
    'CONVERSATION_STARTED',
    'MESSAGE_SENT',
    'MESSAGE_RECEIVED',
    'LEAD_QUALIFIED',
    'APPOINTMENT_REQUESTED',
    'APPOINTMENT_BOOKED',
    'CONVERSATION_ENDED',
    'ERROR_OCCURRED',
    'RATE_LIMITED',
    'FEEDBACK_RECEIVED',
  ]),
  eventData: z.record(z.any()).optional(),
  sessionId: z.string().optional(),
  visitorId: z.string().optional(),
  responseTime: z.number().optional(),
  tokensUsed: z.number().optional(),
  userSatisfaction: z.number().min(1).max(5).optional(),
  feedback: z.string().optional(),
});

/**
 * Appointment booking schema
 */
export const appointmentBookingSchema = z.object({
  conversationId: z.string(),
  preferredDate: z.string().datetime(),
  alternateDate: z.string().datetime().optional(),
  serviceType: z.string(),
  notes: z.string().optional(),
});

/**
 * Feedback schema
 */
export const feedbackSchema = z.object({
  conversationId: z.string(),
  rating: z.number().min(1).max(5),
  feedback: z.string().max(1000).optional(),
});

/**
 * Admin query schema
 */
export const adminQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['ACTIVE', 'COMPLETED', 'ABANDONED', 'TRANSFERRED', 'BLOCKED']).optional(),
  leadQuality: z.enum(['UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'QUALIFIED']).optional(),
  flagged: z.boolean().optional(),
  minLeadScore: z.number().min(0).max(100).optional(),
  limit: z.number().min(1).max(200).optional().default(50),
  offset: z.number().min(0).optional().default(0),
});

/**
 * Export conversation schema
 */
export const exportConversationSchema = z.object({
  conversationId: z.string(),
  format: z.enum(['json', 'csv', 'txt']).optional().default('json'),
  includeMessages: z.boolean().optional().default(true),
  includeAnalytics: z.boolean().optional().default(false),
});

// Type exports
export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type StartConversation = z.infer<typeof startConversationSchema>;
export type SendMessage = z.infer<typeof sendMessageSchema>;
export type StreamChat = z.infer<typeof streamChatSchema>;
export type UpdateConversation = z.infer<typeof updateConversationSchema>;
export type LeadScoring = z.infer<typeof leadScoringSchema>;
export type ConversationQuery = z.infer<typeof conversationQuerySchema>;
export type FlagConversation = z.infer<typeof flagConversationSchema>;
export type ReviewConversation = z.infer<typeof reviewConversationSchema>;
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
export type AppointmentBooking = z.infer<typeof appointmentBookingSchema>;
export type Feedback = z.infer<typeof feedbackSchema>;
export type AdminQuery = z.infer<typeof adminQuerySchema>;
export type ExportConversation = z.infer<typeof exportConversationSchema>;
