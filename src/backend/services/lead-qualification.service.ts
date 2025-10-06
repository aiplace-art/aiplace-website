/**
 * Lead Qualification Service
 * Analyzes conversations to score and qualify leads
 */

import { AI_CONFIG, LEAD_SCORING_CONFIG } from '../config/ai-assistant.config';

export interface LeadInsights {
  budget?: string;
  timeline?: string;
  serviceType?: string;
  decisionAuthority?: string;
  urgency?: string;
  projectScope?: string;
  companySize?: string;
}

export interface LeadScore {
  total: number;
  breakdown: {
    budget: number;
    timeline: number;
    authority: number;
    scope: number;
    engagement: number;
  };
  qualified: boolean;
  confidence: number;
}

export interface QualifiedLead {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  serviceType: string;
  budget?: string;
  timeline?: string;
  description: string;
  score: number;
  insights: LeadInsights;
}

class LeadQualificationService {
  /**
   * Analyze conversation and extract lead insights
   */
  async analyzeConversation(
    messages: Array<{ role: string; content: string }>
  ): Promise<LeadInsights> {
    const insights: LeadInsights = {};
    const conversationText = messages
      .map((m) => m.content)
      .join(' ')
      .toLowerCase();

    // Detect budget
    insights.budget = this.detectBudget(conversationText);

    // Detect timeline
    insights.timeline = this.detectTimeline(conversationText);

    // Detect service type
    insights.serviceType = this.detectServiceType(conversationText);

    // Detect decision authority
    insights.decisionAuthority = this.detectDecisionAuthority(conversationText);

    // Detect urgency
    insights.urgency = this.detectUrgency(conversationText);

    // Detect project scope
    insights.projectScope = this.detectProjectScope(conversationText);

    // Detect company size
    insights.companySize = this.detectCompanySize(conversationText);

    return insights;
  }

  /**
   * Calculate lead score based on insights
   */
  calculateScore(insights: LeadInsights, messageCount: number): LeadScore {
    const breakdown = {
      budget: this.scoreBudget(insights.budget),
      timeline: this.scoreTimeline(insights.timeline),
      authority: this.scoreAuthority(insights.decisionAuthority),
      scope: this.scoreScope(insights.projectScope),
      engagement: this.scoreEngagement(messageCount),
    };

    const total = Object.values(breakdown).reduce((sum, score) => sum + score, 0);

    // Calculate confidence (based on available data points)
    const dataPoints = Object.values(insights).filter((v) => v !== undefined).length;
    const confidence = Math.min((dataPoints / 7) * 100, 100);

    const qualified = total >= AI_CONFIG.leadQualification.minimumScore;

    return {
      total: Math.round(total),
      breakdown,
      qualified,
      confidence: Math.round(confidence),
    };
  }

  /**
   * Detect budget from conversation
   */
  private detectBudget(text: string): string | undefined {
    const budgetPatterns = [
      { pattern: /\$?(\d+)k/i, multiplier: 1000 },
      { pattern: /\$(\d+),?(\d+)/i, multiplier: 1 },
      { pattern: /(\d+)\s*thousand/i, multiplier: 1000 },
    ];

    for (const { pattern, multiplier } of budgetPatterns) {
      const match = text.match(pattern);
      if (match) {
        const amount = parseInt(match[1]) * multiplier;
        if (amount < 5000) return '< $5k';
        if (amount < 10000) return '$5k - $10k';
        if (amount < 25000) return '$10k - $25k';
        if (amount < 50000) return '$25k - $50k';
        return '$50k+';
      }
    }

    // Detect budget keywords
    if (text.includes('limited budget') || text.includes('tight budget')) {
      return '< $5k';
    }
    if (text.includes('flexible budget') || text.includes('well-funded')) {
      return '$50k+';
    }

    return undefined;
  }

  /**
   * Detect timeline from conversation
   */
  private detectTimeline(text: string): string | undefined {
    if (text.includes('asap') || text.includes('urgent') || text.includes('immediately')) {
      return 'urgent (< 1 month)';
    }

    const timelinePatterns = [
      { pattern: /within\s+(\d+)\s+months?/i, type: 'months' },
      { pattern: /in\s+(\d+)\s+months?/i, type: 'months' },
      { pattern: /(\d+)\s+months?/i, type: 'months' },
    ];

    for (const { pattern } of timelinePatterns) {
      const match = text.match(pattern);
      if (match) {
        const months = parseInt(match[1]);
        if (months <= 1) return 'urgent (< 1 month)';
        if (months <= 3) return '1-3 months';
        if (months <= 6) return '3-6 months';
        return '6+ months';
      }
    }

    if (text.includes('no rush') || text.includes('no timeline')) {
      return 'no timeline';
    }

    return undefined;
  }

  /**
   * Detect service type from conversation
   */
  private detectServiceType(text: string): string | undefined {
    const services = AI_CONFIG.services;

    // Check keywords for each service
    for (const [key, service] of Object.entries(services)) {
      const matches = service.keywords.filter((keyword) => text.includes(keyword));
      if (matches.length > 0) {
        return service.name;
      }
    }

    return undefined;
  }

