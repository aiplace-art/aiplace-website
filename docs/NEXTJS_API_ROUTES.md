# Next.js API Routes Setup Guide

This guide shows how to create Next.js API routes that use the backend handlers.

## 📁 File Structure

```
/src/app/api/
├── chat/
│   ├── stream/
│   │   └── route.ts
│   ├── conversation/
│   │   ├── route.ts
│   │   └── [id]/
│   │       └── route.ts
│   └── lead-score/
│       └── route.ts
└── admin/
    └── conversations/
        ├── route.ts
        ├── [id]/
        │   └── route.ts
        └── analytics/
            └── route.ts
```

## 🔌 API Route Examples

### 1. Chat Stream Route

**File:** `/src/app/api/chat/stream/route.ts`

```typescript
import { POST as StreamHandler } from '@/backend/api/chat/stream.handler';
import { NextRequest } from 'next/server';
import { rateLimitMiddleware, RATE_LIMITS } from '@/backend/middleware/rate-limit.middleware';

export const runtime = 'edge'; // Optional: Use edge runtime for better streaming

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await rateLimitMiddleware(req, RATE_LIMITS.CHAT_STREAM);
  if (rateLimitResult) return rateLimitResult;

  // Call the handler
  return StreamHandler(req);
}
```

### 2. Conversation Routes

**File:** `/src/app/api/chat/conversation/route.ts`

```typescript
import { POST, GET_LIST } from '@/backend/api/chat/conversation.handler';
import { NextRequest } from 'next/server';
import { rateLimitMiddleware, RATE_LIMITS } from '@/backend/middleware/rate-limit.middleware';

export async function POST(req: NextRequest) {
  const rateLimitResult = await rateLimitMiddleware(req, RATE_LIMITS.CONVERSATION_CREATE);
  if (rateLimitResult) return rateLimitResult;

  return POST(req);
}

export async function GET(req: NextRequest) {
  return GET_LIST(req);
}
```

**File:** `/src/app/api/chat/conversation/[id]/route.ts`

```typescript
import { GET, PATCH } from '@/backend/api/chat/conversation.handler';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return GET(req, { params });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return PATCH(req, { params });
}
```

**File:** `/src/app/api/chat/conversation/[id]/complete/route.ts`

```typescript
import { POST_COMPLETE } from '@/backend/api/chat/conversation.handler';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return POST_COMPLETE(req, { params });
}
```

**File:** `/src/app/api/chat/conversation/[id]/feedback/route.ts`

```typescript
import { POST_FEEDBACK } from '@/backend/api/chat/conversation.handler';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return POST_FEEDBACK(req, { params });
}
```

**File:** `/src/app/api/chat/conversation/[id]/message/route.ts`

```typescript
import { POST_MESSAGE } from '@/backend/api/chat/conversation.handler';
import { NextRequest } from 'next/server';
import { rateLimitMiddleware, RATE_LIMITS } from '@/backend/middleware/rate-limit.middleware';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const rateLimitResult = await rateLimitMiddleware(req, RATE_LIMITS.CHAT_MESSAGE);
  if (rateLimitResult) return rateLimitResult;

  return POST_MESSAGE(req, { params });
}
```

### 3. Lead Score Routes

**File:** `/src/app/api/chat/lead-score/route.ts`

```typescript
import { POST, GET_LIST } from '@/backend/api/chat/lead-score.handler';
import { NextRequest } from 'next/server';
import { rateLimitMiddleware, RATE_LIMITS } from '@/backend/middleware/rate-limit.middleware';

export async function POST(req: NextRequest) {
  const rateLimitResult = await rateLimitMiddleware(req, RATE_LIMITS.LEAD_SCORING);
  if (rateLimitResult) return rateLimitResult;

  return POST(req);
}

export async function GET(req: NextRequest) {
  return GET_LIST(req);
}
```

**File:** `/src/app/api/chat/lead-score/[conversationId]/route.ts`

```typescript
import { GET } from '@/backend/api/chat/lead-score.handler';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  return GET(req, { params });
}
```

**File:** `/src/app/api/chat/lead-score/batch/route.ts`

```typescript
import { POST_BATCH } from '@/backend/api/chat/lead-score.handler';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  return POST_BATCH(req);
}
```

### 4. Admin Routes

**File:** `/src/app/api/admin/conversations/route.ts`

```typescript
import { GET } from '@/backend/api/admin/chat-review.handler';
import { NextRequest } from 'next/server';
import { rateLimitMiddleware, RATE_LIMITS } from '@/backend/middleware/rate-limit.middleware';

export async function GET(req: NextRequest) {
  const rateLimitResult = await rateLimitMiddleware(req, RATE_LIMITS.ADMIN_API);
  if (rateLimitResult) return rateLimitResult;

  return GET(req);
}
```

**File:** `/src/app/api/admin/conversations/[id]/route.ts`

```typescript
import { GET_DETAIL, DELETE } from '@/backend/api/admin/chat-review.handler';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return GET_DETAIL(req, { params });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return DELETE(req, { params });
}
```

**File:** `/src/app/api/admin/conversations/[id]/flag/route.ts`

```typescript
import { POST_FLAG } from '@/backend/api/admin/chat-review.handler';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return POST_FLAG(req, { params });
}
```

**File:** `/src/app/api/admin/conversations/[id]/review/route.ts`

```typescript
import { POST_REVIEW } from '@/backend/api/admin/chat-review.handler';
import { NextRequest } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return POST_REVIEW(req, { params });
}
```

