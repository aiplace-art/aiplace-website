# AI Assistant Setup Guide

## Overview

The AiPlace AI Assistant is a powerful chatbot powered by Anthropic's Claude 3.5 Sonnet model. It provides intelligent customer service, lead qualification, and consultation scheduling for the AiPlace website.

## Features

✅ **Intelligent Conversations** - Natural language understanding powered by Claude 3.5 Sonnet
✅ **Lead Qualification** - Automatic scoring and qualification of potential clients
✅ **Service Information** - Detailed information about web dev, AI, business planning, and tokenomics
✅ **Consultation Scheduling** - Book meetings directly through the chat
✅ **Project Estimation** - Get preliminary cost estimates
✅ **Glassmorphic UI** - Beautiful, modern design with smooth animations
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Conversation Memory** - Persistent chat history across sessions
✅ **Streaming Responses** - Real-time response streaming for better UX

## Quick Start

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy from example
cp .env.example .env.local
```

Add your Anthropic API key:

```env
# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Optional: Customize AI settings
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
ANTHROPIC_MAX_TOKENS=4096

# Optional: Enable/disable features
AI_ASSISTANT_ENABLED=true
AI_AUTO_LEAD_SCORING=true
```

### 3. Set Up Database (Optional)

The assistant currently uses in-memory storage. To enable persistent storage with PostgreSQL:

```bash
# Install Prisma if not already installed
npm install prisma @prisma/client

# Copy the schema to the correct location
cp src/backend/prisma/schema.prisma prisma/schema.prisma

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/aiplace"

# Run migrations
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and you'll see the chat widget in the bottom-right corner!

## Project Structure

```
src/
├── app/api/chat/                    # API routes
│   ├── message/route.ts             # Send messages, streaming responses
│   ├── history/route.ts             # Get conversation history
│   └── lead/route.ts                # Submit qualified leads
│
├── backend/
│   ├── config/
│   │   └── ai-assistant.config.ts   # AI configuration and prompts
│   ├── services/
│   │   ├── claude.service.ts        # Anthropic API integration
│   │   ├── conversation.service.ts  # Conversation management
│   │   └── lead-qualification.service.ts  # Lead scoring
│   └── prisma/
│       └── schema.prisma            # Database schema
│
├── components/chat/                 # UI components
│   ├── ChatWidgetNew.tsx            # Floating chat button
│   ├── ChatWindowNew.tsx            # Main chat interface
│   ├── MessageList.tsx              # Message display
│   ├── MessageInput.tsx             # Input field
│   ├── QuickActionsNew.tsx          # Quick action buttons
│   └── TypingIndicatorNew.tsx       # Typing animation
│
└── hooks/
    └── useChatApi.ts                # Chat state management hook
```

## Configuration

### AI Prompts

Edit `/src/backend/config/ai-assistant.config.ts` to customize:

- **System prompts** - Define AI personality and behavior
- **Service descriptions** - Update service offerings
- **Lead qualification rules** - Adjust scoring thresholds
- **Quick actions** - Modify pre-defined conversation starters
- **Estimation logic** - Customize pricing calculations

### UI Customization

The chat widget uses glassmorphism design with Tailwind CSS. Customize in:

- **Colors**: `ai-assistant.config.ts` → `ui.colors`
- **Animations**: Component files use Framer Motion
- **Layout**: Adjust dimensions in `ChatWindow.tsx`

## API Endpoints

### POST /api/chat/message

Send a message and receive streaming AI response.

**Request:**
```json
{
  "sessionId": "optional-session-id",
  "message": "Hello, I need help with web development",
  "metadata": {}
}
```

**Response:** Server-Sent Events (SSE)
```
data: {"type": "token", "content": "Hello"}
data: {"type": "token", "content": "! I'd"}
data: {"type": "token", "content": " be happy"}
data: {"type": "done", "sessionId": "xxx", "messageId": "yyy"}
```

### GET /api/chat/history

Get conversation history by session ID.

**Request:**
```
GET /api/chat/history?sessionId=xxx
```

**Response:**
```json
{
  "conversation": { ... },
  "messages": [ ... ],
  "count": 10
}
```

### POST /api/chat/lead

Submit qualified lead information.

**Request:**
```json
{
  "sessionId": "xxx",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Inc",
  "serviceType": "Web Development",
  "budget": "$10k - $25k",
  "timeline": "3-6 months",
  "description": "Need a new website"
}
```

**Response:**
```json
{
  "success": true,
  "leadId": "lead_xxx",
  "score": 75,
  "qualified": true
}
```

## Integration

### Add to Existing Pages

1. **Import the widget:**

```tsx
import ChatWidget from '@/components/chat/ChatWidgetNew';
```

2. **Add to your layout:**

```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
```

### Using the Hook

```tsx
import { useChatApi } from '@/hooks/useChatApi';

function MyComponent() {
  const {
    messages,
    isLoading,
    sendMessage,
    submitLead,
    sessionId,
  } = useChatApi();

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      <button onClick={() => sendMessage('Hello!')}>
        Send
      </button>
    </div>
  );
}
```

## Lead Qualification

The assistant automatically analyzes conversations to score and qualify leads:

### Scoring Criteria

