/**
 * Portfolio API Handler
 * Handles portfolio/case study management and operations
 */

import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';
import {
  portfolioSchema,
  portfolioUpdateSchema,
  portfolioQuerySchema,
  PortfolioInput,
} from '../../schemas/validation.schemas';
import { validateData } from '../../schemas/validation.schemas';
import {
  paginate,
  generateUniqueSlug,
  incrementViews,
  handlePrismaError,
} from '../../utils/database.utils';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  createdResponse,
  paginatedResponse,
  noContentResponse,
} from '../../utils/response.utils';

/**
 * GET /api/portfolio
 * Get all portfolio items with pagination and filtering
 */
export async function handleGetPortfolioItems(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Validate query parameters
    const queryValidation = validateData(portfolioQuerySchema, Object.fromEntries(searchParams));
    if (!queryValidation.success || !queryValidation.data) {
      return validationErrorResponse(queryValidation.errors);
    }

    const {
      page,
      limit,
      sortBy,
      sortOrder,
      category,
      service,
      technology,
      featured,
      status,
    } = queryValidation.data;

    // Build where clause
    const where: any = {};

    // Only show published items for public access
    if (!status) {
      where.status = 'PUBLISHED';
      where.publishedAt = { lte: new Date() };
    } else {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (service) {
      where.services = { has: service };
    }

    if (technology) {
      where.technologies = { has: technology };
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    // Paginate results
    const result = await paginate(
      prisma.portfolio,
      { page, limit, sortBy: sortBy || 'publishedAt', sortOrder },
      where,
      {
        testimonials: {
          where: { status: 'PUBLISHED', featured: true },
          take: 3,
        },
      }
    );

    return paginatedResponse(result.data, result.pagination);
  } catch (error: any) {
    console.error('Get portfolio items error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/portfolio/:slug
 * Get single portfolio item by slug
 */
export async function handleGetPortfolioBySlug(slug: string) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { slug },
      include: {
        testimonials: {
          where: { status: 'PUBLISHED' },
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (!portfolio) {
      return errorResponse('Portfolio item not found', 404, 'NOT_FOUND');
    }

    // Check if published
    if (portfolio.status !== 'PUBLISHED' || (portfolio.publishedAt && portfolio.publishedAt > new Date())) {
      return errorResponse('Portfolio item not found', 404, 'NOT_FOUND');
    }

    return successResponse(portfolio);
  } catch (error: any) {
    console.error('Get portfolio item error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * POST /api/portfolio
 * Create new portfolio item (Admin only)
 */
export async function handleCreatePortfolio(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(portfolioSchema, body);
    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data as PortfolioInput;

    // Generate unique slug
    const slug = await generateUniqueSlug(prisma.portfolio, data.slug || data.title);

    // Create portfolio item
    const portfolio = await prisma.portfolio.create({
      data: {
        ...data,
        slug,
        publishedAt: data.status === 'PUBLISHED' ? data.publishedAt || new Date() : null,
      },
      include: {
        testimonials: true,
      },
    });

    return createdResponse(portfolio);
  } catch (error: any) {
    console.error('Create portfolio error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/portfolio/:slug
 * Update portfolio item (Admin only)
 */
export async function handleUpdatePortfolio(slug: string, req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(portfolioUpdateSchema, body);
    if (!validation.success || !validation.data) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data;

    // Find existing item
    const existing = await prisma.portfolio.findUnique({ where: { slug } });
    if (!existing) {
      return errorResponse('Portfolio item not found', 404, 'NOT_FOUND');
    }

    // Update slug if changed
    let newSlug = slug;
    if (data.slug && data.slug !== slug) {
      newSlug = await generateUniqueSlug(prisma.portfolio, data.slug, existing.id);
    }

    // Update item
    const portfolio = await prisma.portfolio.update({
      where: { slug },
      data: {
        ...data,
        slug: newSlug,
        publishedAt: data.status === 'PUBLISHED' && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
      },
      include: {
        testimonials: true,
      },
    });

    return successResponse(portfolio);
  } catch (error: any) {
    console.error('Update portfolio error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * DELETE /api/portfolio/:slug
 * Delete portfolio item (Admin only)
 */
export async function handleDeletePortfolio(slug: string) {
  try {
    await prisma.portfolio.delete({
      where: { slug },
    });

    return noContentResponse();
  } catch (error: any) {
    console.error('Delete portfolio error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/portfolio/featured
 * Get featured portfolio items
 */
export async function handleGetFeaturedPortfolio() {
  try {
    const featured = await prisma.portfolio.findMany({
      where: {
        status: 'PUBLISHED',
        featured: true,
        publishedAt: { lte: new Date() },
      },
      take: 6,
      orderBy: { publishedAt: 'desc' },
      include: {
        testimonials: {
          where: { status: 'PUBLISHED', featured: true },
          take: 1,
        },
      },
    });

    return successResponse(featured);
  } catch (error: any) {
    console.error('Get featured portfolio error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/portfolio/categories
 * Get portfolio categories with item counts
 */
export async function handleGetPortfolioCategories() {
  try {
    const categories = await prisma.portfolio.groupBy({
      by: ['category'],
      where: {
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
      },
      _count: true,
    });

    const result = categories.map((cat: any) => ({
      name: cat.category,
      count: cat._count,
    }));

    return successResponse(result);
  } catch (error: any) {
    console.error('Get categories error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/portfolio/services
 * Get all services used in portfolio
 */
export async function handleGetPortfolioServices() {
  try {
    const items = await prisma.portfolio.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
      },
      select: { services: true },
    });

    const serviceMap: Record<string, number> = {};
    items.forEach((item: any) => {
      item.services.forEach((service: string) => {
        serviceMap[service] = (serviceMap[service] || 0) + 1;
      });
    });

    const result = Object.entries(serviceMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return successResponse(result);
  } catch (error: any) {
    console.error('Get services error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/portfolio/technologies
 * Get all technologies used in portfolio
 */
export async function handleGetPortfolioTechnologies() {
  try {
    const items = await prisma.portfolio.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
      },
      select: { technologies: true },
    });

    const techMap: Record<string, number> = {};
    items.forEach((item: any) => {
      item.technologies.forEach((tech: string) => {
        techMap[tech] = (techMap[tech] || 0) + 1;
      });
    });

    const result = Object.entries(techMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return successResponse(result);
  } catch (error: any) {
    console.error('Get technologies error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/portfolio/related/:slug
 * Get related portfolio items
 */
export async function handleGetRelatedPortfolio(slug: string) {
  try {
    const item = await prisma.portfolio.findUnique({
      where: { slug },
      select: {
        id: true,
        category: true,
        services: true,
        technologies: true,
      },
    });

    if (!item) {
      return errorResponse('Portfolio item not found', 404, 'NOT_FOUND');
    }

    const related = await prisma.portfolio.findMany({
      where: {
        id: { not: item.id },
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
        OR: [
          { category: item.category },
          { services: { hasSome: item.services } },
          { technologies: { hasSome: item.technologies } },
        ],
      },
      take: 4,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        category: true,
        services: true,
        client: true,
        publishedAt: true,
      },
    });

    return successResponse(related);
  } catch (error: any) {
    console.error('Get related portfolio error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/portfolio/stats
 * Get portfolio statistics (Admin only)
 */
export async function handleGetPortfolioStats() {
  try {
    const [
      total,
      published,
      featured,
      byCat,
      recent,
    ] = await Promise.all([
      prisma.portfolio.count(),
      prisma.portfolio.count({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lte: new Date() },
        },
      }),
      prisma.portfolio.count({
        where: {
          status: 'PUBLISHED',
          featured: true,
        },
      }),
      prisma.portfolio.groupBy({
        by: ['category'],
        _count: true,
      }),
      prisma.portfolio.findMany({
        where: {
          status: 'PUBLISHED',
          publishedAt: { lte: new Date() },
        },
        take: 5,
        orderBy: { publishedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          client: true,
          publishedAt: true,
        },
      }),
    ]);

    return successResponse({
      total,
      published,
      featured,
      byCategory: byCat.reduce((acc: any, item: any) => {
        acc[item.category] = item._count;
        return acc;
      }, {} as Record<string, number>),
      recent,
    });
  } catch (error: any) {
    console.error('Get portfolio stats error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}
