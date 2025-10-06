# AI Assistant Architecture - AiPlace Website

## Overview

The AiPlace AI Assistant is an intelligent chatbot powered by Anthropic's Claude 3.5 Sonnet model, designed to provide personalized customer service, lead qualification, and consultation scheduling for AiPlace services.

## Core Features

### 1. Service Information & Consultation
- Answer questions about web development, AI solutions, business planning, and tokenomics
- Provide detailed service explanations and use cases
- Discuss technology stacks and implementation approaches

### 2. Lead Qualification
- Intelligent conversation flow to understand client needs
- Budget and timeline estimation
- Project scope assessment
- Service routing based on requirements

### 3. Consultation Scheduling
- Calendar integration for booking consultations
- Time zone handling
- Reminder notifications
- Meeting preparation materials

### 4. Project Estimation
- Gather project requirements through conversation
- Provide preliminary cost estimates
- Suggest appropriate service packages
- Timeline projections

### 5. Contact Management
- Collect and validate contact information
- CRM integration for lead tracking
- Follow-up automation
- Email notification system

### 6. FAQ Handling
- Comprehensive knowledge base
- Common question patterns
- Contextual help suggestions
- Resource recommendations

## Architecture Components

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ChatWidget.tsx         │  Floating chat bubble UI          │
│  ChatWindow.tsx         │  Main conversation interface      │
│  MessageList.tsx        │  Message display component        │
│  MessageInput.tsx       │  User input with suggestions      │
│  TypingIndicator.tsx    │  AI typing animation             │
│  QuickActions.tsx       │  Predefined action buttons        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      API Layer (Next.js)                     │
├─────────────────────────────────────────────────────────────┤
│  /api/chat/message      │  Send message to AI              │
│  /api/chat/history      │  Retrieve conversation history   │
│  /api/chat/lead         │  Submit qualified lead           │
│  /api/chat/schedule     │  Book consultation               │
│  /api/chat/estimate     │  Get project estimate            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                       Service Layer                          │
├─────────────────────────────────────────────────────────────┤
│  ClaudeService          │  Anthropic API integration       │
│  ConversationService    │  Conversation state management   │
│  LeadQualificationSvc   │  Lead scoring & routing          │
│  EstimationService      │  Project cost calculation        │
│  NotificationService    │  Email & webhook notifications   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Database Layer (Prisma)                 │
├─────────────────────────────────────────────────────────────┤
│  Conversations          │  Chat sessions                   │
│  Messages               │  Individual messages             │
│  Leads                  │  Qualified leads                 │
│  Consultations          │  Scheduled meetings              │
│  ProjectEstimates       │  Cost estimates                  │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18** with Next.js 14 (App Router)
- **Framer Motion** for animations
- **Tailwind CSS** with glassmorphism utilities
- **Lucide React** for icons
- **TypeScript** for type safety

### Backend
- **Next.js API Routes** for serverless functions
- **Anthropic Claude SDK** for AI capabilities
- **Prisma ORM** for database operations
- **Zod** for validation
- **Server-Sent Events (SSE)** for streaming responses

### Database
- **PostgreSQL** (production) or **SQLite** (development)
- **Prisma** for schema management and queries

### AI Model
- **Claude 3.5 Sonnet** (claude-3-5-sonnet-20241022)
  - 200K token context window
  - Function calling support
  - System prompts for role definition
  - Streaming responses

## Data Flow

### 1. User Interaction Flow
```
User types message → ChatWidget → API Route → ClaudeService →
Database (save message) → Claude API → Stream response →
Update UI → Save AI response
```

### 2. Lead Qualification Flow
```
User answers questions → Context accumulation →
Lead scoring algorithm → Threshold check →
Create lead record → Notify sales team →
Suggest next steps
```

### 3. Consultation Booking Flow
```
User requests meeting → Check availability →
Present time slots → User selects time →
Create consultation record → Send confirmation →
Add to calendar → Send reminders
```

## AI Prompt Strategy