| Factor | Weight | Description |
|--------|--------|-------------|
| Budget | 25% | Higher budgets score better |
| Timeline | 20% | Urgent projects score higher |
| Decision Authority | 25% | Decision makers score highest |
| Project Scope | 15% | Clear scope scores better |
| Engagement | 10% | More messages = higher score |
| Urgency | 5% | Urgent needs score higher |

### Qualification Threshold

- **Minimum Score**: 60/100
- **Qualified Budget**: $5,000+
- **Maximum Timeline**: 12 months

### Automatic Actions

When a lead is qualified:

1. ✅ Lead record created
2. 📧 Sales team notified (TODO: implement)
3. 📊 CRM integration (TODO: implement)
4. 💬 Conversation status updated to "QUALIFIED"

## Testing

### Test the Chat Widget

1. Open your website
2. Click the floating chat button
3. Try quick actions
4. Send some messages
5. Check console for logs

### Test Lead Qualification

Send messages like:
- "I need a website for my business"
- "My budget is around $20,000"
- "We need to launch in 3 months"
- "I'm the CEO and I make the decisions"

Check the console for lead scoring output.

### Test API Endpoints

Using curl or Postman:

```bash
# Send a message
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Get history
curl http://localhost:3000/api/chat/history?sessionId=xxx

# Submit lead
curl -X POST http://localhost:3000/api/chat/lead \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "xxx",
    "name": "John Doe",
    "email": "john@example.com",
    "serviceType": "Web Development"
  }'
```

## Deployment

### Environment Variables (Production)

Set these in your deployment platform (Vercel, Netlify, etc.):

```env
ANTHROPIC_API_KEY=sk-ant-xxx
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=https://aiplace.com
```

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Database Setup (Production)

1. Create a PostgreSQL database
2. Set `DATABASE_URL` in environment variables
3. Run migrations:

```bash
npx prisma db push --force-reset
```

## Monitoring

### Logs

All conversations and errors are logged to console. In production, integrate with:

- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Mixpanel** - Analytics

### Metrics to Track

- Total conversations
- Average messages per conversation
- Lead qualification rate
- Response time
- User satisfaction

## Troubleshooting

### Chat widget not appearing

✅ Check that `ChatWidget` is imported in your layout
✅ Verify z-index is high enough (z-50)
✅ Check console for errors

### API errors

✅ Verify `ANTHROPIC_API_KEY` is set correctly
✅ Check API key has sufficient credits
✅ Review rate limits

### Messages not streaming

✅ Check browser supports Server-Sent Events
✅ Verify API route is returning SSE format
✅ Check network tab for connection issues

### Lead not qualifying

✅ Review conversation for qualifying keywords
✅ Check scoring thresholds in config
✅ Verify at least 4-5 messages exchanged

## Customization Examples

### Change AI Personality

Edit `SYSTEM_PROMPTS.main` in `ai-assistant.config.ts`:

```typescript
export const SYSTEM_PROMPTS = {
  main: `You are a friendly, enthusiastic AI assistant for AiPlace...`,
};
```

### Add New Quick Action

Edit `QUICK_ACTIONS` in `ai-assistant.config.ts`:

```typescript
export const QUICK_ACTIONS = [
  // ... existing actions
  {
    id: 'custom-action',
    label: 'Custom Service',
    icon: 'Rocket',
    message: "I'm interested in your custom service",
  },
];
```

### Modify Lead Scoring

Edit `LEAD_SCORING_CONFIG` in `ai-assistant.config.ts`:

```typescript
export const LEAD_SCORING_CONFIG = {
  budget: {
    '< $5k': 0,      // Lower threshold
    '$5k - $10k': 10,
    '$10k+': 30,     // Higher score for big budgets
  },
};
```

## Security

### Best Practices

✅ Never commit API keys to version control
✅ Use environment variables for secrets
✅ Implement rate limiting on API routes
✅ Validate all user inputs
✅ Sanitize messages before displaying
✅ Use HTTPS in production

### Rate Limiting

The assistant includes basic rate limiting:

- **Messages per minute**: 10
- **Messages per hour**: 100
- **Tokens per day**: 100,000

Adjust in `ai-assistant.config.ts`.

## Future Enhancements

### Planned Features

- [ ] Multi-language support
- [ ] Voice input/output
- [ ] File uploads
- [ ] Screen sharing for consultations
- [ ] CRM integration (HubSpot, Salesforce)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Calendar integration (Google Calendar, Calendly)
- [ ] Advanced analytics dashboard
- [ ] A/B testing for conversation flows
- [ ] Sentiment analysis
- [ ] Admin dashboard for managing conversations

### Database Integration

Currently using in-memory storage. To enable full database support:

1. Set up PostgreSQL
2. Configure `DATABASE_URL`
3. Run migrations
4. Update services to use Prisma client

## Support

### Getting Help

- **Documentation**: `/docs/ai-assistant-architecture.md`
- **API Reference**: This README
- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community

### Common Issues

See the Troubleshooting section above.

## License

MIT License - see LICENSE file for details.

---

**Version**: 1.0.0
**Last Updated**: 2025-10-02
**Author**: AiPlace Development Team
**Status**: Production Ready
