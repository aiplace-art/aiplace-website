/**
 * Lead Submission API Route
 * Handles qualified lead submissions
 */

import { NextRequest, NextResponse } from 'next/server';
import { conversationService } from '@/backend/services/conversation.service';
import { leadQualificationService } from '@/backend/services/lead-qualification.service';

export interface LeadSubmission {
  sessionId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: string;
  budget?: string;
  timeline?: string;
  description?: string;
}

/**
 * POST /api/chat/lead
 * Submit a qualified lead
 */
export async function POST(request: NextRequest) {
  try {
    const body: LeadSubmission = await request.json();

    // Validate required fields
    if (!body.sessionId || !body.name || !body.email || !body.serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, name, email, serviceType' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get conversation and analyze
    const conversationData = await conversationService.getConversationById(body.sessionId);

    if (!conversationData || conversationData.messages.length === 0) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    const messages = conversationData.messages;

    const insights = await leadQualificationService.analyzeConversation(
      messages.map((m) => ({ role: m.role, content: m.content }))
    );

    const score = leadQualificationService.calculateScore(insights, messages.length);

    // Create lead record (mock implementation - replace with actual DB)
    const lead = {
      id: `lead_${Date.now()}`,
      sessionId: body.sessionId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      serviceType: body.serviceType,
      budget: body.budget,
      timeline: body.timeline,
      description: body.description || '',
      score: score.total,
      qualified: score.qualified,
      insights,
      createdAt: new Date().toISOString(),
    };

    // Update conversation status
    await conversationService.updateConversation(body.sessionId, {
      status: 'QUALIFIED' as any,
      name: body.name,
      email: body.email,
      phone: body.phone,
      leadQuality: score.qualified ? 'HIGH' as any : 'MEDIUM' as any,
    });

    // TODO: Send notification to sales team
    // TODO: Add to CRM system
    // TODO: Send confirmation email to lead

    console.log('✅ Lead submitted:', {
      name: lead.name,
      email: lead.email,
      score: lead.score,
      qualified: lead.qualified,
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      score: score.total,
      qualified: score.qualified,
      message: 'Lead information submitted successfully',
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead information' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat/lead
 * Get lead statistics
 */
export async function GET() {
  try {
    // Get conversation statistics
    const conversationsData = await conversationService.getConversations({});

    const stats = {
      totalLeads: conversationsData.conversations.length,
      qualifiedLeads: conversationsData.conversations.filter(c => c.leadQuality === 'HIGH').length,
      averageScore: 0, // Calculate if needed
    };

    return NextResponse.json({
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Lead stats error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve lead statistics' },
      { status: 500 }
    );
  }
}
