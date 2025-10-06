/**
 * Contact Form API Handler
 * Handles contact form submissions
 */

import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';
import { contactFormSchema, ContactFormInput } from '../../schemas/validation.schemas';
import { validateData } from '../../schemas/validation.schemas';
import { sendContactNotification, sendContactConfirmation } from '../../services/email.service';
import { extractMetadata, handlePrismaError } from '../../utils/database.utils';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
} from '../../utils/response.utils';
import { verifyRecaptcha, checkRateLimit } from '../../utils/security.utils';

/**
 * POST /api/contact
 * Submit contact form
 */
export async function handleContactSubmission(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input
    const validation = validateData(contactFormSchema, body);
    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data as ContactFormInput;

    // Rate limiting by email
    const rateLimit = checkRateLimit(`contact:${data.email}`, 3, 3600000); // 3 requests per hour
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

    // Create contact record
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        formType: data.formType,
        message: data.message,
        serviceType: data.serviceType,
        budget: data.budget,
        timeline: data.timeline,
        projectDetails: data.projectDetails,
        status: 'NEW',
        source: data.source || metadata.source,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
      },
    });

    // Create activity log
    await prisma.contactActivity.create({
      data: {
        contactId: contact.id,
        type: 'FORM_SUBMITTED',
        description: `${data.formType} form submitted`,
        metadata: {
          formType: data.formType,
          serviceType: data.serviceType,
        },
      },
    });

    // Send notification emails
    await Promise.all([
      sendContactNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        formType: data.formType,
        message: data.message,
        serviceType: data.serviceType,
        budget: data.budget,
        timeline: data.timeline,
      }),
      sendContactConfirmation({
        name: data.name,
        email: data.email,
        formType: data.formType,
      }),
    ]);

    return successResponse(
      {
        id: contact.id,
        message: 'Thank you for contacting us. We will get back to you soon!',
      },
      201
    );
  } catch (error: any) {
    console.error('Contact submission error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/contact
 * Get contact submissions (Admin only)
 */
export async function handleGetContacts(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const formType = searchParams.get('formType');
    const search = searchParams.get('search');

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (formType) {
      where.formType = formType;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          notes: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          activities: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      }),
      prisma.contact.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return successResponse(contacts, 200, {
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error: any) {
    console.error('Get contacts error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/contact/:id
 * Get single contact by ID (Admin only)
 */
export async function handleGetContactById(id: string) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!contact) {
      return errorResponse('Contact not found', 404, 'NOT_FOUND');
    }

    return successResponse(contact);
  } catch (error: any) {
    console.error('Get contact error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/contact/:id
 * Update contact status (Admin only)
 */
export async function handleUpdateContact(id: string, req: NextRequest) {
  try {
    const body = await req.json();
    const { status, assignedTo } = body;

    const contact = await prisma.contact.update({
      where: { id },
      data: {
        status,
        assignedTo,
      },
    });

    // Log activity
    await prisma.contactActivity.create({
      data: {
        contactId: id,
        type: 'STATUS_CHANGED',
        description: `Status changed to ${status}`,
        metadata: { newStatus: status, assignedTo },
      },
    });

    return successResponse(contact);
  } catch (error: any) {
    console.error('Update contact error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * POST /api/contact/:id/notes
 * Add note to contact (Admin only)
 */
export async function handleAddContactNote(id: string, req: NextRequest) {
  try {
    const body = await req.json();
    const { content, createdBy } = body;

    const note = await prisma.contactNote.create({
      data: {
        contactId: id,
        content,
        createdBy: createdBy || 'system',
      },
    });

    // Log activity
    await prisma.contactActivity.create({
      data: {
        contactId: id,
        type: 'NOTE_ADDED',
        description: 'Note added to contact',
      },
    });

    return successResponse(note, 201);
  } catch (error: any) {
    console.error('Add note error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/contact/stats
 * Get contact statistics (Admin only)
 */
export async function handleGetContactStats() {
  try {
    const [
      total,
      newContacts,
      statusCounts,
      formTypeCounts,
      recentContacts,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({
        where: {
          status: 'NEW',
        },
      }),
      prisma.contact.groupBy({
        by: ['status'],
        _count: true,
      }),
      prisma.contact.groupBy({
        by: ['formType'],
        _count: true,
      }),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          formType: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return successResponse({
      total,
      new: newContacts,
      byStatus: statusCounts.reduce((acc: any, item: any) => {
        acc[item.status] = item._count;
        return acc;
      }, {} as Record<string, number>),
      byFormType: formTypeCounts.reduce((acc: any, item: any) => {
        acc[item.formType] = item._count;
        return acc;
      }, {} as Record<string, number>),
      recent: recentContacts,
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}
