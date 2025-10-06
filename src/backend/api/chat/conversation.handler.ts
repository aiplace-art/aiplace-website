/**
 * Conversation Management Handler
 * CRUD operations for conversations
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  startConversationSchema,
  sendMessageSchema,
  updateConversationSchema,
  conversationQuerySchema,
  feedbackSchema,
} from '../../schemas/chat.schemas';
import { conversationService } from '../../services/conversation.service';
import { analyticsService } from '../../services/analytics.service';
import { validateRequest } from '../../utils/validation.utils';
import { successResponse, serverErrorResponse } from '../../utils/response.utils';

/**
 * POST /api/chat/conversation
 * Start a new conversation
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateRequest(startConversationSchema, body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    const { sessionId, visitorId, metadata } = validation.data;

    // Get IP and user agent
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined;
    const userAgent = req.headers.get('user-agent') || undefined;

    // Create or get conversation
    const conversation = await conversationService.getOrCreateConversation({
      sessionId,
      visitorId,
      ipAddress,
      userAgent,
      metadata,
    });

    // Track analytics
    await analyticsService.trackEvent({
      conversationId: conversation.id,
      eventType: 'CONVERSATION_STARTED',
      sessionId,
      visitorId,
    });

    return successResponse({
      conversation: {
        id: conversation.id,
        sessionId: conversation.sessionId,
        status: conversation.status,
        startedAt: conversation.startedAt,
      },
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/chat/conversation/:id
 * Get conversation by ID
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const conversationId = params.id;

    const conversation = await conversationService.getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    return successResponse({ conversation });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * PATCH /api/chat/conversation/:id
 * Update conversation
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validation = validateRequest(updateConversationSchema, {
      ...body,
      conversationId: params.id,
    });

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    const { conversationId, ...updates } = validation.data;

    const conversation = await conversationService.updateConversation(conversationId, updates);

    return successResponse({ conversation });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/chat/conversations
 * List conversations with filters
 */
export async function GET_LIST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = {
      status: searchParams.get('status') || undefined,
      leadQuality: searchParams.get('leadQuality') || undefined,
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const validation = validateRequest(conversationQuerySchema, query);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validation.errors },
        { status: 400 }
      );
    }

    const result = await conversationService.getConversations(validation.data);

    return successResponse({
      conversations: result.conversations,
      total: result.total,
      limit: validation.data.limit,
      offset: validation.data.offset,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/chat/conversation/:id/complete
 * Mark conversation as completed
 */
export async function POST_COMPLETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const conversationId = params.id;

    const conversation = await conversationService.completeConversation(conversationId);

    // Track analytics
    await analyticsService.trackEvent({
      conversationId,
      eventType: 'CONVERSATION_ENDED',
      sessionId: conversation.sessionId,
      visitorId: conversation.visitorId || undefined,
    });

    return successResponse({ conversation });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/chat/conversation/:id/feedback
 * Submit conversation feedback
 */
export async function POST_FEEDBACK(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const validation = validateRequest(feedbackSchema, {
      ...body,
      conversationId: params.id,
    });

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    const { conversationId, rating, feedback } = validation.data;

    // Get conversation
    const conversation = await conversationService.getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Track feedback analytics
    await analyticsService.trackEvent({
      conversationId,
      eventType: 'FEEDBACK_RECEIVED',
      sessionId: (conversation as any).sessionId,
      visitorId: (conversation as any).visitorId || undefined,
      userSatisfaction: rating,
      feedback,
    });

    return successResponse({ message: 'Feedback received' });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/chat/conversation/:id/message
 * Send a simple (non-streaming) message
 */
export async function POST_MESSAGE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const conversationId = params.id;

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Add user message
    const message = await conversationService.addMessage(conversationId, {
      role: 'USER',
      content: body.message,
    });

    return successResponse({ message });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
