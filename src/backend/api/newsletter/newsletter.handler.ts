/**
 * Newsletter API Handler
 * Handles newsletter subscriptions and management
 */

import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';
import {
  newsletterSubscribeSchema,
  newsletterConfirmSchema,
  newsletterUnsubscribeSchema,
  newsletterPreferencesSchema,
  NewsletterSubscribeInput,
} from '../../schemas/validation.schemas';
import { validateData } from '../../schemas/validation.schemas';
import {
  sendNewsletterConfirmation,
  sendNewsletterWelcome,
} from '../../services/email.service';
import { extractMetadata, handlePrismaError } from '../../utils/database.utils';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
} from '../../utils/response.utils';
import { generateToken, checkRateLimit } from '../../utils/security.utils';

/**
 * POST /api/newsletter/subscribe
 * Subscribe to newsletter
 */
export async function handleNewsletterSubscribe(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input
    const validation = validateData(newsletterSubscribeSchema, body);
    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data as NewsletterSubscribeInput;

    // Rate limiting by email
    const rateLimit = checkRateLimit(`newsletter:${data.email}`, 5, 3600000); // 5 requests per hour
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.retryAfter);
    }

    // Extract metadata
    const metadata = extractMetadata(req);

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      if (existing.status === 'SUBSCRIBED') {
        return errorResponse(
          'This email is already subscribed to our newsletter',
          409,
          'ALREADY_SUBSCRIBED'
        );
      }

      // Resubscribe if previously unsubscribed
      if (existing.status === 'UNSUBSCRIBED') {
        const confirmToken = generateToken();

        const subscriber = await prisma.newsletter.update({
          where: { email: data.email },
          data: {
            status: 'PENDING',
            name: data.name || existing.name,
            categories: data.categories || existing.categories,
            frequency: data.frequency || existing.frequency,
            confirmToken,
            confirmedAt: null,
            unsubscribedAt: null,
            source: data.source || metadata.source,
          },
        });

        // Send confirmation email
        await sendNewsletterConfirmation({
          email: subscriber.email,
          name: subscriber.name || undefined,
          confirmToken,
        });

        return successResponse({
          message: 'Please check your email to confirm your subscription',
          email: subscriber.email,
        });
      }
    }

    // Create new subscription
    const confirmToken = generateToken();

    const subscriber = await prisma.newsletter.create({
      data: {
        email: data.email,
        name: data.name,
        categories: data.categories || [],
        frequency: data.frequency,
        status: 'PENDING',
        confirmToken,
        source: data.source || metadata.source,
        ipAddress: metadata.ipAddress,
      },
    });

    // Send confirmation email
    await sendNewsletterConfirmation({
      email: subscriber.email,
      name: subscriber.name || undefined,
      confirmToken,
    });

    return successResponse(
      {
        message: 'Please check your email to confirm your subscription',
        email: subscriber.email,
      },
      201
    );
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * POST /api/newsletter/confirm
 * Confirm newsletter subscription
 */
