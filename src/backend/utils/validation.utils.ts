/**
 * Validation Utilities
 * Request validation helpers
 */

import { z } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Validate request data against a Zod schema
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: any
): ValidationResult<T> {
  try {
    const validated = schema.parse(data);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return {
        success: false,
        errors,
      };
    }

    return {
      success: false,
      errors: [{ field: 'unknown', message: 'Validation failed' }],
    };
  }
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .slice(0, 10000); // Max length
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+?1[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Extract and validate session ID
 */
export function validateSessionId(sessionId: string | null | undefined): string | null {
  if (!sessionId || typeof sessionId !== 'string') return null;

  // Session ID should be alphanumeric with hyphens, 16-64 chars
  const sessionRegex = /^[A-Za-z0-9-]{16,64}$/;
  return sessionRegex.test(sessionId) ? sessionId : null;
}
