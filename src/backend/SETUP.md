# Backend Setup Guide

Quick setup guide for the AiPlace backend infrastructure.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies

```bash
# Install all required packages
npm install

# Or specific backend packages
npm install @prisma/client prisma zod resend bcryptjs
npm install -D @types/bcryptjs typescript
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp src/backend/.env.example .env

# Edit .env with your actual credentials
nano .env
```

**Required variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `RESEND_API_KEY` - Resend API key for emails
- `NEXT_PUBLIC_BASE_URL` - Your application URL

**Optional but recommended:**
- `RECAPTCHA_SECRET_KEY` - For spam protection
- CRM credentials if using integrations

### 3. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Open Prisma Studio to view database
npx prisma studio
```

### 4. Seed Initial Data (Optional)

Create a seed file at `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create services
  const services = await prisma.service.createMany({
    data: [
      {
        name: 'Web Development',
        slug: 'web-development',
        icon: 'code',
        description: 'Custom websites and web applications',
        features: ['Responsive design', 'E-commerce', 'PWA'],
        active: true,
      },
      // Add more services...
    ],
  });

  console.log('Seeded:', services.count, 'services');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run seed:
```bash
npx prisma db seed
```

### 5. Get API Keys

#### Resend (Email Service)
1. Sign up at https://resend.com
2. Create an API key
3. Verify your domain
4. Add to `.env`: `RESEND_API_KEY="re_xxxxx"`

#### Google reCAPTCHA (Optional)
1. Go to https://www.google.com/recaptcha/admin
2. Register your site (use reCAPTCHA v3)
3. Add keys to `.env`:
   - `RECAPTCHA_SECRET_KEY`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

#### CRM Integration (Optional)

**HubSpot:**
1. Go to HubSpot Settings > Integrations > API Key
2. Create private app or API key
3. Add to `.env`: `HUBSPOT_API_KEY`

**Salesforce:**
1. Create Connected App in Salesforce
2. Get OAuth credentials
3. Add to `.env`:
   - `SALESFORCE_INSTANCE_URL`
   - `SALESFORCE_ACCESS_TOKEN`

**Pipedrive:**
1. Go to Settings > API
2. Generate API token
3. Add to `.env`:
   - `PIPEDRIVE_API_TOKEN`
   - `PIPEDRIVE_DOMAIN`

### 6. Test the Setup

```bash
# Start development server
npm run dev

# Test contact form endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "formType": "GENERAL",
    "message": "This is a test message"
  }'

# Expected response:
# {
#   "success": true,
#   "data": {
#     "id": "...",
#     "message": "Thank you for contacting us..."
#   }
# }
```

### 7. Create API Routes (Next.js 14)

Create route files in `app/api/` directory:

**Example: `app/api/contact/route.ts`**
```typescript
import { NextRequest } from 'next/server';
import { handleContactSubmission } from '@/backend/api/contact/contact.handler';

export async function POST(req: NextRequest) {
  return handleContactSubmission(req);
}
```

**Example: `app/api/newsletter/subscribe/route.ts`**
```typescript
import { NextRequest } from 'next/server';
import { handleNewsletterSubscribe } from '@/backend/api/newsletter/newsletter.handler';

export async function POST(req: NextRequest) {
  return handleNewsletterSubscribe(req);
}
```

### 8. Set Up Email Templates

Email templates are already configured in `src/backend/services/email.service.ts`.

Customize them by editing the HTML in the service functions.

### 9. Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name add_new_field

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Deploy migrations to production
npx prisma migrate deploy

# Generate Prisma client after schema changes
npx prisma generate
```

### 10. Production Deployment

#### Update Environment Variables
```env
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://aiplace.com
DATABASE_URL=your-production-database-url
```

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod

# Add environment variables in Vercel dashboard
# Settings > Environment Variables
```

#### Database (Recommended: Vercel Postgres or Supabase)

**Vercel Postgres:**
```bash
vercel postgres create
```

**Supabase:**
1. Create project at https://supabase.com
2. Get connection string from Settings > Database
3. Update `DATABASE_URL` in Vercel environment variables

## Common Issues & Solutions

### Issue: Prisma Client not found
```bash
Solution: npx prisma generate
```

### Issue: Migration failed
```bash
Solution: npx prisma migrate reset
(Warning: This deletes all data)
```

### Issue: Email not sending
```bash
Solution:
1. Check RESEND_API_KEY is valid
2. Verify domain in Resend dashboard
3. Check email logs in Resend dashboard
```

### Issue: Database connection timeout
```bash
Solution:
1. Check DATABASE_URL is correct
2. Ensure PostgreSQL is running
3. Check firewall/network settings
```

## Next Steps

1. **Set up authentication** - Add NextAuth.js for admin access
2. **Configure CMS** - Integrate Sanity.io for blog/portfolio
3. **Add monitoring** - Set up Sentry for error tracking
4. **Enable analytics** - Configure Google Analytics
5. **Set up backups** - Configure automated database backups
6. **Add caching** - Implement Redis for performance
7. **Configure CDN** - Use Cloudflare for static assets

## Useful Commands

```bash
# View database in browser
npx prisma studio

# Format Prisma schema
npx prisma format

# Validate schema
npx prisma validate

# Check migration status
npx prisma migrate status

# Generate TypeScript types from schema
npx prisma generate

# View all Prisma commands
npx prisma --help
```

## Documentation Links

- [Prisma Docs](https://www.prisma.io/docs)
- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Validation](https://zod.dev)

## Support

For help, contact: support@aiplace.com
