/**
 * Backend Type Definitions
 * Shared types for backend services
 */

import { Prisma } from '@prisma/client';

// ============================================
// API TYPES
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
    [key: string]: any;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    timestamp: string;
    pagination: PaginationMeta;
  };
}

// ============================================
// DATABASE TYPES
// ============================================
// Note: These types require Prisma client to be generated
// Using any for now to avoid build errors

export type ContactWithRelations = any;
export type BlogPostWithAuthor = any;
export type PortfolioWithTestimonials = any;

// ============================================
// EMAIL TYPES
// ============================================

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

// ============================================
// CRM TYPES
// ============================================

export type CRMProvider = 'hubspot' | 'salesforce' | 'pipedrive' | 'custom';

export interface CRMContact {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  [key: string]: any;
}

export interface CRMDeal {
  id: string;
  name: string;
  value?: number;
  stage?: string;
  contactId: string;
  [key: string]: any;
}

export interface CRMSyncResult {
  success: boolean;
  crmId?: string;
  error?: string;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface PageViewData {
  path: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  device?: string;
  browser?: string;
  sessionId?: string;
}

export interface AnalyticsStats {
  total: number;
  today: number;
  week: number;
  month: number;
}

// ============================================
// WEBHOOK TYPES
// ============================================

export interface WebhookPayload {
  event: string;
  provider: string;
  timestamp: string;
  data: any;
}

export interface WebhookResponse {
  received: boolean;
  processed: boolean;
  error?: string;
}

// ============================================
// FORM TYPES
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  formType: string;
  message: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
  projectDetails?: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: string;
  preferredDate: Date;
  alternateDate?: Date;
  duration: number;
  projectBrief: string;
  budget?: string;
  timeline?: string;
  urgency: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
  categories?: string[];
  frequency: string;
}

// ============================================
// UTILITY TYPES
// ============================================

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncResult<T, E = Error> = Promise<
  | { success: true; data: T }
  | { success: false; error: E }
>;

export type WithTimestamps<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

export type WithSoftDelete<T> = T & {
  deletedAt: Date | null;
};

// ============================================
// MIDDLEWARE TYPES
// ============================================

export interface RequestContext {
  user?: any;
  session?: any;
  ip: string;
  userAgent: string;
  timestamp: Date;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: Date;
}

// ============================================
// ERROR TYPES
// ============================================

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}
