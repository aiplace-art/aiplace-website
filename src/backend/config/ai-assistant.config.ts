/**
 * AI Assistant Configuration
 * Central configuration for the AiPlace AI chatbot
 */

export const AI_CONFIG = {
  // Anthropic API Configuration
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    model: 'claude-3-5-sonnet-20241022',
    maxTokens: 4096,
    temperature: 0.7,
    topP: 0.9,
  },

  // Conversation Settings
  conversation: {
    maxMessagesInContext: 50,
    maxMessageLength: 4000,
    sessionTimeout: 60 * 60 * 1000, // 1 hour
    typingDelay: 50, // ms per token for typing simulation
  },

  // Rate Limiting
  rateLimit: {
    maxMessagesPerMinute: 10,
    maxMessagesPerHour: 100,
    maxTokensPerDay: 100000,
  },

  // Lead Qualification Thresholds
  leadQualification: {
    minimumScore: 60, // 0-100 scale
    qualifiedBudget: 5000, // minimum budget in USD
    maxTimeline: 12, // maximum timeline in months
    scoreWeights: {
      budgetClarity: 25,
      timelineDefinition: 20,
      decisionAuthority: 25,
      projectScope: 15,
      urgency: 10,
      engagement: 5,
    },
  },

  // Service Categories
  services: {
    webDevelopment: {
      name: 'Web Development',
      description: 'Custom websites, web applications, and e-commerce solutions',
      minBudget: 5000,
      maxBudget: 100000,
      typicalTimeline: '2-6 months',
      keywords: ['website', 'web app', 'frontend', 'backend', 'full-stack', 'e-commerce'],
    },
    aiSolutions: {
      name: 'AI Solutions',
      description: 'AI integration, chatbots, machine learning, and automation',
      minBudget: 10000,
      maxBudget: 200000,
      typicalTimeline: '3-9 months',
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'chatbot', 'automation', 'nlp'],
    },
    businessPlanning: {
      name: 'Business Planning',
      description: 'Business strategy, digital transformation, and consulting',
      minBudget: 5000,
      maxBudget: 50000,
      typicalTimeline: '1-3 months',
      keywords: ['business', 'strategy', 'consulting', 'planning', 'transformation'],
    },
    tokenomics: {
      name: 'Tokenomics',
      description: 'Blockchain, cryptocurrency, token design, and Web3 solutions',
      minBudget: 15000,
      maxBudget: 300000,
      typicalTimeline: '4-12 months',
      keywords: ['blockchain', 'crypto', 'token', 'web3', 'defi', 'nft', 'tokenomics'],
    },
  },

  // Estimation Rules
  estimation: {
    complexityMultipliers: {
      simple: 1.0,
      medium: 1.5,
      complex: 2.5,
      enterprise: 4.0,
    },
    baseRates: {
      webDevelopment: 8000,
      aiSolutions: 15000,
      businessPlanning: 5000,
      tokenomics: 20000,
    },
    timelineMultipliers: {
      '1-2 months': 1.0,
      '3-4 months': 1.3,
      '5-6 months': 1.6,
      '6+ months': 2.0,
    },
  },

  // UI Configuration
  ui: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
    animations: {
      messageDelay: 300,
      typingSpeed: 50,
      widgetTransition: 200,
    },
  },
} as const;

/**
 * System Prompts for Different Conversation Stages
 */
