/**
 * Blog API Handler
 * Handles blog post management and operations
 */

import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';
import {
  blogPostSchema,
  blogPostUpdateSchema,
  blogCommentSchema,
  blogQuerySchema,
  BlogPostInput,
  BlogCommentInput,
} from '../../schemas/validation.schemas';
import { validateData } from '../../schemas/validation.schemas';
import {
  paginate,
  buildSearchQuery,
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
 * GET /api/blog
 * Get all blog posts with pagination and filtering
 */
export async function handleGetBlogPosts(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Validate query parameters
    const queryValidation = validateData(blogQuerySchema, Object.fromEntries(searchParams));
    if (!queryValidation.success || !queryValidation.data) {
      return validationErrorResponse(queryValidation.errors);
    }

    const { page, limit, sortBy, sortOrder, category, tag, status, search } = queryValidation.data;

    // Build where clause
    const where: any = {};

    // Only show published posts for public access (adjust based on auth)
    if (!status) {
      where.status = 'PUBLISHED';
      where.publishedAt = { lte: new Date() };
    } else {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Paginate results
    const result = await paginate(
      prisma.blogPost,
      { page, limit, sortBy: sortBy || 'publishedAt', sortOrder },
      where,
      {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      }
    );

    return paginatedResponse(result.data, result.pagination);
  } catch (error: any) {
    console.error('Get blog posts error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/blog/:slug
 * Get single blog post by slug
 */
export async function handleGetBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
        comments: {
          where: {
            status: 'APPROVED',
            parentId: null,
          },
          include: {
            replies: {
              where: { status: 'APPROVED' },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!post) {
      return errorResponse('Blog post not found', 404, 'NOT_FOUND');
    }

    // Check if post is published
    if (post.status !== 'PUBLISHED' || (post.publishedAt && post.publishedAt > new Date())) {
      return errorResponse('Blog post not found', 404, 'NOT_FOUND');
    }

    // Increment view count
    await incrementViews(prisma.blogPost, post.id);

    return successResponse({
      ...post,
      views: post.views + 1,
    });
  } catch (error: any) {
    console.error('Get blog post error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * POST /api/blog
 * Create new blog post (Admin only)
 */
export async function handleCreateBlogPost(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(blogPostSchema, body);
    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data as BlogPostInput;

    // Generate unique slug
    const slug = await generateUniqueSlug(prisma.blogPost, data.slug || data.title);

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        ...data,
        slug,
        publishedAt: data.status === 'PUBLISHED' ? data.publishedAt || new Date() : null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return createdResponse(post);
  } catch (error: any) {
    console.error('Create blog post error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/blog/:slug
 * Update blog post (Admin only)
 */
export async function handleUpdateBlogPost(slug: string, req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(blogPostUpdateSchema, body);
    if (!validation.success || !validation.data) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data;

    // Find existing post
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing) {
      return errorResponse('Blog post not found', 404, 'NOT_FOUND');
    }

    // Update slug if changed
    let newSlug = slug;
    if (data.slug && data.slug !== slug) {
      newSlug = await generateUniqueSlug(prisma.blogPost, data.slug, existing.id);
    }

    // Update post
    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        ...data,
        slug: newSlug,
        publishedAt: data.status === 'PUBLISHED' && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return successResponse(post);
  } catch (error: any) {
    console.error('Update blog post error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * DELETE /api/blog/:slug
 * Delete blog post (Admin only)
 */
export async function handleDeleteBlogPost(slug: string) {
  try {
    await prisma.blogPost.delete({
      where: { slug },
    });

    return noContentResponse();
  } catch (error: any) {
    console.error('Delete blog post error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * POST /api/blog/:slug/comments
 * Add comment to blog post
 */
export async function handleAddComment(slug: string, req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateData(blogCommentSchema, body);
    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const data = validation.data as BlogCommentInput;

    // Find post
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      return errorResponse('Blog post not found', 404, 'NOT_FOUND');
    }

    // Create comment
    const comment = await prisma.blogComment.create({
      data: {
        postId: post.id,
        name: data.name,
        email: data.email,
        website: data.website || null,
        content: data.content,
        parentId: data.parentId,
        status: 'PENDING', // Require moderation
      },
    });

    return createdResponse(comment);
  } catch (error: any) {
    console.error('Add comment error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * PATCH /api/blog/comments/:id/approve
 * Approve comment (Admin only)
 */
export async function handleApproveComment(id: string, req: NextRequest) {
  try {
    const comment = await prisma.blogComment.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approved: true,
        approvedAt: new Date(),
      },
    });

    return successResponse(comment);
  } catch (error: any) {
    console.error('Approve comment error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * DELETE /api/blog/comments/:id
 * Delete comment (Admin only)
 */
export async function handleDeleteComment(id: string) {
  try {
    await prisma.blogComment.delete({
      where: { id },
    });

    return noContentResponse();
  } catch (error: any) {
    console.error('Delete comment error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/blog/categories
 * Get all blog categories with post counts
 */
export async function handleGetCategories() {
  try {
    const categories = await prisma.blogPost.groupBy({
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
 * GET /api/blog/tags
 * Get all blog tags with post counts
 */
export async function handleGetTags() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
      },
      select: { tags: true },
    });

    const tagMap: Record<string, number> = {};
    posts.forEach((post: any) => {
      post.tags.forEach((tag: string) => {
        tagMap[tag] = (tagMap[tag] || 0) + 1;
      });
    });

    const result = Object.entries(tagMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return successResponse(result);
  } catch (error: any) {
    console.error('Get tags error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

/**
 * GET /api/blog/related/:slug
 * Get related blog posts
 */
export async function handleGetRelatedPosts(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      select: { id: true, category: true, tags: true },
    });

    if (!post) {
      return errorResponse('Blog post not found', 404, 'NOT_FOUND');
    }

    const related = await prisma.blogPost.findMany({
      where: {
        id: { not: post.id },
        status: 'PUBLISHED',
        publishedAt: { lte: new Date() },
        OR: [
          { category: post.category },
          { tags: { hasSome: post.tags } },
        ],
      },
      take: 5,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        publishedAt: true,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return successResponse(related);
  } catch (error: any) {
    console.error('Get related posts error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}
