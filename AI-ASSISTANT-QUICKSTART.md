# 🚀 AI Assistant - Quick Start Guide

## Get Your AI Chatbot Running in 5 Minutes!

---

## Step 1: Get Your API Key (2 minutes)

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Click "API Keys" in the sidebar
4. Click "Create Key"
5. Copy your key (starts with `sk-ant-`)

---

## Step 2: Configure Environment (1 minute)

Create `.env.local` in your project root:

```bash
# In terminal
cd /Users/ai.place/WEbsite
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```env
ANTHROPIC_API_KEY=sk-ant-paste-your-key-here
```

---

## Step 3: Start the Server (1 minute)

```bash
npm run dev
```

Visit http://localhost:3000

---

## Step 4: Test the Chat! (1 minute)

1. ✅ Look for the **blue/purple floating button** in the bottom-right corner
2. ✅ Click it to open the chat window
3. ✅ Click a **quick action** or type a message
4. ✅ Watch the AI respond in real-time!

---

## 🎉 You're Done!

The AI assistant is now live on your site. It can:

✅ Answer questions about your services
✅ Qualify leads automatically
✅ Provide project estimates
✅ Schedule consultations
✅ Collect contact information

---

## Next Steps

### Customize the AI

Edit `/src/backend/config/ai-assistant.config.ts`:

```typescript
export const SYSTEM_PROMPTS = {
  main: `You are [YOUR BRAND VOICE] AI assistant...`,
};
```

### View Conversations

Visit the admin dashboard:
```
http://localhost:3000/admin/conversations
```

### Deploy to Production

1. Push to GitHub
2. Deploy to Vercel
3. Add `ANTHROPIC_API_KEY` to Vercel environment variables
4. Done!

---

## 📚 Need Help?

- **Integration Guide**: `/docs/INTEGRATION-GUIDE.md`
- **Full Documentation**: `/docs/AI-ASSISTANT-README.md`
- **Architecture**: `/docs/ai-assistant-architecture.md`

---

## Troubleshooting

**Widget not appearing?**
- Check console for errors
- Verify ChatWidget is imported in layout
- Clear browser cache

**No AI responses?**
- Verify API key in `.env.local`
- Check Anthropic account has credits
- Look in Network tab for API errors

**Still stuck?**
- Check the docs above
- Open GitHub issue
- Contact support

---

## What You Built

You now have a **production-ready AI assistant** with:

✅ Intelligent conversation handling
✅ Automatic lead qualification
✅ Beautiful glassmorphic UI
✅ Mobile-responsive design
✅ Real-time streaming responses
✅ Conversation memory
✅ Admin dashboard

**Enjoy!** 🎊
