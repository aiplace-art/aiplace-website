# Quick Start Guide - AI Assistant

Get the AI assistant backend up and running in 5 minutes.

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL database (local or cloud)
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `@anthropic-ai/sdk` - Anthropic Claude API client
- `@prisma/client` - Database ORM
- `zod` - Schema validation
- Other dependencies

### Step 2: Configure Environment

```bash
# Copy environment template
cp src/backend/.env.example .env.local

# Edit .env.local with your values
nano .env.local
```

**Minimum required configuration:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/aiplace_db"

# Anthropic API
ANTHROPIC_API_KEY="sk-ant-your-actual-api-key-here"

# Admin API (generate a secure random key)
ADMIN_API_KEY="your-secure-random-key-here"
```

**Generate a secure admin key:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Setup Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Optional: Open Prisma Studio to view database
npm run db:studio
```

### Step 4: Create API Routes

Create these Next.js API route files:

**`/src/app/api/chat/stream/route.ts`**
```typescript
import { POST as StreamHandler } from '@/backend/api/chat/stream.handler';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return StreamHandler(req);
}
```

**`/src/app/api/chat/conversation/route.ts`**
```typescript
import { POST } from '@/backend/api/chat/conversation.handler';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return POST(req);
}
```

Or use the automated script:
```bash
chmod +x scripts/create-api-routes.sh
./scripts/create-api-routes.sh
```

### Step 5: Start Development Server

```bash
npm run dev
```

Server runs at: `http://localhost:3000`

## ✅ Verify Installation

### Test 1: Create Conversation

```bash
curl -X POST http://localhost:3000/api/chat/conversation \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session_123"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "clxxx...",
      "sessionId": "test_session_123",
      "status": "ACTIVE"
    }
  }
}
```

### Test 2: Stream Chat (copy conversation ID from above)

```bash
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "YOUR_CONVERSATION_ID",
    "message": "Hello, tell me about your AI solutions"
  }'
```

**Expected response:**
```
data: {"type":"content","text":"Hello! I'd be happy to tell you..."}
data: {"type":"content","text":" about our AI solutions."}
data: {"type":"done","usage":{"input_tokens":150,"output_tokens":75}}
```

### Test 3: Admin API

```bash
curl http://localhost:3000/api/admin/conversations \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"
```

## 🎨 Frontend Integration

### Simple Chat Component

```typescript
'use client';

import { useState, useEffect } from 'react';

export function SimpleChat() {
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Create conversation on mount
    fetch('/api/chat/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: `session_${Date.now()}`
      })
    })
      .then(res => res.json())
      .then(data => setConversationId(data.data.conversation.id));
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !conversationId) return;

    // Add user message
    setMessages(prev => [...prev, `You: ${input}`]);
    const userInput = input;
    setInput('');

    // Stream response
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId,
        message: userInput
      })
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = '';

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          if (data.type === 'content') {
            assistantMessage += data.text;
            setMessages(prev => [
              ...prev.slice(0, -1),
              `AI: ${assistantMessage}`
            ]);
          }
        }
      }
    }

    if (!assistantMessage) {
      setMessages(prev => [...prev, `AI: ${assistantMessage}`]);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="h-96 overflow-y-auto border p-4 mb-4 rounded">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">{msg}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 border p-2 rounded"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
```

Add to your page:
```typescript
import { SimpleChat } from '@/components/SimpleChat';

export default function Page() {
  return <SimpleChat />;
}
```

## 🐛 Troubleshooting

### Database Connection Error

**Error:** `Can't reach database server`

**Solution:**
```bash
# Check PostgreSQL is running
pg_isready

# Or start PostgreSQL (macOS)
brew services start postgresql@14

# Or start PostgreSQL (Linux)
sudo systemctl start postgresql
```

### Anthropic API Error

**Error:** `Authentication failed`

**Solution:**
- Verify your API key at https://console.anthropic.com/
- Check `.env.local` has correct `ANTHROPIC_API_KEY`
- Restart dev server after changing env vars

### Rate Limit Error

**Error:** `Rate limit exceeded`

**Solution:**
Adjust limits in `.env.local`:
```env
RATE_LIMIT_CHAT_STREAM_MAX="60"
RATE_LIMIT_CHAT_MESSAGE_MAX="120"
```

### Streaming Not Working

**Error:** Messages not streaming

**Solution:**
- Ensure you're using `fetch` with streaming support
- Check browser console for errors
- Verify API route is properly configured
- Try edge runtime: `export const runtime = 'edge'`

## 📊 View Database

```bash
# Open Prisma Studio
npm run db:studio
```

Opens at: `http://localhost:5555`

You can:
- View all conversations
- Check messages
- Review lead scores
- Monitor analytics

## 🔐 Security Checklist

Before going to production:

- [ ] Change `ADMIN_API_KEY` to a secure random value
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Review rate limits
- [ ] Enable monitoring (Sentry, etc.)
- [ ] Set up database backups
- [ ] Add request logging

## 📈 Next Steps

1. **Build the UI:**
   - Create chat widget component
   - Add typing indicators
   - Implement message history
   - Add file upload (future)

2. **Integrate Services:**
   - Connect calendar for appointments
   - Add email notifications
   - Integrate CRM (HubSpot, Salesforce)
   - Set up analytics dashboard

3. **Enhance Features:**
   - Add conversation search
   - Implement conversation export
   - Create admin dashboard
   - Add multi-language support

4. **Optimize Performance:**
   - Add Redis for rate limiting
   - Enable database connection pooling
   - Implement caching strategy
   - Add CDN for assets

## 📚 Documentation

- [Full Backend Documentation](./AI_ASSISTANT_BACKEND.md)
- [Implementation Summary](./AI_IMPLEMENTATION_SUMMARY.md)
- [Next.js API Routes Guide](./NEXTJS_API_ROUTES.md)

## 🆘 Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review error logs in terminal
3. Check browser console
4. Verify environment variables
5. Test with Prisma Studio

## 🎉 Success!

You now have a fully functional AI assistant backend with:

✅ Streaming chat responses
✅ Conversation management
✅ Lead qualification scoring
✅ Analytics tracking
✅ Admin API
✅ Rate limiting

Start building your chat UI and watch your leads roll in!

---

**Quick Commands Reference:**

```bash
# Development
npm run dev              # Start dev server
npm run db:studio        # Open database viewer

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:migrate       # Run migrations

# Testing
curl -X POST localhost:3000/api/chat/conversation -d '{"sessionId":"test"}'
curl -X POST localhost:3000/api/chat/stream -d '{"conversationId":"xxx","message":"hi"}'
```

Happy coding! 🚀