**File:** `/src/app/api/admin/analytics/route.ts`

```typescript
import { GET_ANALYTICS } from '@/backend/api/admin/chat-review.handler';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return GET_ANALYTICS(req);
}
```

**File:** `/src/app/api/admin/lead-scores/route.ts`

```typescript
import { GET_LEAD_SCORES } from '@/backend/api/admin/chat-review.handler';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  return GET_LEAD_SCORES(req);
}
```

**File:** `/src/app/api/admin/export/[conversationId]/route.ts`

```typescript
import { GET_EXPORT } from '@/backend/api/admin/chat-review.handler';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  return GET_EXPORT(req, { params });
}
```

## 🔧 TypeScript Configuration

Update `tsconfig.json` to include path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/backend/*": ["./src/backend/*"]
    }
  }
}
```

## 🚀 Quick Setup Script

Create a script to generate all routes automatically:

**File:** `/scripts/create-api-routes.sh`

```bash
#!/bin/bash

# Chat routes
mkdir -p src/app/api/chat/{stream,conversation,lead-score}
mkdir -p src/app/api/chat/conversation/{[id],{[id]}/complete,{[id]}/feedback,{[id]}/message}
mkdir -p src/app/api/chat/lead-score/{[conversationId],batch}

# Admin routes
mkdir -p src/app/api/admin/{conversations,analytics}
mkdir -p src/app/api/admin/conversations/{{[id]},{[id]}/flag,{[id]}/review}
mkdir -p src/app/api/admin/{lead-scores,export/[conversationId]}

echo "✅ API route directories created!"
```

Run it:
```bash
chmod +x scripts/create-api-routes.sh
./scripts/create-api-routes.sh
```

## 🧪 Testing Routes

### 1. Test Chat Stream

```bash
curl -X POST http://localhost:3000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "test_123",
    "message": "Tell me about your AI solutions"
  }'
```

### 2. Test Conversation Creation

```bash
curl -X POST http://localhost:3000/api/chat/conversation \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_abc123",
    "visitorId": "visitor_xyz"
  }'
```

### 3. Test Lead Scoring

```bash
curl -X POST http://localhost:3000/api/chat/lead-score \
  -H "Content-Type: application/json" \
  -d '{
    "conversationId": "conv_123"
  }'
```

### 4. Test Admin API

```bash
curl http://localhost:3000/api/admin/conversations \
  -H "Authorization: Bearer your-admin-api-key"
```

## 📝 Frontend Integration Examples

### React Hook for Chat Streaming

```typescript
import { useState, useCallback } from 'react';

export function useChatStream(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, message }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));

            if (data.type === 'content') {
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant' && !last.completed) {
                  return [
                    ...prev.slice(0, -1),
                    { ...last, content: last.content + data.text }
                  ];
                }
                return [...prev, { role: 'assistant', content: data.text, completed: false }];
              });
            } else if (data.type === 'done') {
              setMessages(prev => {
                const last = prev[prev.length - 1];
                return [...prev.slice(0, -1), { ...last, completed: true }];
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
    } finally {
      setIsStreaming(false);
    }
  }, [conversationId]);

  return { messages, sendMessage, isStreaming };
}
```

### React Component Example

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useChatStream } from '@/hooks/useChatStream';

export function ChatAssistant() {
  const [conversationId, setConversationId] = useState<string>();
  const [input, setInput] = useState('');
  const { messages, sendMessage, isStreaming } = useChatStream(conversationId || '');

  useEffect(() => {
    // Initialize conversation
    async function init() {
      const sessionId = `session_${Date.now()}`;
      const res = await fetch('/api/chat/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      setConversationId(data.data.conversation.id);
    }
    init();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !conversationId) return;
    await sendMessage(input);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isStreaming}
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend} disabled={isStreaming || !input.trim()}>
          {isStreaming ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
```

### Admin Dashboard Example

```typescript
'use client';

import { useState, useEffect } from 'react';

export function AdminDashboard() {
  const [conversations, setConversations] = useState([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

    // Load conversations
    const convRes = await fetch('/api/admin/conversations?leadQuality=HIGH', {
      headers: { 'Authorization': `Bearer ${adminKey}` }
    });
    const convData = await convRes.json();
    setConversations(convData.data.conversations);

    // Load analytics
    const analyticsRes = await fetch('/api/admin/analytics?days=7', {
      headers: { 'Authorization': `Bearer ${adminKey}` }
    });
    const analyticsData = await analyticsRes.json();
    setAnalytics(analyticsData.data.report);
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {analytics && (
        <div className="analytics">
          <div>Total Conversations: {analytics.totalConversations}</div>
          <div>Active: {analytics.activeConversations}</div>
          <div>Conversion Rate: {analytics.conversionRate}%</div>
        </div>
      )}

      <div className="conversations">
        {conversations.map((conv: any) => (
          <div key={conv.id} className="conversation-card">
            <h3>{conv.name || 'Anonymous'}</h3>
            <p>Lead Score: {conv.leadScore}</p>
            <p>Quality: {conv.leadQuality}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔒 Security Notes

1. **Always validate admin API keys** on the server side
2. **Use HTTPS in production** for all endpoints
3. **Rate limit aggressively** to prevent abuse
4. **Sanitize all user inputs** before processing
5. **Log security events** for monitoring

## 📚 Additional Resources

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Anthropic API Docs](https://docs.anthropic.com/claude/reference)
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

---

**Pro Tip:** Use the `edge` runtime for streaming endpoints to get better performance and lower latency!
