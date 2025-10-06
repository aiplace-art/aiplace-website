# AI Assistant Backend Infrastructure

Complete backend implementation for the AiPlace AI assistant powered by Anthropic's Claude API.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Services](#services)
- [Security](#security)
- [Testing](#testing)

## 🎯 Overview

This backend infrastructure provides a complete AI assistant system with:

- **Streaming chat responses** using Claude API
- **Conversation management** with context tracking
- **Intelligent lead qualification** scoring
- **Analytics and monitoring**
- **Rate limiting and abuse prevention**
- **Admin dashboard API** for conversation review

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js API   │
│    Routes       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Handlers      │
│  - Chat Stream  │
│  - Conversation │
│  - Lead Score   │
│  - Admin        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Services      │
│  - Anthropic    │
│  - Conversation │
│  - Lead Scoring │
│  - Analytics    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Database      │
│   (Prisma)      │
└─────────────────┘
```

## ✨ Features

### 1. Streaming Chat
- Real-time streaming responses from Claude
- Server-Sent Events (SSE) implementation
- Token usage tracking
- Context-aware conversations

### 2. Conversation Management
- Session-based conversation tracking
- Automatic context management (last 20 messages)
- Contact information extraction
- Multi-device session handling

### 3. Lead Qualification
- **5-Component Scoring System** (0-100 total):
  - Engagement (0-20): Message count, length, questions
  - Intent (0-20): Buying signals, service interest
  - Budget (0-20): Budget indicators, specific amounts
  - Timeline (0-20): Urgency, deadlines mentioned
  - Qualification (0-20): Authority, contact info

- **Lead Quality Levels**:
  - QUALIFIED (80-100)
  - HIGH (60-79)
  - MEDIUM (40-59)
  - LOW (20-39)
  - UNKNOWN (0-19)

### 4. Analytics
- Conversation metrics tracking
- Response time monitoring
- Token usage analytics
- Lead conversion tracking
- Sentiment analysis

### 5. Rate Limiting
- IP-based rate limiting
- Per-endpoint limits:
  - Chat streaming: 30 req/min
  - Messages: 60 req/min
  - Conversation creation: 10 req/min
- Automatic cleanup of expired records

### 6. Admin API
- Conversation review dashboard
- Lead score filtering
- Analytics reports
- Export capabilities (JSON, TXT)
- Flagging and moderation

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp src/backend/.env.example .env.local
```

**Required variables:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/aiplace_db"

# Anthropic Claude API
ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
ANTHROPIC_MODEL="claude-3-5-sonnet-20241022"
ANTHROPIC_MAX_TOKENS="4096"

# Admin API
ADMIN_API_KEY="your-secure-admin-api-key-here"
```

### 3. Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Open Prisma Studio (optional)
npm run db:studio
```

### 4. Start Development Server

```bash
npm run dev
```

## 🔌 API Endpoints

### Chat Endpoints

#### `POST /api/chat/stream`
Stream chat responses from Claude.

**Request:**
```json
{
  "conversationId": "conv_123",
  "message": "Tell me about your AI solutions",
  "includeContext": true,
  "maxContextMessages": 20
}
```

**Response:** Server-Sent Events (SSE)
```
data: {"type":"content","text":"We offer..."}
data: {"type":"content","text":" comprehensive"}
data: {"type":"done","usage":{"input_tokens":150,"output_tokens":75}}
```

#### `POST /api/chat/conversation`
Start a new conversation.

**Request:**
```json
{
  "sessionId": "session_abc123",
  "visitorId": "visitor_xyz",
  "metadata": {
    "source": "homepage",
    "referrer": "google.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "conv_123",
      "sessionId": "session_abc123",
      "status": "ACTIVE",
      "startedAt": "2025-10-02T12:00:00Z"
    }
  }
}
```

#### `GET /api/chat/conversation/:id`
Get conversation details.

**Response:**
```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "conv_123",
      "messages": [...],
      "leadScore": 75,
      "leadQuality": "HIGH"
    }
  }
}
```

#### `PATCH /api/chat/conversation/:id`
Update conversation metadata.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "tags": ["enterprise", "ai-interest"]
}
```

### Lead Scoring Endpoints

#### `POST /api/chat/lead-score`
Calculate lead score for a conversation.

**Request:**
```json
{
  "conversationId": "conv_123",
  "forceRecalculate": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "leadScore": {
      "totalScore": 75,
      "engagementScore": 18,
      "intentScore": 16,
      "budgetScore": 14,
      "timelineScore": 12,
      "qualificationScore": 15,
      "leadQuality": "HIGH",
      "signals": [
        "Intent: looking for",
        "Service interest: ai solution",
        "Budget indicator: budget",
        "Decision maker identified"
      ],
      "summary": "Highly engaged prospect..."
    },
    "cached": false
  }
}
```

### Admin Endpoints

**Authentication:** Bearer token via `Authorization` header

#### `GET /api/admin/conversations`
List all conversations with filters.

**Query Parameters:**
- `status`: ACTIVE, COMPLETED, ABANDONED, BLOCKED
- `leadQuality`: UNKNOWN, LOW, MEDIUM, HIGH, QUALIFIED
- `flagged`: true/false
- `minLeadScore`: 0-100
- `startDate`: ISO date string
- `endDate`: ISO date string
- `limit`: number (default 50)
- `offset`: number (default 0)

#### `GET /api/admin/conversations/:id`
Get full conversation details with analytics.

**Response:**
```json
{
  "conversation": {...},
  "leadScore": {...},
  "metrics": {
    "totalEvents": 25,
    "averageResponseTime": 1250,
    "totalTokens": 3500,
    "eventTypes": {
      "MESSAGE_SENT": 10,
      "MESSAGE_RECEIVED": 10,
      "LEAD_QUALIFIED": 1
    }
  }
}
```

#### `POST /api/admin/conversations/:id/flag`
Flag conversation for review.

**Request:**
```json
{
  "reason": "Inappropriate content detected"
}
```

#### `GET /api/admin/analytics`
Get analytics report.

**Query Parameters:**
- `days`: Number of days (default 7)

**Response:**
```json
{
  "report": {
    "totalConversations": 150,
    "activeConversations": 25,
    "completedConversations": 125,
    "averageMessageCount": 8.5,
    "averageResponseTime": 1200,
    "totalTokensUsed": 125000,
    "leadQualityDistribution": {
      "QUALIFIED": 15,
      "HIGH": 30,
      "MEDIUM": 45,
      "LOW": 35,
      "UNKNOWN": 25
    },
    "topServices": [
      {"service": "ai-solutions", "count": 45},
      {"service": "web-development", "count": 38}
    ],
    "conversionRate": 35.5
  }
}
```

## 💾 Database Schema

### Conversation
```prisma
model Conversation {
  id                String
  sessionId         String   @unique
  visitorId         String?

  // Contact info
  name              String?
  email             String?
  phone             String?
  company           String?

  // Metadata
  title             String?
  context           Json?
  tags              String[]

  // Lead info
  leadScore         Int      @default(0)
  leadQuality       LeadQuality
  interestedServices String[]

  // Status
  status            ConversationStatus
  sentiment         Sentiment

  // Relations
  messages          Message[]
  leadScores        LeadScore[]
  analytics         ChatAnalytics[]
}
```

### Message
```prisma
model Message {
  id              String
  conversationId  String
  role            MessageRole
  content         String

  // AI metadata
  model           String?
  tokens          Int?
  finishReason    String?

  conversation    Conversation
}
```

### LeadScore
```prisma
model LeadScore {
  id                  String
  conversationId      String

  engagementScore     Int
  intentScore         Int
  budgetScore         Int
  timelineScore       Int
  qualificationScore  Int
  totalScore          Int

  signals             Json?
  keywords            String[]
  summary             String?
  recommendations     String?

  conversation        Conversation
}
```

## 🛠️ Services

### AnthropicService
**Location:** `/src/backend/services/anthropic.service.ts`

- `streamChatCompletion()`: Stream responses from Claude
- `chatCompletion()`: Non-streaming completion
- `analyzeConversation()`: AI-powered lead analysis
- `generateSummary()`: Create conversation summary

### ConversationService
**Location:** `/src/backend/services/conversation.service.ts`

- `getOrCreateConversation()`: Session-based conversation retrieval
- `addMessage()`: Add message to conversation
- `getConversationContext()`: Get recent messages for context
- `updateConversation()`: Update metadata
- `extractContactInfo()`: Auto-extract contact details

### LeadScoringService
**Location:** `/src/backend/services/lead-scoring.service.ts`

- `calculateLeadScore()`: Multi-factor scoring algorithm
- `getLatestScore()`: Retrieve most recent score
- `getLeadScores()`: Filtered score listing

### AnalyticsService
**Location:** `/src/backend/services/analytics.service.ts`

- `trackEvent()`: Track analytics events
- `getAnalyticsReport()`: Generate reports
- `getConversationMetrics()`: Per-conversation metrics
- `checkRateLimit()`: Rate limit verification

## 🔒 Security

### Rate Limiting
- IP-based tracking
- Per-endpoint limits
- Automatic cleanup
- Redis-ready (in-memory by default)

### Input Validation
- Zod schema validation
- Sanitization of user input
- XSS prevention
- SQL injection prevention (Prisma ORM)

### Authentication
- Admin API key authentication
- Session-based user tracking
- CSRF protection ready

### Data Protection
- Conversation encryption support
- PII handling compliance
- Automatic contact info extraction
- Flagging system for moderation

## 🧪 Testing

### Manual Testing

1. **Test streaming chat:**
```bash
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "test_conv",
    "message": "Hello, I need AI solutions"
  }'