export const SYSTEM_PROMPTS = {
  // Main system prompt that defines the AI's role
  main: `You are an AI assistant for AiPlace, a premium digital agency specializing in:

1. **Web Development**: Custom websites, web applications, e-commerce platforms
2. **AI Solutions**: AI integration, chatbots, machine learning, automation
3. **Business Planning**: Digital transformation, strategy consulting
4. **Tokenomics**: Blockchain solutions, cryptocurrency, Web3 development

**Your Role:**
- Provide helpful, accurate information about AiPlace services
- Qualify potential clients by understanding their needs
- Guide users toward appropriate solutions
- Schedule consultations when appropriate
- Maintain a professional yet approachable tone

**Guidelines:**
- Ask clarifying questions to understand project scope
- Provide realistic timelines and budget ranges
- Be honest about what can and cannot be done
- Always prioritize user needs over making a sale
- Suggest consultation for complex or unclear requirements
- Never make promises about specific deliverables without proper scoping

**Context:**
- AiPlace has completed 100+ successful projects
- Team includes developers, AI specialists, business consultants, and blockchain experts
- Projects typically range from $5,000 to $500,000
- Average project timeline is 3-6 months
- Free initial consultation available

**Conversation Flow:**
1. Greet warmly and ask how you can help
2. Listen and understand the user's needs
3. Ask qualifying questions (budget, timeline, scope)
4. Provide relevant information and suggestions
5. Offer to schedule a consultation or provide estimate
6. Collect contact information if interested

Remember: You're here to help, not just to sell. Build trust through expertise and genuine interest in solving their problems.`,

  // Lead qualification focused prompt
  qualification: `Based on our conversation, I need to gather some key information to better serve you:

1. **Project Type**: Which service(s) are you most interested in?
2. **Budget Range**: What budget have you allocated for this project?
3. **Timeline**: When would you like to launch or complete this project?
4. **Decision Making**: Are you the primary decision-maker for this project?
5. **Current Situation**: Do you have an existing system/website, or starting from scratch?
6. **Key Requirements**: What are your top 3 must-have features or goals?

This helps me provide accurate recommendations and connect you with the right specialist.`,

  // Consultation scheduling prompt
  scheduling: `I'd love to schedule a free consultation for you with one of our specialists.

During the 30-minute call, we'll:
- Review your project requirements in detail
- Provide preliminary technical recommendations
- Discuss timeline and budget expectations
- Answer any questions you have
- Create a custom proposal (if appropriate)

To book your consultation, I'll need:
- Your full name
- Email address
- Phone number (optional)
- Preferred date/time (we're available Mon-Fri, 9 AM - 5 PM EST)

What works best for your schedule?`,

  // Estimate provision prompt
  estimation: `Based on our conversation, here's a preliminary estimate for your project:

**Service Type**: {serviceType}
**Complexity**: {complexity}
**Estimated Timeline**: {timeline}
**Budget Range**: {budgetRange}

**What's Included:**
{includedFeatures}

**Next Steps:**
1. Schedule a detailed consultation to refine requirements
2. Receive a formal proposal with exact pricing
3. Review and approve project scope
4. Sign agreement and begin development

**Important Note:** This is a preliminary estimate. Final pricing will be determined after a detailed requirements analysis during our consultation.

Would you like to schedule a consultation to discuss this in more detail?`,

  // FAQ handling prompt
  faq: `I can help answer common questions about:

**Services:**
- What types of projects do you handle?
- What technologies do you use?
- Can you integrate with existing systems?

**Process:**
- How does the development process work?
- What's included in the consultation?
- Do you offer ongoing support?

**Pricing & Timeline:**
- How much will my project cost?
- How long will development take?
- What payment terms do you offer?

**Portfolio:**
- Can I see examples of past work?
- Do you have experience in my industry?
- Can you provide client references?

What specific questions do you have?`,
} as const;

/**
 * Quick Action Templates
 * Pre-defined conversation starters
 */
export const QUICK_ACTIONS = [
  {
    id: 'web-dev',
    label: 'Build a Website',
    icon: 'Globe',
    message: "I'm interested in building a website. Can you tell me about your web development services?",
  },
  {
    id: 'ai-solution',
    label: 'AI Integration',
    icon: 'Brain',
    message: "I want to integrate AI into my business. What AI solutions do you offer?",
  },
  {
    id: 'consultation',
    label: 'Schedule Call',
    icon: 'Calendar',
    message: "I'd like to schedule a consultation to discuss my project.",
  },
  {
    id: 'pricing',
    label: 'Get Pricing',
    icon: 'DollarSign',
    message: 'Can you provide pricing information for your services?',
  },
  {
    id: 'portfolio',
    label: 'View Portfolio',
    icon: 'Briefcase',
    message: 'Can I see examples of your previous work?',
  },
  {
    id: 'tokenomics',
    label: 'Blockchain/Web3',
    icon: 'Coins',
    message: "I'm interested in blockchain and tokenomics services. What do you offer?",
  },
] as const;

