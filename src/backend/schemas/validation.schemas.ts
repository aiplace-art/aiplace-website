/**
 * Zod Validation Schemas
 * Form validation and data validation schemas for AiPlace website
 */

import { z } from 'zod';

// ============================================
// CONTACT FORM SCHEMAS
// ============================================

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().max(100).optional(),
  formType: z.enum(['GENERAL', 'CONSULTATION', 'QUOTE', 'SUPPORT']).default('GENERAL'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),

  // Optional fields for specific form types
  serviceType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectDetails: z.string().max(10000).optional(),

  // Metadata
  source: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ============================================
// NEWSLETTER SCHEMAS
// ============================================

export const newsletterSubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2).max(100).optional(),
  categories: z.array(z.enum(['web-dev', 'ai', 'business', 'blockchain'])).optional(),
  frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']).default('WEEKLY'),
  source: z.string().optional(),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;

export const newsletterConfirmSchema = z.object({
  token: z.string().min(1, 'Confirmation token is required'),
});

export const newsletterUnsubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  token: z.string().optional(),
});

export const newsletterPreferencesSchema = z.object({
  categories: z.array(z.enum(['web-dev', 'ai', 'business', 'blockchain'])),
  frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
});

// ============================================
// CONSULTATION BOOKING SCHEMAS
// ============================================

export const consultationBookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[\d\s\+\-\(\)]+$/, 'Invalid phone number').optional(),
  company: z.string().max(100).optional(),

  serviceType: z.enum([
    'web-development',
    'ai-solutions',
    'business-planning',
    'tokenomics',
    'other',
  ]),

  preferredDate: z.string().datetime().or(z.date()),
  alternateDate: z.string().datetime().or(z.date()).optional(),
  duration: z.number().min(30).max(180).default(60),

  projectBrief: z.string().min(20, 'Please provide more details about your project').max(5000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  urgency: z.enum(['LOW', 'NORMAL', 'HIGH', 'URGENT']).default('NORMAL'),

  // Metadata
  source: z.string().optional(),
  recaptchaToken: z.string().optional(),
}).refine(
  (data) => {
    const preferred = new Date(data.preferredDate);
    return preferred > new Date();
  },
  {
    message: 'Preferred date must be in the future',
    path: ['preferredDate'],
  }
);

export type ConsultationBookingInput = z.infer<typeof consultationBookingSchema>;

// ============================================
// BLOG SCHEMAS
// ============================================

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().min(50).max(500),
  content: z.string().min(100, 'Content must be at least 100 characters'),
  coverImage: z.string().url().optional(),

  authorId: z.string().optional(),
  category: z.enum(['Web Dev', 'AI', 'Business', 'Blockchain']),
  tags: z.array(z.string()).default([]),

  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).default([]),

  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  publishedAt: z.string().datetime().or(z.date()).optional(),
  scheduledFor: z.string().datetime().or(z.date()).optional(),

  sanityId: z.string().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const blogPostUpdateSchema = blogPostSchema.partial().required({ slug: true });

export const blogCommentSchema = z.object({
  postId: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  website: z.string().url().optional().or(z.literal('')),
  content: z.string().min(5, 'Comment must be at least 5 characters').max(2000),
  parentId: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

export type BlogCommentInput = z.infer<typeof blogCommentSchema>;

// ============================================
// PORTFOLIO SCHEMAS
// ============================================

export const portfolioSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  client: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),

  description: z.string().min(50).max(2000),
  challenge: z.string().min(50).max(2000),
  solution: z.string().min(50).max(2000),
  results: z.string().min(50).max(2000),

  coverImage: z.string().url().optional(),
  images: z.array(z.string().url()).default([]),
  videoUrl: z.string().url().optional(),

  category: z.enum(['WEB', 'AI', 'BLOCKCHAIN', 'CONSULTING']),
  services: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),

  projectDuration: z.string().optional(),
  teamSize: z.number().int().positive().optional(),
  metrics: z.record(z.any()).optional(),

  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),

  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().or(z.date()).optional(),

  sanityId: z.string().optional(),
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;

export const portfolioUpdateSchema = portfolioSchema.partial().required({ slug: true });

// ============================================
// TESTIMONIAL SCHEMAS
// ============================================

export const testimonialSchema = z.object({
  clientName: z.string().min(2).max(100),
  clientRole: z.string().max(100).optional(),
  clientCompany: z.string().max(100).optional(),
  clientImage: z.string().url().optional(),

  content: z.string().min(20, 'Testimonial must be at least 20 characters').max(1000),
  rating: z.number().int().min(1).max(5).default(5),

  serviceType: z.string().optional(),
  portfolioId: z.string().optional(),

  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

// ============================================
// SERVICE SCHEMAS
// ============================================

export const serviceSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  icon: z.string(),
  description: z.string().min(50).max(2000),
  features: z.array(z.string()).min(1),

  priceFrom: z.number().positive().optional(),
  priceTo: z.number().positive().optional(),
  priceModel: z.enum(['fixed', 'hourly', 'project-based']).optional(),

  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

// ============================================
// USER SCHEMAS
// ============================================

export const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER']).default('EDITOR'),
  image: z.string().url().optional(),
});

export type UserInput = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ============================================
// QUERY PARAMETER SCHEMAS
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

export const blogQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  tag: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  search: z.string().optional(),
});

export type BlogQueryParams = z.infer<typeof blogQuerySchema>;

export const portfolioQuerySchema = paginationSchema.extend({
  category: z.enum(['WEB', 'AI', 'BLOCKCHAIN', 'CONSULTING']).optional(),
  service: z.string().optional(),
  technology: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});

export type PortfolioQueryParams = z.infer<typeof portfolioQuerySchema>;

export const contactQuerySchema = paginationSchema.extend({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATION', 'WON', 'LOST', 'ARCHIVED']).optional(),
  formType: z.enum(['GENERAL', 'CONSULTATION', 'QUOTE', 'SUPPORT']).optional(),
  search: z.string().optional(),
});

export type ContactQueryParams = z.infer<typeof contactQuerySchema>;

// ============================================
// CRM INTEGRATION SCHEMAS
// ============================================

export const crmContactSchema = z.object({
  contactId: z.string(),
  crmProvider: z.enum(['hubspot', 'salesforce', 'pipedrive', 'custom']),
  syncData: z.boolean().default(true),
  createDeal: z.boolean().default(false),
  dealValue: z.number().optional(),
  dealStage: z.string().optional(),
});

export type CrmContactInput = z.infer<typeof crmContactSchema>;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Validate data against a schema and return formatted errors
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.format();
    return {
      success: false,
      errors,
      data: null,
    };
  }

  return {
    success: true,
    errors: null,
    data: result.data,
  };
}

/**
 * Validate and throw error if validation fails
 */
export function validateOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}
