/**
 * Lead Scoring Handler
 * Calculate and manage lead qualification scores
 */

import { NextRequest, NextResponse } from 'next/server';
import { leadScoringSchema } from '../../schemas/chat.schemas';
import { conversationService } from '../../services/conversation.service';
import { leadScoringService } from '../../services/lead-scoring.service';
import { analyticsService } from '../../services/analytics.service';
import { validateRequest } from '../../utils/validation.utils';
import { serverErrorResponse, successResponse } from '../../utils/response.utils';

/**
 * POST /api/chat/lead-score
 * Calculate lead score for a conversation
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateRequest(leadScoringSchema, body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    const { conversationId, forceRecalculate } = validation.data;

    // Get conversation with messages
    const conversation = await conversationService.getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Check if we need to recalculate
    const existingScore = await leadScoringService.getLatestScore(conversationId);

    if (existingScore && !forceRecalculate) {
      return successResponse({
        leadScore: existingScore,
        cached: true,
      });
    }

    // Calculate new score
    const leadScore = await leadScoringService.calculateLeadScore(conversation as any);

    // Update conversation with lead quality
    await conversationService.updateConversation(conversationId, {
      leadQuality: leadScore.leadQuality,
    } as any);

    // Track analytics
    if (leadScore.leadQuality === 'QUALIFIED' || leadScore.leadQuality === 'HIGH') {
      await analyticsService.trackEvent({
        conversationId,
        eventType: 'LEAD_QUALIFIED',
        sessionId: (conversation as any).sessionId,
        visitorId: (conversation as any).visitorId || undefined,
        eventData: {
          score: leadScore.totalScore,
          quality: leadScore.leadQuality,
        },
      });
    }

    return successResponse({
      leadScore,
      cached: false,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/chat/lead-score/:conversationId
 * Get lead score for a conversation
 */
export async function GET(req: NextRequest, { params }: { params: { conversationId: string } }) {
  try {
    const conversationId = params.conversationId;

    const leadScore = await leadScoringService.getLatestScore(conversationId);

    if (!leadScore) {
      return NextResponse.json({ error: 'Lead score not found' }, { status: 404 });
    }

    return successResponse({ leadScore });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * GET /api/chat/lead-scores
 * Get all lead scores with filters
 */
export async function GET_LIST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const minScore = parseInt(searchParams.get('minScore') || '0');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const leadScores = await leadScoringService.getLeadScores({
      minScore,
      limit,
      offset,
    });

    return successResponse({
      leadScores,
      limit,
      offset,
    });
  } catch (error) {
    return serverErrorResponse(error);
  }
}

/**
 * POST /api/chat/lead-score/batch
 * Calculate scores for multiple conversations
 */
export async function POST_BATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (!Array.isArray(body.conversationIds)) {
      return NextResponse.json({ error: 'conversationIds must be an array' }, { status: 400 });
    }

    const results = await Promise.all(
      body.conversationIds.map(async (conversationId: string) => {
        try {
          const conversation = await conversationService.getConversationById(conversationId);
          if (!conversation) {
            return { conversationId, error: 'Not found' };
          }

          const leadScore = await leadScoringService.calculateLeadScore(conversation as any);

          await conversationService.updateConversation(conversationId, {
            leadQuality: leadScore.leadQuality,
          } as any);

          return { conversationId, leadScore };
        } catch (error: any) {
          return { conversationId, error: error.message };
        }
      })
    );

    return successResponse({ results });
  } catch (error) {
    return serverErrorResponse(error);
  }
}
