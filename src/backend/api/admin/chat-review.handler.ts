/**
 * Admin Chat Review Handler
 * Admin API for reviewing and managing conversations
 */

import { NextRequest, NextResponse } from 'next/server';
import { conversationService } from '../../services/conversation.service';
import { leadScoringService } from '../../services/lead-scoring.service';
import { analyticsService } from '../../services/analytics.service';
import { adminQuerySchema, flagConversationSchema, reviewConversationSchema } from '../../schemas/chat.schemas';
import { validateRequest } from '../../utils/validation.utils';
import { serverErrorResponse, successResponse } from '../../utils/response.utils';
import { rateLimitMiddleware, RATE_LIMITS } from '../../middleware/rate-limit.middleware';
// Define types locally since Prisma client may not be generated yet
type ConversationStatus = 'ACTIVE' | 'COMPLETED' | 'ABANDONED' | 'TRANSFERRED' | 'BLOCKED';
type LeadQuality = 'UNKNOWN' | 'LOW' | 'MEDIUM' | 'HIGH' | 'QUALIFIED';

/**
 * Verify admin authentication (implement your auth logic)
 */
async function verifyAdmin(req: NextRequest): Promise<boolean> {
  // TODO: Implement proper authentication
  const authHeader = req.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.warn('ADMIN_API_KEY not configured');
    return false;
  }

  return authHeader === `Bearer ${adminKey}`;
}

/**
 * GET /api/admin/conversations
 * Get all conversations with advanced filtering
 */
export async function GET(req: NextRequest) {
  try {
    // Check admin auth
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limit
    const rateLimitResult = await rateLimitMiddleware(req, RATE_LIMITS.ADMIN_API);
    if (rateLimitResult) return rateLimitResult;

    // Parse query params
    const searchParams = req.nextUrl.searchParams;
    const query = {
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
      status: searchParams.get('status') || undefined,
      leadQuality: searchParams.get('leadQuality') || undefined,
      flagged: searchParams.get('flagged') === 'true' ? true : undefined,
      minLeadScore: searchParams.get('minLeadScore') ? parseInt(searchParams.get('minLeadScore')!) : undefined,
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    // Get conversations from database with filters
    const { conversations, total } = await conversationService.getConversations({
      status: query.status as ConversationStatus | undefined,
      leadQuality: query.leadQuality as LeadQuality | undefined,
      limit: query.limit,
      offset: query.offset,
    });

    // Filter by additional criteria
    let filtered = conversations;

    if (query.flagged !== undefined) {
      filtered = filtered.filter(c => c.flagged === query.flagged);
    }

    if (query.minLeadScore !== undefined) {
      filtered = filtered.filter(c => c.leadScore >= query.minLeadScore!);
    }

    if (query.startDate) {
      const startDate = new Date(query.startDate);
      filtered = filtered.filter(c => c.startedAt >= startDate);
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);
      filtered = filtered.filter(c => c.startedAt <= endDate);
    }

    return successResponse({
      conversations: filtered,
      total: filtered.length,
      limit: query.limit,
      offset: query.offset,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/admin/conversations/:id
 * Get full conversation details
 */
export async function GET_DETAIL(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversationId = params.id;

    const conversation = await conversationService.getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Get lead score
    const leadScore = await leadScoringService.getLatestScore(conversationId);

    // Get analytics
    const metrics = await analyticsService.getConversationMetrics(conversationId);

    return successResponse({
      conversation,
      leadScore,
      metrics,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/conversations/:id/flag
 * Flag conversation for review
 */
export async function POST_FLAG(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = validateRequest(flagConversationSchema, {
      ...body,
      conversationId: params.id,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    const { conversationId, reason } = validation.data!;

    const conversation = await conversationService.flagConversation(conversationId, reason);

    return successResponse({ conversation });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/admin/conversations/:id/review
 * Mark conversation as reviewed
 */
export async function POST_REVIEW(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = validateRequest(reviewConversationSchema, {
      ...body,
      conversationId: params.id,
    });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    const { conversationId, reviewedBy } = validation.data!;

    const conversation = await conversationService.reviewConversation(conversationId, reviewedBy);

    return successResponse({ conversation });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/admin/analytics
 * Get analytics report
 */
export async function GET_ANALYTICS(req: NextRequest) {
  try {
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const days = parseInt(searchParams.get('days') || '7');

    const report = await analyticsService.getSummary(days);

    return successResponse({ report, period: `${days} days` });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/admin/lead-scores
 * Get top lead scores
 */
export async function GET_LEAD_SCORES(req: NextRequest) {
  try {
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const minScore = parseInt(searchParams.get('minScore') || '60');
    const limit = parseInt(searchParams.get('limit') || '50');

    const leadScores = await leadScoringService.getLeadScores({
      minScore,
      limit,
      offset: 0,
    });

    return successResponse({
      leadScores,
      count: leadScores.length,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * DELETE /api/admin/conversations/:id
 * Delete conversation (soft delete by marking as archived)
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversationId = params.id;

    const conversation = await conversationService.updateConversation(conversationId, {
      status: 'BLOCKED',
    });

    return successResponse({ conversation, message: 'Conversation archived' });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/admin/export/:conversationId
 * Export conversation data
 */
export async function GET_EXPORT(req: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    if (!(await verifyAdmin(req))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const conversationId = params.conversationId;
    const format = req.nextUrl.searchParams.get('format') || 'json';

    const conversation = await conversationService.getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    if (format === 'json') {
      return NextResponse.json(conversation);
    }

    if (format === 'txt') {
      const text = conversation.messages
        .map(m => `[${m.timestamp.toISOString()}] ${m.role}: ${m.content}`)
        .join('\n\n');

      return new NextResponse(text, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': `attachment; filename="conversation-${conversationId}.txt"`,
        },
      });
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
