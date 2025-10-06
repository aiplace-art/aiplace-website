/**
 * Chat History API Route
 * Retrieves conversation history
 */

import { NextRequest, NextResponse } from 'next/server';
import { conversationService } from '@/backend/services/conversation.service';

/**
 * GET /api/chat/history
 * Get conversation history by session ID
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const conversationData = await conversationService.getConversationById(sessionId);

    if (!conversationData) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      conversation: conversationData,
      messages: conversationData.messages,
      count: conversationData.messages.length,
    });
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve conversation history' },
      { status: 500 }
    );
  }
}
