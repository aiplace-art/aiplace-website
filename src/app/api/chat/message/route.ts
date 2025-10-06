/**
 * Chat Message API Route
 * Handles incoming chat messages and streams AI responses
 */

import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { claudeService } from '@/backend/services/claude.service';
import { conversationService } from '@/backend/services/conversation.service';
import { leadQualificationService } from '@/backend/services/lead-qualification.service';
import { AI_CONFIG } from '@/backend/config/ai-assistant.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessageRequest {
  sessionId?: string;
  message: string;
  metadata?: Record<string, any>;
}

/**
 * POST /api/chat/message
 * Send a message and receive streaming AI response
 */
export async function POST(request: NextRequest) {
  try {
    const body: ChatMessageRequest = await request.json();

    // Validate input
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (body.message.length > AI_CONFIG.conversation.maxMessageLength) {
      return NextResponse.json(
        { error: 'Message too long' },
        { status: 400 }
      );
    }

    // Get or create session
    const sessionId = body.sessionId || nanoid();

    // Get or create conversation - using simple in-memory version for now
    // TODO: Replace with actual database when Prisma is set up

    // Get conversation history
    const messages = await conversationService.getConversationContext(
      sessionId,
      AI_CONFIG.conversation.maxMessagesInContext
    );

    // Add user message
    await conversationService.addMessage(sessionId, {
      role: 'USER' as any,
      content: body.message,
      contextUsed: body.metadata
    });

    // Prepare messages for Claude
    const claudeMessages = [
      ...messages,
      { role: 'user' as const, content: body.message },
    ];

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = '';

          await claudeService.sendMessageStream(
            claudeMessages,
            undefined,
            {
              onToken: (token) => {
                // Send token to client
                const data = JSON.stringify({ type: 'token', content: token });
                controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
                fullResponse += token;
              },
              onComplete: async (response) => {
                // Save AI response
                const messageId = await conversationService.addMessage(sessionId, {
                  role: 'ASSISTANT' as any,
                  content: fullResponse
                });

                // Analyze for lead qualification (async, don't wait)
                analyzeLeadAsync(sessionId);

                // Send completion event
                const data = JSON.stringify({
                  type: 'done',
                  sessionId,
                  messageId,
                });
                controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
                controller.close();
              },
              onError: (error) => {
                const data = JSON.stringify({
                  type: 'error',
                  error: error.message,
                });
                controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
                controller.close();
              },
            }
          );
        } catch (error) {
          console.error('Streaming error:', error);
          const data = JSON.stringify({
            type: 'error',
            error: 'An error occurred while processing your message',
          });
          controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Analyze conversation for lead qualification (async)
 */
async function analyzeLeadAsync(sessionId: string) {
  try {
    const conversationData = await conversationService.getConversationById(sessionId);

    if (!conversationData || conversationData.messages.length < 4) {
      // Need at least a few messages for meaningful analysis
      return;
    }

    const messages = conversationData.messages;

    const insights = await leadQualificationService.analyzeConversation(
      messages.map((m) => ({ role: m.role, content: m.content }))
    );

    const score = leadQualificationService.calculateScore(
      insights,
      messages.length
    );

    await conversationService.updateConversation(sessionId, {
      leadQuality: score.qualified ? 'HIGH' as any : 'MEDIUM' as any
    });

    if (score.qualified) {
      console.log(`✅ Lead qualified! Session: ${sessionId}, Score: ${score.total}`);
      // TODO: Trigger notification to sales team
    }
  } catch (error) {
    console.error('Lead analysis error:', error);
  }
}

/**
 * GET /api/chat/message
 * Check API health
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    configured: claudeService.isConfigured(),
    timestamp: new Date().toISOString(),
  });
}