  /**
   * Detect decision authority
   */
  private detectDecisionAuthority(text: string): string | undefined {
    const decisionMakerKeywords = [
      'owner',
      'founder',
      'ceo',
      'cto',
      'vp',
      'director',
      'i decide',
      'i make the decision',
      'my company',
    ];

    const influencerKeywords = [
      'manager',
      'team lead',
      'recommend',
      'suggest to',
    ];

    const researcherKeywords = [
      'looking for',
      'exploring',
      'researching',
      'investigating',
      'just browsing',
    ];

    if (decisionMakerKeywords.some((keyword) => text.includes(keyword))) {
      return 'decision maker';
    }

    if (influencerKeywords.some((keyword) => text.includes(keyword))) {
      return 'influencer';
    }

    if (researcherKeywords.some((keyword) => text.includes(keyword))) {
      return 'researcher';
    }

    return undefined;
  }

  /**
   * Detect urgency
   */
  private detectUrgency(text: string): string | undefined {
    if (
      text.includes('urgent') ||
      text.includes('asap') ||
      text.includes('immediately') ||
      text.includes('quickly')
    ) {
      return 'urgent';
    }

    if (text.includes('soon') || text.includes('within a month')) {
      return 'moderate';
    }

    if (text.includes('no rush') || text.includes('flexible')) {
      return 'low';
    }

    return 'moderate';
  }

  /**
   * Detect project scope
   */
  private detectProjectScope(text: string): string | undefined {
    const clarityIndicators = {
      'very clear': ['detailed', 'specific', 'exactly', 'precisely', 'requirements'],
      'somewhat clear': ['idea', 'concept', 'generally', 'roughly'],
      'exploring options': ['not sure', 'maybe', 'thinking about', 'exploring'],
    };

    for (const [clarity, keywords] of Object.entries(clarityIndicators)) {
      if (keywords.some((keyword) => text.includes(keyword))) {
        return clarity;
      }
    }

    return undefined;
  }

  /**
   * Detect company size
   */
  private detectCompanySize(text: string): string | undefined {
    if (text.includes('startup') || text.includes('just starting')) {
      return 'startup';
    }

    if (text.includes('small business') || text.includes('smb')) {
      return 'small business';
    }

    if (text.includes('enterprise') || text.includes('large company')) {
      return 'enterprise';
    }

    const employeeMatch = text.match(/(\d+)\s+employees/i);
    if (employeeMatch) {
      const count = parseInt(employeeMatch[1]);
      if (count < 10) return 'startup';
      if (count < 50) return 'small business';
      if (count < 500) return 'medium business';
      return 'enterprise';
    }

    return undefined;
  }

  /**
   * Score budget component
   */
  private scoreBudget(budget?: string): number {
    if (!budget) return 5;
    return LEAD_SCORING_CONFIG.budget[budget as keyof typeof LEAD_SCORING_CONFIG.budget] || 0;
  }

  /**
   * Score timeline component
   */
  private scoreTimeline(timeline?: string): number {
    if (!timeline) return 5;
    return (
      LEAD_SCORING_CONFIG.timeline[timeline as keyof typeof LEAD_SCORING_CONFIG.timeline] || 0
    );
  }

  /**
   * Score authority component
   */
  private scoreAuthority(authority?: string): number {
    if (!authority) return 15;
    return (
      LEAD_SCORING_CONFIG.authority[authority as keyof typeof LEAD_SCORING_CONFIG.authority] || 0
    );
  }

  /**
   * Score scope component
   */
  private scoreScope(scope?: string): number {
    if (!scope) return 10;
    return LEAD_SCORING_CONFIG.scope[scope as keyof typeof LEAD_SCORING_CONFIG.scope] || 0;
  }

  /**
   * Score engagement component
   */
  private scoreEngagement(messageCount: number): number {
    if (messageCount >= 10) return 10;
    if (messageCount >= 5) return 7;
    return 3;
  }

  /**
   * Generate lead summary
   */
  generateLeadSummary(
    insights: LeadInsights,
    score: LeadScore,
    contactInfo: Partial<QualifiedLead>
  ): string {
    const parts: string[] = [];

    if (contactInfo.name) {
      parts.push(`Name: ${contactInfo.name}`);
    }

    if (contactInfo.company) {
      parts.push(`Company: ${contactInfo.company}`);
    }

    if (insights.serviceType) {
      parts.push(`Interested in: ${insights.serviceType}`);
    }

    if (insights.budget) {
      parts.push(`Budget: ${insights.budget}`);
    }

    if (insights.timeline) {
      parts.push(`Timeline: ${insights.timeline}`);
    }

    if (insights.decisionAuthority) {
      parts.push(`Role: ${insights.decisionAuthority}`);
    }

    parts.push(`Lead Score: ${score.total}/100`);
    parts.push(`Qualification: ${score.qualified ? 'QUALIFIED' : 'NOT QUALIFIED'}`);

    return parts.join('\n');
  }

  /**
   * Determine next best action for lead
   */
  determineNextAction(score: LeadScore, insights: LeadInsights): string {
    if (score.qualified) {
      if (insights.urgency === 'urgent') {
        return 'Schedule immediate consultation';
      }
      return 'Schedule consultation within 24 hours';
    }

    if (score.total >= 40) {
      return 'Continue nurturing - collect more information';
    }

    return 'Provide resources and follow up in 1 week';
  }
}

// Export singleton instance
export const leadQualificationService = new LeadQualificationService();
export default leadQualificationService;