```

2. **Test lead scoring:**
```bash
curl -X POST http://localhost:3000/api/chat/lead-score \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "test_conv"
  }'
```

3. **Test admin API:**
```bash
curl http://localhost:3000/api/admin/conversations \
  -H "Authorization: Bearer your-admin-key"
```

## 📊 Monitoring

### Key Metrics to Track

1. **Performance:**
   - Average response time
   - Token usage per conversation
   - API error rate

2. **Business:**
   - Lead qualification rate
   - Conversion to appointments
   - Top interested services

3. **Usage:**
   - Daily active conversations
   - Messages per conversation
   - Rate limit hits

## 🚀 Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure production database
- [ ] Set up Redis for rate limiting (optional)
- [ ] Enable monitoring (Sentry, LogRocket)
- [ ] Configure CORS properly
- [ ] Set up backup strategy
- [ ] Enable SSL/TLS
- [ ] Test rate limiting
- [ ] Review security headers
- [ ] Set up logging

## 📝 File Structure

```
/src/backend/
├── api/
│   ├── chat/
│   │   ├── stream.handler.ts
│   │   ├── conversation.handler.ts
│   │   └── lead-score.handler.ts
│   └── admin/
│       └── chat-review.handler.ts
├── services/
│   ├── anthropic.service.ts
│   ├── conversation.service.ts
│   ├── lead-scoring.service.ts
│   └── analytics.service.ts
├── schemas/
│   └── chat.schemas.ts
├── middleware/
│   └── rate-limit.middleware.ts
├── utils/
│   ├── validation.utils.ts
│   └── response.utils.ts
├── prisma/
│   └── schema.prisma
└── .env.example
```

## 🤝 Support

For issues or questions:
1. Check the documentation
2. Review error logs
3. Test with Prisma Studio
4. Contact the development team

---

**Built with:**
- Next.js 14
- Anthropic Claude API
- Prisma ORM
- PostgreSQL
- TypeScript
- Zod Validation
