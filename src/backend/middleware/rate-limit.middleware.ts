/**
 * Rate Limiting Middleware
 * Prevent abuse and ensure fair usage
 */

import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '../services/analytics.service';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message?: string;
  skipSuccessfulRequests?: boolean;
}

// Default configurations for different endpoints
export const RATE_LIMITS = {
  CHAT_STREAM: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 requests per minute
    message: 'Too many chat requests. Please wait a moment.',
  },
  CHAT_MESSAGE: {
    windowMs: 60 * 1000,
    maxRequests: 60,
    message: 'Too many messages. Please slow down.',
  },
  CONVERSATION_CREATE: {
    windowMs: 60 * 1000,
    maxRequests: 10,
    message: 'Too many conversation requests.',
  },
  LEAD_SCORING: {
    windowMs: 60 * 1000,
    maxRequests: 20,
    message: 'Too many scoring requests.',
  },
  ADMIN_API: {
    windowMs: 60 * 1000,
    maxRequests: 100,
    message: 'Rate limit exceeded for admin API.',
  },
};

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limit middleware
 */
export async function rateLimitMiddleware(
  req: NextRequest,
  config: RateLimitConfig
): Promise<NextResponse | null> {
  try {
    // Get client identifier
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const identifier = `${ip}-${req.nextUrl.pathname}`;

    const now = Date.now();
    const record = rateLimitStore.get(identifier);

    // Clean up expired records
    if (record && now > record.resetTime) {
      rateLimitStore.delete(identifier);
    }

    // Check rate limit
    if (!record || now > record.resetTime) {
      // Create new record
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return null; // Allow request
    }

    // Increment counter
    record.count++;

    if (record.count > config.maxRequests) {
      // Rate limit exceeded
      await analyticsService.trackRateLimit(ip, req.nextUrl.pathname);

      return NextResponse.json(
        {
          error: config.message || 'Rate limit exceeded',
          retryAfter: Math.ceil((record.resetTime - now) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((record.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': Math.max(0, config.maxRequests - record.count).toString(),
            'X-RateLimit-Reset': new Date(record.resetTime).toISOString(),
          },
        }
      );
    }

    // Request allowed
    return null;
  } catch (error) {
    console.error('Rate limit middleware error:', error);
    // Don't block on errors
    return null;
  }
}

/**
 * Create rate limiter for specific config
 */
export function createRateLimiter(config: RateLimitConfig) {
  return async (req: NextRequest) => {
    return rateLimitMiddleware(req, config);
  };
}

/**
 * IP-based rate limiter
 */
export async function ipRateLimit(req: NextRequest, maxRequests: number = 100): Promise<boolean> {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  const isLimited = await analyticsService.checkRateLimit(ip, 'global', maxRequests);

  if (isLimited) {
    await analyticsService.trackRateLimit(ip, 'global');
  }

  return isLimited;
}

/**
 * Clean up old rate limit records (call periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  const keysToDelete: string[] = [];

  rateLimitStore.forEach((record, key) => {
    if (now > record.resetTime) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach(key => rateLimitStore.delete(key));

  return keysToDelete.length;
}

// Cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
