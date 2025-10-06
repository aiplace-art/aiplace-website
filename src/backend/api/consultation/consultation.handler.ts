/**
 * Consultation Booking API Handler
 * Handles consultation booking and management
 */

import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';
import {
  consultationBookingSchema,
  ConsultationBookingInput,
} from '../../schemas/validation.schemas';
import { validateData } from '../../schemas/validation.schemas';
import {
  sendConsultationConfirmation,
  sendConsultationNotification,
} from '../../services/email.service';
import { extractMetadata, handlePrismaError } from '../../utils/database.utils';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
} from '../../utils/response.utils';
import { verifyRecaptcha, checkRateLimit } from '../../utils/security.utils';

/**
 * POST /api/consultation/book
 * Book a consultation
 */
export async function handleConsultationBooking(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input
    const validation = validateData(consultationBookingSchema, body);
    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data as ConsultationBookingInput;

    // Rate limiting by email
    const rateLimit = checkRateLimit(`consultation:${data.email}`, 3, 3600000); // 3 requests per hour
    if (!rateLimit.allowed) {
      return rateLimitResponse(rateLimit.retryAfter);
    }

    // Verify reCAPTCHA if provided
    if (data.recaptchaToken) {
      const isValid = await verifyRecaptcha(data.recaptchaToken);
      if (!isValid) {
        return errorResponse('reCAPTCHA verification failed', 400, 'INVALID_RECAPTCHA');
      }
    }

    // Extract metadata
    const metadata = extractMetadata(req);

    // Check for conflicting bookings (same time slot)
    const preferredDate = new Date(data.preferredDate);
    const conflictingBooking = await prisma.consultation.findFirst({
      where: {
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
        OR: [
          {
            preferredDate: {
              gte: preferredDate,
              lt: new Date(preferredDate.getTime() + data.duration * 60000),
            },
          },
          {
            confirmedDate: {
              gte: preferredDate,
              lt: new Date(preferredDate.getTime() + data.duration * 60000),
            },
          },
        ],
      },
    });

    if (conflictingBooking) {
      return errorResponse(
        'This time slot is not available. Please choose a different time.',
        409,
        'TIME_SLOT_CONFLICT'
      );
    }

    // Create consultation booking
    const consultation = await prisma.consultation.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        serviceType: data.serviceType,
        preferredDate,
        alternateDate: data.alternateDate ? new Date(data.alternateDate) : null,
        duration: data.duration,
        projectBrief: data.projectBrief,
        budget: data.budget,
        timeline: data.timeline,
        urgency: data.urgency,
        status: 'PENDING',
        source: data.source || metadata.source,
      },
    });

    // Send notification emails
    await Promise.all([
      sendConsultationNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        serviceType: data.serviceType,
        preferredDate,
        alternateDate: data.alternateDate ? new Date(data.alternateDate) : undefined,
        projectBrief: data.projectBrief,
        budget: data.budget,
        timeline: data.timeline,
        urgency: data.urgency,
      }),
      sendConsultationConfirmation({
        name: data.name,
        email: data.email,
        serviceType: data.serviceType,
        preferredDate,
        status: 'pending',
      }),
    ]);

    return successResponse(
      {
        id: consultation.id,
        message: 'Consultation request received. We will confirm your booking within 24 hours.',
        preferredDate: consultation.preferredDate,
      },
      201
    );
  } catch (error: any) {
    console.error('Consultation booking error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/consultation
 * Get consultation bookings (Admin only)
 */
export async function handleGetConsultations(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const serviceType = searchParams.get('serviceType');
    const urgency = searchParams.get('urgency');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (serviceType) {
      where.serviceType = serviceType;
    }

    if (urgency) {
      where.urgency = urgency;
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { preferredDate: 'asc' },
      }),
      prisma.consultation.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return successResponse(consultations, 200, {
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error: any) {
    console.error('Get consultations error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/consultation/:id
 * Get single consultation by ID (Admin only)
 */
export async function handleGetConsultationById(id: string) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      return errorResponse('Consultation not found', 404, 'NOT_FOUND');
    }

    return successResponse(consultation);
  } catch (error: any) {
    console.error('Get consultation error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/consultation/:id/confirm
 * Confirm consultation booking (Admin only)
 */
export async function handleConfirmConsultation(id: string, req: NextRequest) {
  try {
    const body = await req.json();
    const { confirmedDate, meetingLink } = body;

    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        status: 'CONFIRMED',
        confirmedDate: confirmedDate ? new Date(confirmedDate) : undefined,
        meetingLink,
      },
    });

    // Send confirmation email
    await sendConsultationConfirmation({
      name: consultation.name,
      email: consultation.email,
      serviceType: consultation.serviceType,
      preferredDate: consultation.confirmedDate || consultation.preferredDate,
      status: 'confirmed',
      meetingLink: consultation.meetingLink || undefined,
    });

    return successResponse(consultation);
  } catch (error: any) {
    console.error('Confirm consultation error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/consultation/:id/reschedule
 * Reschedule consultation (Admin only)
 */
export async function handleRescheduleConsultation(id: string, req: NextRequest) {
  try {
    const body = await req.json();
    const { newDate } = body;

    if (!newDate) {
      return errorResponse('New date is required', 400, 'MISSING_DATE');
    }

    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        status: 'RESCHEDULED',
        confirmedDate: new Date(newDate),
      },
    });

    // Send update email
    await sendConsultationConfirmation({
      name: consultation.name,
      email: consultation.email,
      serviceType: consultation.serviceType,
      preferredDate: consultation.confirmedDate || consultation.preferredDate,
      status: 'confirmed',
      meetingLink: consultation.meetingLink || undefined,
    });

    return successResponse(consultation);
  } catch (error: any) {
    console.error('Reschedule consultation error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/consultation/:id/cancel
 * Cancel consultation (Admin only)
 */
export async function handleCancelConsultation(id: string) {
  try {
    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });

    return successResponse(consultation);
  } catch (error: any) {
    console.error('Cancel consultation error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/consultation/:id/complete
 * Mark consultation as completed (Admin only)
 */
export async function handleCompleteConsultation(id: string) {
  try {
    const consultation = await prisma.consultation.update({
      where: { id },
      data: {
        status: 'COMPLETED',
      },
    });

    return successResponse(consultation);
  } catch (error: any) {
    console.error('Complete consultation error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/consultation/stats
 * Get consultation statistics (Admin only)
 */
export async function handleGetConsultationStats() {
  try {
    const [
      total,
      pending,
      confirmed,
      completed,
      statusCounts,
      serviceTypeCounts,
      urgencyCounts,
      upcoming,
    ] = await Promise.all([
      prisma.consultation.count(),
      prisma.consultation.count({ where: { status: 'PENDING' } }),
      prisma.consultation.count({ where: { status: 'CONFIRMED' } }),
      prisma.consultation.count({ where: { status: 'COMPLETED' } }),
      prisma.consultation.groupBy({
        by: ['status'],
        _count: true,
      }),
      prisma.consultation.groupBy({
        by: ['serviceType'],
        _count: true,
      }),
      prisma.consultation.groupBy({
        by: ['urgency'],
        _count: true,
      }),
      prisma.consultation.findMany({
        where: {
          status: { in: ['PENDING', 'CONFIRMED'] },
          preferredDate: {
            gte: new Date(),
          },
        },
        take: 10,
        orderBy: { preferredDate: 'asc' },
        select: {
          id: true,
          name: true,
          email: true,
          serviceType: true,
          preferredDate: true,
          status: true,
          urgency: true,
        },
      }),
    ]);

    return successResponse({
      total,
      pending,
      confirmed,
      completed,
      byStatus: statusCounts.reduce((acc: any, item: any) => {
        acc[item.status] = item._count;
        return acc;
      }, {} as Record<string, number>),
      byServiceType: serviceTypeCounts.reduce((acc: any, item: any) => {
        acc[item.serviceType] = item._count;
        return acc;
      }, {} as Record<string, number>),
      byUrgency: urgencyCounts.reduce((acc: any, item: any) => {
        acc[item.urgency] = item._count;
        return acc;
      }, {} as Record<string, number>),
      upcoming,
    });
  } catch (error: any) {
    console.error('Get consultation stats error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}