### System Prompt Structure
```
Role: Professional AI assistant for AiPlace
Personality: Helpful, knowledgeable, consultative
Tone: Professional yet approachable
Language: Clear, concise, no jargon unless necessary

Context: Company services, pricing models, case studies
Constraints: Data privacy, appropriate boundaries
Goals: Qualify leads, provide value, schedule consultations
```

### Conversation Stages
1. **Greeting & Discovery** - Understand initial needs
2. **Information Gathering** - Ask qualifying questions
3. **Solution Presentation** - Suggest appropriate services
4. **Objection Handling** - Address concerns
5. **Call to Action** - Schedule consultation or get contact info

### Example Prompts
- **Initial System Prompt**: "You are an AI assistant for AiPlace, a company specializing in web development, AI solutions, business planning, and tokenomics..."
- **Lead Qualification**: "Based on the conversation, determine if this is a qualified lead (budget >$5k, timeline <6 months, decision maker)..."
- **Estimation**: "Calculate a preliminary estimate based on: project type, complexity, timeline, features..."

## Database Schema

### Conversations Table
```typescript
model Conversation {
  id            String        @id @default(cuid())
  sessionId     String        @unique
  userId        String?       // For authenticated users
  status        ConversationStatus @default(ACTIVE)
  leadScore     Int           @default(0)
  leadQualified Boolean       @default(false)
  metadata      Json?         // Custom data
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  messages      Message[]
  lead          Lead?
}

enum ConversationStatus {
  ACTIVE
  QUALIFIED
  SCHEDULED
  CONVERTED
  ARCHIVED
}
```

### Messages Table
```typescript
model Message {
  id             String       @id @default(cuid())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  role           MessageRole
  content        String       @db.Text
  metadata       Json?
  createdAt      DateTime     @default(now())
}

enum MessageRole {
  USER
  ASSISTANT
  SYSTEM
}
```

### Leads Table
```typescript
model Lead {
  id             String       @id @default(cuid())
  conversationId String       @unique
  conversation   Conversation @relation(fields: [conversationId], references: [id])
  name           String?
  email          String?
  phone          String?
  company        String?
  serviceType    String
  budget         String?
  timeline       String?
  description    String?      @db.Text
  score          Int
  status         LeadStatus   @default(NEW)
  assignedTo     String?
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  PROPOSAL_SENT
  WON
  LOST
}
```

### Consultations Table
```typescript
model Consultation {
  id             String       @id @default(cuid())
  leadId         String
  scheduledAt    DateTime
  duration       Int          // minutes
  meetingType    String       // video, phone, in-person
  meetingLink    String?
  status         ConsultationStatus @default(SCHEDULED)
  notes          String?      @db.Text
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

enum ConsultationStatus {
  SCHEDULED
  COMPLETED
  CANCELLED
  RESCHEDULED
  NO_SHOW
}
```

## API Endpoints

### POST /api/chat/message
Send a message and receive AI response
```typescript
Request:
{
  sessionId: string
  message: string
  metadata?: object
}

Response: (Server-Sent Events)
data: {"type": "token", "content": "..."}
data: {"type": "done", "messageId": "..."}
```

### GET /api/chat/history
Retrieve conversation history
```typescript
Request: ?sessionId=xxx

Response:
{
  conversation: Conversation
  messages: Message[]
}
```

### POST /api/chat/lead
Submit qualified lead information
```typescript
Request:
{
  sessionId: string
  name: string
  email: string
  phone?: string
  company?: string
  serviceType: string
  budget?: string
  timeline?: string
  description?: string
}

Response:
{
  leadId: string
  status: "created"
}
```

### POST /api/chat/schedule
Book a consultation
```typescript
Request:
{
  leadId: string
  scheduledAt: string (ISO 8601)
  duration: number
  meetingType: "video" | "phone" | "in-person"
}

Response:
{
  consultationId: string
  meetingLink?: string
  confirmationSent: boolean
}
```