/**
 * FAQ Database
 * Common questions and answers
 */
export const FAQ_DATABASE = [
  {
    question: 'What services does AiPlace offer?',
    answer:
      'AiPlace specializes in four main areas: Web Development (custom websites and web apps), AI Solutions (chatbots, automation, ML), Business Planning (digital transformation consulting), and Tokenomics (blockchain and Web3 development).',
    keywords: ['services', 'offer', 'do'],
  },
  {
    question: 'How much does a typical project cost?',
    answer:
      'Project costs vary based on complexity and scope. Web development projects typically start at $5,000, AI solutions at $10,000, and blockchain projects at $15,000. We provide detailed estimates after understanding your specific requirements.',
    keywords: ['cost', 'price', 'budget', 'how much'],
  },
  {
    question: 'How long does a project take?',
    answer:
      'Timeline varies by project type and complexity. Simple websites: 4-8 weeks, complex web apps: 3-6 months, AI solutions: 3-9 months, blockchain projects: 4-12 months. We provide exact timelines during the consultation.',
    keywords: ['timeline', 'how long', 'duration', 'time'],
  },
  {
    question: 'Do you offer ongoing support?',
    answer:
      'Yes! We offer ongoing maintenance, support, and updates for all our projects. This includes bug fixes, security updates, feature enhancements, and technical support.',
    keywords: ['support', 'maintenance', 'ongoing', 'after launch'],
  },
  {
    question: 'What technologies do you use?',
    answer:
      'We use modern, industry-standard technologies: React, Next.js, TypeScript for web; Python, TensorFlow for AI; Solidity, Ethereum for blockchain. We choose the best tech stack for each project.',
    keywords: ['technology', 'tech stack', 'programming', 'languages'],
  },
  {
    question: "Can I see your portfolio?",
    answer:
      "Yes! We've completed 100+ projects across various industries. I can share relevant case studies based on your project type. Would you like to schedule a call where we can review our portfolio in detail?",
    keywords: ['portfolio', 'examples', 'past work', 'case studies'],
  },
  {
    question: 'What is the consultation process?',
    answer:
      'Our free 30-minute consultation includes: requirements review, technical recommendations, timeline discussion, budget estimation, and Q&A. If we are a good fit, we will create a detailed proposal.',
    keywords: ['consultation', 'meeting', 'call', 'process'],
  },
  {
    question: 'Do you work with startups or only established companies?',
    answer:
      'We work with both! We have experience with startups, SMBs, and enterprises. We offer flexible engagement models to fit different budget levels and can scale as you grow.',
    keywords: ['startup', 'small business', 'enterprise', 'company size'],
  },
] as const;

/**
 * Lead Scoring Algorithm Configuration
 */
export const LEAD_SCORING_CONFIG = {
  // Budget indicators
  budget: {
    '< $5k': -10,
    '$5k - $10k': 15,
    '$10k - $25k': 25,
    '$25k - $50k': 35,
    '$50k+': 40,
    unclear: 5,
  },

  // Timeline indicators
  timeline: {
    'urgent (< 1 month)': 20,
    '1-3 months': 25,
    '3-6 months': 20,
    '6+ months': 10,
    'no timeline': 5,
  },

  // Decision authority
  authority: {
    'decision maker': 30,
    'influencer': 20,
    'researcher': 10,
    unclear: 15,
  },

  // Project scope clarity
  scope: {
    'very clear': 20,
    'somewhat clear': 15,
    'exploring options': 10,
    unclear: 5,
  },

  // Engagement level
  engagement: {
    'highly engaged': 10,
    'moderately engaged': 7,
    'passively interested': 3,
  },
} as const;

export default AI_CONFIG;