export async function handleNewsletterConfirm(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(newsletterConfirmSchema, body);
    if (!validation.success || !validation.data) {
      return validationErrorResponse(validation.errors);
    }

    const { token } = validation.data;

    // Find subscriber by token
    const subscriber = await prisma.newsletter.findFirst({
      where: {
        confirmToken: token,
        status: 'PENDING',
      },
    });

    if (!subscriber) {
      return errorResponse(
        'Invalid or expired confirmation token',
        400,
        'INVALID_TOKEN'
      );
    }

    // Confirm subscription
    const confirmed = await prisma.newsletter.update({
      where: { id: subscriber.id },
      data: {
        status: 'SUBSCRIBED',
        confirmedAt: new Date(),
        confirmToken: null,
      },
    });

    // Send welcome email
    await sendNewsletterWelcome({
      email: confirmed.email,
      name: confirmed.name || undefined,
    });

    return successResponse({
      message: 'Your subscription has been confirmed!',
      email: confirmed.email,
    });
  } catch (error: any) {
    console.error('Newsletter confirmation error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * POST /api/newsletter/unsubscribe
 * Unsubscribe from newsletter
 */
export async function handleNewsletterUnsubscribe(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(newsletterUnsubscribeSchema, body);
    if (!validation.success || !validation.data) {
      return validationErrorResponse(validation.errors);
    }

    const { email } = validation.data;

    // Find subscriber
    const subscriber = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return errorResponse('Email not found in our newsletter list', 404, 'NOT_FOUND');
    }

    if (subscriber.status === 'UNSUBSCRIBED') {
      return errorResponse('This email is already unsubscribed', 400, 'ALREADY_UNSUBSCRIBED');
    }

    // Unsubscribe
    const unsubscribed = await prisma.newsletter.update({
      where: { email },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date(),
      },
    });

    return successResponse({
      message: 'You have been successfully unsubscribed from our newsletter',
      email: unsubscribed.email,
    });
  } catch (error: any) {
    console.error('Newsletter unsubscribe error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/newsletter/preferences/:email
 * Get subscriber preferences
 */
export async function handleGetPreferences(email: string) {
  try {
    const subscriber = await prisma.newsletter.findUnique({
      where: { email },
      select: {
        email: true,
        name: true,
        categories: true,
        frequency: true,
        status: true,
        subscribedAt: true,
      },
    });

    if (!subscriber) {
      return errorResponse('Email not found in our newsletter list', 404, 'NOT_FOUND');
    }

    return successResponse(subscriber);
  } catch (error: any) {
    console.error('Get preferences error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/newsletter/preferences/:email
 * Update subscriber preferences
 */
export async function handleUpdatePreferences(email: string, req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(newsletterPreferencesSchema, body);
    if (!validation.success || !validation.data) {
      return validationErrorResponse(validation.errors);
    }

    const { categories, frequency } = validation.data;

    const subscriber = await prisma.newsletter.update({
      where: { email },
      data: {
        categories,
        frequency,
      },
    });

    return successResponse({
      message: 'Your preferences have been updated',
      preferences: {
        categories: subscriber.categories,
        frequency: subscriber.frequency,
      },
    });
  } catch (error: any) {
    console.error('Update preferences error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/newsletter/subscribers
 * Get all subscribers (Admin only)
 */
export async function handleGetSubscribers(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.categories = {
        has: category,
      };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [subscribers, total] = await Promise.all([
      prisma.newsletter.findMany({
        where,
        skip,
        take: limit,
        orderBy: { subscribedAt: 'desc' },
      }),
      prisma.newsletter.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return successResponse(subscribers, 200, {
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error: any) {
    console.error('Get subscribers error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/newsletter/stats
 * Get newsletter statistics (Admin only)
 */
export async function handleGetNewsletterStats() {
  try {
    const [
      total,
      subscribed,
      pending,
      unsubscribed,
      categoryCounts,
      frequencyCounts,
      recentSubscribers,
    ] = await Promise.all([
      prisma.newsletter.count(),
      prisma.newsletter.count({ where: { status: 'SUBSCRIBED' } }),
      prisma.newsletter.count({ where: { status: 'PENDING' } }),
      prisma.newsletter.count({ where: { status: 'UNSUBSCRIBED' } }),
      prisma.newsletter.findMany({
        where: { status: 'SUBSCRIBED' },
        select: { categories: true },
      }),
      prisma.newsletter.groupBy({
        by: ['frequency'],
        where: { status: 'SUBSCRIBED' },
        _count: true,
      }),
      prisma.newsletter.findMany({
        where: { status: 'SUBSCRIBED' },
        take: 10,
        orderBy: { subscribedAt: 'desc' },
        select: {
          email: true,
          name: true,
          categories: true,
          subscribedAt: true,
        },
      }),
    ]);

    // Count categories
    const categoryMap: Record<string, number> = {};
    categoryCounts.forEach((sub: any) => {
      sub.categories.forEach((cat: string) => {
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });
    });

    return successResponse({
      total,
      subscribed,
      pending,
      unsubscribed,
      byCategory: categoryMap,
      byFrequency: frequencyCounts.reduce((acc: any, item: any) => {
        acc[item.frequency] = item._count;
        return acc;
      }, {} as Record<string, number>),
      recent: recentSubscribers,
    });
  } catch (error: any) {
    console.error('Get newsletter stats error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}