### POST /api/chat/estimate
Get project estimate
```typescript
Request:
{
  sessionId: string
  projectType: string
  features: string[]
  complexity: "simple" | "medium" | "complex"
  timeline: string
}

Response:
{
  estimateId: string
  costRange: { min: number, max: number }
  timelineEstimate: string
  recommendedServices: string[]
}
```

## UI/UX Design

### Chat Widget (Floating Button)
- **Position**: Bottom-right corner
- **Design**: Glassmorphic bubble with gradient
- **Animation**: Subtle pulse effect
- **Badge**: Unread message count
- **Icon**: Message icon with smooth transitions

### Chat Window
- **Dimensions**: 400px × 600px (desktop), full screen (mobile)
- **Design**: Glassmorphic container with backdrop blur
- **Header**: Company logo, title, close button
- **Body**: Scrollable message list
- **Footer**: Input field with send button
- **Effects**: Smooth slide-in animation

### Messages
- **User Messages**: Right-aligned, solid background
- **AI Messages**: Left-aligned, semi-transparent
- **Timestamps**: Subtle, hover to reveal
- **Actions**: Quick reply buttons, copy, regenerate

### Animations
- **Message Entry**: Slide up + fade in
- **Typing Indicator**: Animated dots
- **Widget Open/Close**: Scale + slide
- **Quick Actions**: Stagger animation

## Security Considerations

### 1. Input Validation
- Sanitize all user inputs
- Validate message length (max 4000 chars)
- Rate limiting (10 messages per minute)
- CSRF protection on API routes

### 2. Data Privacy
- No storage of sensitive data in plain text
- GDPR compliance for EU users
- Clear data retention policies
- Option to delete conversation history

### 3. API Security
- API key stored in environment variables
- Request authentication for admin endpoints
- CORS configuration
- Rate limiting on API routes

### 4. Content Safety
- Content moderation for inappropriate messages
- Spam detection
- Bot detection (honeypot fields)
- IP-based blocking for abuse

## Performance Optimization

### 1. Frontend
- Lazy loading of chat component
- Virtual scrolling for long conversations
- Optimistic UI updates
- Message batching

### 2. Backend
- Response streaming for faster perceived performance
- Database query optimization with indexes
- Caching of common responses
- Connection pooling

### 3. AI Integration
- Token usage monitoring
- Response caching for FAQ
- Parallel processing where possible
- Graceful degradation on API failures

## Monitoring & Analytics

### Metrics to Track
- **Engagement**: Messages per session, session duration
- **Conversion**: Lead qualification rate, consultation bookings
- **Performance**: Response time, error rate
- **User Satisfaction**: Feedback scores, conversation completion rate
- **AI Quality**: Relevance scores, fallback frequency

### Logging
- All conversations logged for quality assurance
- Error tracking with context
- API usage monitoring
- Performance metrics

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] API keys validated
- [ ] Rate limiting configured
- [ ] Error tracking setup
- [ ] Analytics integrated
- [ ] Backup strategy implemented
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Documentation updated

## Future Enhancements

### Phase 2
- Multi-language support
- Voice input/output
- File upload capability
- Screen sharing for consultations
- Integration with CRM systems

### Phase 3
- Advanced analytics dashboard
- A/B testing for conversation flows
- AI model fine-tuning
- Sentiment analysis
- Predictive lead scoring

### Phase 4
- Mobile app integration
- Slack/Discord bot versions
- White-label solution for clients
- Advanced automation workflows
- Custom AI training on company data

## Support & Maintenance

### Regular Tasks
- Monitor AI performance and adjust prompts
- Review conversation quality
- Update knowledge base
- Optimize database queries
- Security patches

### Escalation Paths
- Technical issues → DevOps team
- AI quality issues → AI specialist
- Business logic → Product team
- Security concerns → Security team

## Resources

### Documentation
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Tools
- **Development**: VS Code, Postman, Prisma Studio
- **Monitoring**: Vercel Analytics, Sentry
- **Database**: PostgreSQL, Prisma
- **AI**: Anthropic Console, Claude API

---

**Document Version**: 1.0
**Last Updated**: 2025-10-02
**Author**: AI Assistant Development Team
**Status**: Implementation Ready
