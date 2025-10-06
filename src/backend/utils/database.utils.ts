/**
 * Database Utility Functions
 * Helper functions for database operations
 */

import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';

// ============================================
// PAGINATION UTILITIES
// ============================================

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export async function paginate<T>(
  model: any,
  options: PaginationOptions = {},
  where: any = {},
  include?: any
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 10));
  const skip = (page - 1) * limit;

  const orderBy = options.sortBy
    ? { [options.sortBy]: options.sortOrder || 'desc' }
    : { createdAt: 'desc' };

  const [data, total] = await Promise.all([
    model.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include,
    }),
    model.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

// ============================================
// SEARCH UTILITIES
// ============================================

export function buildSearchQuery(searchTerm: string, fields: string[]): any {
  if (!searchTerm) return {};

  return {
    OR: fields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: 'insensitive' as any,
      },
    })),
  };
}

// ============================================
// SLUG GENERATION
// ============================================

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateUniqueSlug(
  model: any,
  text: string,
  excludeId?: string
): Promise<string> {
  let slug = generateSlug(text);
  let counter = 1;
  let isUnique = false;

  while (!isUnique) {
    const existing = await model.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      isUnique = true;
    } else {
      slug = `${generateSlug(text)}-${counter}`;
      counter++;
    }
  }

  return slug;
}

// ============================================
// METADATA EXTRACTION
// ============================================

export function extractMetadata(req: any) {
  return {
    ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
    source: req.query.utm_source || req.headers['referer'],
  };
}

// ============================================
// DATE UTILITIES
// ============================================

export function getDateRange(period: 'today' | 'week' | 'month' | 'year') {
  const now = new Date();
  const start = new Date();

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(now.getDate() - 7);
      break;
    case 'month':
      start.setMonth(now.getMonth() - 1);
      break;
    case 'year':
      start.setFullYear(now.getFullYear() - 1);
      break;
  }

  return { start, end: now };
}

// ============================================
// ERROR HANDLING
// ============================================

export function handlePrismaError(error: any) {
  // Check if it's a Prisma error by checking the code property
  if (error?.code && typeof error.code === 'string' && error.code.startsWith('P')) {
    switch (error.code) {
      case 'P2002':
        return {
          status: 409,
          message: 'A record with this unique field already exists',
          field: error.meta?.target,
        };
      case 'P2025':
        return {
          status: 404,
          message: 'Record not found',
        };
      case 'P2003':
        return {
          status: 400,
          message: 'Invalid foreign key reference',
        };
      default:
        return {
          status: 500,
          message: 'Database error occurred',
        };
    }
  }

  return {
    status: 500,
    message: 'An unexpected error occurred',
  };
}

// ============================================
// TRANSACTION UTILITIES
// ============================================

export async function executeInTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(callback);
}

// ============================================
// SOFT DELETE UTILITIES
// ============================================

export async function softDelete(model: any, id: string) {
  return await model.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

export function excludeDeleted() {
  return {
    deletedAt: null,
  };
}

// ============================================
// BULK OPERATIONS
// ============================================

export async function bulkCreate<T>(model: any, data: T[]): Promise<number> {
  const result = await model.createMany({
    data,
    skipDuplicates: true,
  });

  return result.count;
}

export async function bulkUpdate(
  model: any,
  ids: string[],
  data: any
): Promise<number> {
  const result = await model.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data,
  });

  return result.count;
}

export async function bulkDelete(model: any, ids: string[]): Promise<number> {
  const result = await model.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return result.count;
}

// ============================================
// ANALYTICS UTILITIES
// ============================================

export async function incrementViews(model: any, id: string) {
  return await model.update({
    where: { id },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

export async function getStats(model: any, dateField: string = 'createdAt') {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thisWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, todayCount, weekCount, monthCount] = await Promise.all([
    model.count(),
    model.count({
      where: {
        [dateField]: {
          gte: today,
        },
      },
    }),
    model.count({
      where: {
        [dateField]: {
          gte: thisWeek,
        },
      },
    }),
    model.count({
      where: {
        [dateField]: {
          gte: thisMonth,
        },
      },
    }),
  ]);

  return {
    total,
    today: todayCount,
    week: weekCount,
    month: monthCount,
  };
}

// ============================================
// VALIDATION UTILITIES
// ============================================

export async function validateForeignKey(
  model: any,
  id: string,
  fieldName: string = 'id'
): Promise<boolean> {
  const record = await model.findUnique({
    where: { [fieldName]: id },
    select: { id: true },
  });

  return !!record;
}

// ============================================
// EXPORT UTILITIES
// ============================================

export async function exportToCSV<T>(
  model: any,
  where: any = {},
  fields: string[]
): Promise<string> {
  const data = await model.findMany({ where });

  const headers = fields.join(',');
  const rows = data.map((record: any) =>
    fields.map((field) => JSON.stringify(record[field] || '')).join(',')
  );

  return [headers, ...rows].join('\n');
}
