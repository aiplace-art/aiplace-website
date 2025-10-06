/**
 * Streaming Chat Handler
 * Handles streaming responses from Claude API
 */

import { NextRequest, NextResponse } from 'next/server';
import { streamChatSchema } from '../../schemas/chat.schemas';
import { anthropicService } from '../../services/anthropic.service';
import { conversationService } from '../../services/conversation.service';
import { analyticsService } from '../../services/analytics.service';
import { validateRequest } from '../../utils/validation.utils';
import { serverErrorResponse } from '../../utils/response.utils';

/**
 * POST /api/chat/stream
 * Stream chat responses from Claude
 */
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse and validate request
    const body = await req.json();
    const validation = validateRequest(streamChatSchema, body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.errors },
        { status: 400 }
      );
    }

    const { conversationId, message, includeContext, maxContextMessages } = validation.data;

    // Get conversation
    const conversation = await conversationService.getConversationById(conversationId);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Save user message
    await conversationService.addMessage(conversationId, {
      role: 'USER',
      content: message,
    });

    // Track analytics
    await analyticsService.trackEvent({
      conversationId,
      eventType: 'MESSAGE_SENT',
      sessionId: (conversation as any).sessionId,
      visitorId: (conversation as any).visitorId || undefined,
    });

    // Get conversation context if needed
    let contextMessages: any[] = [];
    if (includeContext) {
      const messages = await conversationService.getConversationContext(
        conversationId,
        maxContextMessages
      );
      contextMessages = messages.map(m => ({
        role: m.role.toLowerCase(),
        content: m.content,
      }));
    }

    // Add system message for AI assistant
    const systemMessage = {
      role: 'system',
      content: `You are an AI assistant for AiPlace, a company specializing in web development, AI solutions, blockchain technology, and business consulting.

Your role:
1. Help visitors understand our services
2. Answer questions about our expertise
3. Qualify leads by understanding their needs
4. Guide them to book consultations when appropriate

Be professional, helpful, and concise. If you detect contact information (email, phone), acknowledge it politely. If the conversation indicates strong interest, suggest booking a consultation.

Services we offer:
- Web Development (React, Next.js, full-stack solutions)
- AI Solutions (Claude integration, custom AI tools)
- Blockchain Development (smart contracts, DeFi, NFT platforms)
- Business Consulting (digital transformation, strategy)

Always maintain context from previous messages.`,
    };

    // Prepare messages for Claude
    const allMessages = [
      systemMessage,
      ...contextMessages,
      { role: 'user', content: message },
    ];

    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const identifier = `${(conversation as any).sessionId}-${ip}`;

    let fullResponse = '';
    let tokensUsed = { input_tokens: 0, output_tokens: 0 };

    // Stream response
    const stream = await anthropicService.streamChatCompletion(
      allMessages,
      {
        onComplete: async (response, usage) => {
          fullResponse = response;
          tokensUsed = usage;

          // Save assistant message
          await conversationService.addMessage(conversationId, {
            role: 'ASSISTANT',
            content: response,
            model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
            tokens: usage.output_tokens,
            finishReason: 'stop',
          });

          // Track analytics
          const responseTime = Date.now() - startTime;
          await analyticsService.trackEvent({
            conversationId,
            eventType: 'MESSAGE_RECEIVED',
            sessionId: (conversation as any).sessionId,
            visitorId: (conversation as any).visitorId || undefined,
            responseTime,
            tokensUsed: usage.input_tokens + usage.output_tokens,
          });

          // Auto-update contact info if detected
          await conversationService.autoUpdateContactInfo(conversationId);
        },
        onError: async (error) => {
          console.error('Streaming error:', error);
          await analyticsService.trackEvent({
            conversationId,
            eventType: 'ERROR_OCCURRED',
            eventData: { error: error.message },
            sessionId: (conversation as any).sessionId,
          });
        },
      },
      identifier
    );

    // Return streaming response
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Stream handler error:', error);

    // Track error
    await analyticsService.trackEvent({
      eventType: 'ERROR_OCCURRED',
      eventData: { error: error.message },
    });

    return serverErrorResponse(error);
  }
}

/**
 * GET /api/chat/stream
 * Method not allowed
 */
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
