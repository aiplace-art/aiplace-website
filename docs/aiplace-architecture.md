# AiPlace Website - Technical Architecture

## Document Information
- **Version**: 1.0
- **Last Updated**: October 2025
- **Status**: Architecture Design Complete
- **Technology**: Next.js 14 App Router, PostgreSQL, Sanity CMS

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Web Browser (Desktop/Mobile/Tablet)                            │
│  - React Components (Client & Server)                           │
│  - Tailwind CSS + Framer Motion                                 │
│  - Next.js App Router                                           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CDN & EDGE LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Cloudflare CDN                                                 │
│  - Static Asset Caching                                         │
│  - Image Optimization                                           │
│  - DDoS Protection                                              │
│  - SSL/TLS Termination                                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 14 Application (Vercel)                               │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  App Router Pages (Server Components)               │       │
│  │  - SSR/SSG/ISR Support                              │       │
│  │  - React Server Components                          │       │
│  │  - Client Components (Interactive)                  │       │
│  └─────────────────────────────────────────────────────┘       │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  API Routes (/app/api)                              │       │
│  │  - Contact Forms                                     │       │
│  │  - Newsletter                                        │       │
│  │  - Consultation Booking                             │       │
│  │  - Analytics Tracking                               │       │
│  └─────────────────────────────────────────────────────┘       │
│  ┌─────────────────────────────────────────────────────┐       │
│  │  Middleware                                          │       │
│  │  - Rate Limiting                                     │       │
│  │  - Security Headers                                 │       │
│  │  - Redirects & Rewrites                             │       │
│  └─────────────────────────────────────────────────────┘       │
└──────────┬──────────────────┬──────────────────┬───────────────┘
           │                  │                  │
           ▼                  ▼                  ▼
┌──────────────────┐ ┌─────────────────┐ ┌─────────────────────┐
│  DATABASE LAYER  │ │   CMS LAYER     │ │  EXTERNAL SERVICES  │
├──────────────────┤ ├─────────────────┤ ├─────────────────────┤
│  PostgreSQL      │ │  Sanity.io      │ │  Email (Resend)     │
│  - Users         │ │  - Blog Posts   │ │  Analytics (GA4)    │
│  - Inquiries     │ │  - Portfolio    │ │  Vercel Analytics   │
│  - Bookings      │ │  - Team         │ │  Error Tracking     │
│  - Newsletter    │ │  - Testimonials │ │  (Sentry)           │
│  - Analytics     │ │  - Settings     │ │                     │
└──────────────────┘ └─────────────────┘ └─────────────────────┘
```

### 1.2 Architecture Principles

**Performance First**
- Server-Side Rendering (SSR) for dynamic content
- Static Site Generation (SSG) for marketing pages
- Incremental Static Regeneration (ISR) for blog/portfolio
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Edge caching via CDN

**SEO Optimized**
- Server Components for better SEO
- Metadata API for dynamic meta tags
- JSON-LD structured data
- Sitemap generation
- Robots.txt configuration
- Semantic HTML markup

**Scalability**
- Serverless architecture (Vercel Functions)
- Database connection pooling
- Horizontal scaling via CDN
- Caching strategies (stale-while-revalidate)
- Asset optimization and compression

**Security**
- HTTPS everywhere
- CSRF protection
- Rate limiting on API routes
- Input validation with Zod
- SQL injection prevention (Prisma ORM)
- XSS protection
- Security headers (CSP, HSTS)

---

## 2. Component Architecture

### 2.1 Component Hierarchy

```
app/
├── (marketing)/                    # Marketing pages group
│   ├── layout.tsx                  # Marketing layout with header/footer
│   ├── page.tsx                    # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx                # Services overview
│   │   ├── web-development/
│   │   │   └── page.tsx
│   │   ├── ai-solutions/
│   │   │   └── page.tsx
│   │   ├── business-planning/
│   │   │   └── page.tsx
│   │   └── tokenomics/
│   │       └── page.tsx
│   ├── portfolio/
│   │   ├── page.tsx                # Portfolio grid
│   │   └── [slug]/
│   │       └── page.tsx            # Case study detail
│   ├── blog/
│   │   ├── page.tsx                # Blog list
│   │   ├── category/
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx            # Blog post detail
│   └── contact/
│       └── page.tsx
│
├── (legal)/                        # Legal pages group
│   ├── layout.tsx                  # Minimal layout
│   ├── privacy-policy/
│   │   └── page.tsx
│   └── terms-of-service/
│       └── page.tsx
│
├── api/                            # API routes
│   ├── contact/
│   │   └── route.ts
│   ├── newsletter/
│   │   └── route.ts
│   ├── booking/
│   │   └── route.ts
│   └── analytics/
│       └── route.ts
│
├── layout.tsx                      # Root layout
├── error.tsx                       # Error boundary
├── not-found.tsx                   # 404 page
└── loading.tsx                     # Loading UI
```

### 2.2 Component Library Structure

```
components/
├── ui/                             # shadcn/ui base components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── textarea.tsx
│   ├── toast.tsx
│   └── ...
│
├── layout/                         # Layout components
│   ├── header.tsx                  # Main navigation
│   ├── footer.tsx                  # Footer with links
│   ├── mobile-menu.tsx             # Mobile navigation
│   ├── sidebar.tsx                 # Optional sidebar
│   └── breadcrumbs.tsx             # Breadcrumb navigation
│
├── home/                           # Homepage-specific components
│   ├── hero-section.tsx            # Hero with CTA
│   ├── services-grid.tsx           # Services showcase
│   ├── process-timeline.tsx        # Process steps
│   ├── featured-work.tsx           # Portfolio preview
│   ├── testimonials-carousel.tsx   # Client testimonials
│   ├── stats-section.tsx           # Company statistics
│   └── cta-section.tsx             # Call-to-action banner
│
├── services/                       # Service-related components
│   ├── service-card.tsx            # Individual service card
│   ├── service-detail-hero.tsx     # Service page hero
│   ├── service-features.tsx        # Feature list
│   ├── service-process.tsx         # Service-specific process
│   ├── service-pricing.tsx         # Pricing tiers (optional)
│   └── service-cta.tsx             # Service CTA
│
├── portfolio/                      # Portfolio components
│   ├── portfolio-grid.tsx          # Filterable grid
│   ├── portfolio-card.tsx          # Project card
│   ├── portfolio-filter.tsx        # Category filter
│   ├── case-study-hero.tsx         # Case study header
│   ├── case-study-content.tsx      # Case study body
│   └── project-metrics.tsx         # Results/metrics display
│
├── blog/                           # Blog components
│   ├── blog-grid.tsx               # Blog post grid
│   ├── blog-card.tsx               # Post preview card
│   ├── blog-hero.tsx               # Post header
│   ├── blog-content.tsx            # Post content renderer
│   ├── blog-sidebar.tsx            # Sidebar with categories
│   ├── author-bio.tsx              # Author information
│   ├── related-posts.tsx           # Related articles
│   └── share-buttons.tsx           # Social sharing
│
├── forms/                          # Form components
│   ├── contact-form.tsx            # General contact
│   ├── consultation-form.tsx       # Booking form
│   ├── quote-form.tsx              # Quote request
│   ├── newsletter-form.tsx         # Email signup
│   └── form-field.tsx              # Reusable field wrapper
│
├── common/                         # Shared/reusable components
│   ├── section-wrapper.tsx         # Section container
│   ├── container.tsx               # Max-width container
│   ├── gradient-background.tsx     # Gradient overlays
│   ├── animated-text.tsx           # Text animations
│   ├── image-with-blur.tsx         # Optimized image
│   ├── icon-wrapper.tsx            # Icon component
│   ├── badge.tsx                   # Category badges
│   ├── loader.tsx                  # Loading spinner
│   ├── error-message.tsx           # Error display
│   └── seo-meta.tsx                # SEO metadata
│
└── providers/                      # Context providers
    ├── theme-provider.tsx          # Dark mode support
    ├── toast-provider.tsx          # Notifications
    └── analytics-provider.tsx      # Analytics tracking
```

### 2.3 Component Design Patterns

**Server vs Client Components**

```typescript
// Server Component (default in App Router)
// components/portfolio/portfolio-grid.tsx
import { PortfolioCard } from './portfolio-card'
import { getPortfolioItems } from '@/lib/sanity'

export async function PortfolioGrid() {
  const items = await getPortfolioItems()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </div>
  )
}

// Client Component (interactive features)
// components/portfolio/portfolio-filter.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function PortfolioFilter({ categories, onFilter }) {
  const [active, setActive] = useState('all')

  return (
    <div className="flex gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={active === cat ? 'default' : 'outline'}
          onClick={() => {
            setActive(cat)
            onFilter(cat)
          }}
        >
          {cat}
        </Button>
      ))}
    </div>
  )
}
```

**Composition Pattern**

```typescript
// components/common/section-wrapper.tsx
export function SectionWrapper({
  children,
  gradient = false,
  className = ''
}: SectionWrapperProps) {
  return (
    <section className={cn(
      'py-16 md:py-24',
      gradient && 'bg-gradient-to-b from-background to-accent/5',
      className
    )}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  )
}

// Usage
<SectionWrapper gradient>
  <h2>Our Services</h2>
  <ServicesGrid />
</SectionWrapper>
```

---

## 3. Database Schema (PostgreSQL)

### 3.1 Schema Diagram

```
┌─────────────────────┐         ┌──────────────────────┐
│      Users          │         │    ContactInquiries  │
├─────────────────────┤         ├──────────────────────┤
│ id (PK)            │         │ id (PK)             │
│ email              │         │ name                │
│ name               │         │ email               │
│ role               │         │ phone               │
│ password_hash      │         │ company             │
│ created_at         │         │ service             │
│ updated_at         │         │ message             │
└─────────────────────┘         │ status              │
                                │ created_at          │
┌─────────────────────┐         │ responded_at        │
│  NewsletterSubs     │         └──────────────────────┘
├─────────────────────┤
│ id (PK)            │         ┌──────────────────────┐
│ email              │         │   Consultations      │
│ status             │         ├──────────────────────┤
│ source             │         │ id (PK)             │
│ subscribed_at      │         │ name                │
│ unsubscribed_at    │         │ email               │
└─────────────────────┘         │ service             │
                                │ preferred_date      │
┌─────────────────────┐         │ preferred_time      │
│   PageViews         │         │ duration            │
├─────────────────────┤         │ notes               │
│ id (PK)            │         │ status              │
│ path               │         │ confirmed_at        │
│ visitor_id         │         │ created_at          │
│ referrer           │         └──────────────────────┘
│ user_agent         │
│ timestamp          │         ┌──────────────────────┐
└─────────────────────┘         │   FormSubmissions    │
                                ├──────────────────────┤
┌─────────────────────┐         │ id (PK)             │
│   LeadScores        │         │ form_type           │
├─────────────────────┤         │ data (JSONB)        │
│ id (PK)            │         │ ip_address          │
│ email              │         │ user_agent          │
│ score              │         │ submitted_at        │
│ engagement_level   │         │ processed           │
│ last_interaction   │         └──────────────────────┘
│ created_at         │
│ updated_at         │
└─────────────────────┘
```

### 3.2 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Management
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  role          UserRole  @default(USER)
  passwordHash  String    @map("password_hash")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  @@map("users")
}

enum UserRole {
  USER
  ADMIN
  EDITOR
}

// Contact & Lead Management
model ContactInquiry {
  id          String            @id @default(cuid())
  name        String
  email       String
  phone       String?
  company     String?
  service     ServiceType?
  message     String            @db.Text
  status      InquiryStatus     @default(NEW)
  source      String?           // UTM tracking
  createdAt   DateTime          @default(now()) @map("created_at")
  respondedAt DateTime?         @map("responded_at")

  @@index([status, createdAt])
  @@map("contact_inquiries")
}

enum ServiceType {
  WEB_DEVELOPMENT
  AI_SOLUTIONS
  BUSINESS_PLANNING
  TOKENOMICS
  OTHER
}

enum InquiryStatus {
  NEW
  IN_PROGRESS
  RESPONDED
  CONVERTED
  CLOSED
}

// Consultation Booking
model Consultation {
  id             String              @id @default(cuid())
  name           String
  email          String
  phone          String?
  service        ServiceType
  preferredDate  DateTime            @map("preferred_date")
  preferredTime  String              @map("preferred_time")
  duration       Int                 @default(30) // minutes
  notes          String?             @db.Text
  status         ConsultationStatus  @default(PENDING)
  confirmedAt    DateTime?           @map("confirmed_at")
  createdAt      DateTime            @default(now()) @map("created_at")

  @@index([preferredDate, status])
  @@map("consultations")
}

enum ConsultationStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
  RESCHEDULED
}

// Newsletter Management
model NewsletterSubscription {
  id             String    @id @default(cuid())
  email          String    @unique
  status         SubStatus @default(ACTIVE)
  source         String?   // signup page/form
  subscribedAt   DateTime  @default(now()) @map("subscribed_at")
  unsubscribedAt DateTime? @map("unsubscribed_at")

  @@index([status])
  @@map("newsletter_subscriptions")
}

enum SubStatus {
  ACTIVE
  UNSUBSCRIBED
  BOUNCED
}

// Analytics & Tracking
model PageView {
  id        String   @id @default(cuid())
  path      String
  visitorId String?  @map("visitor_id")
  referrer  String?
  userAgent String?  @map("user_agent")
  country   String?
  timestamp DateTime @default(now())

  @@index([path, timestamp])
  @@index([visitorId])
  @@map("page_views")
}

// Lead Scoring
model LeadScore {
  id               String   @id @default(cuid())
  email            String   @unique
  score            Int      @default(0)
  engagementLevel  String?  @map("engagement_level") // hot, warm, cold
  lastInteraction  DateTime @map("last_interaction")
  createdAt        DateTime @default(now()) @map("created_at")
  updatedAt        DateTime @updatedAt @map("updated_at")

  @@index([score])
  @@map("lead_scores")
}

// Generic Form Submissions (for flexibility)
model FormSubmission {
  id          String   @id @default(cuid())
  formType    String   @map("form_type") // quote, demo, etc.
  data        Json     // flexible JSON storage
  ipAddress   String?  @map("ip_address")
  userAgent   String?  @map("user_agent")
  submittedAt DateTime @default(now()) @map("submitted_at")
  processed   Boolean  @default(false)

  @@index([formType, submittedAt])
  @@map("form_submissions")
}
```

### 3.3 Database Indexes & Performance

**Indexing Strategy**
- Primary keys: Auto-indexed
- Email fields: Unique indexes for lookups
- Timestamp fields: Index for date-range queries
- Status fields: Index for filtering
- Composite indexes: For common query patterns

**Connection Pooling**
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 4. API Architecture

### 4.1 API Endpoints Structure

```
/api
├── /contact
│   └── POST /route.ts              # Submit contact form
│       Request: { name, email, phone?, company?, service?, message }
│       Response: { success: boolean, message: string }
│
├── /newsletter
│   ├── POST /subscribe/route.ts    # Subscribe to newsletter
│   │   Request: { email, source? }
│   │   Response: { success: boolean }
│   └── POST /unsubscribe/route.ts  # Unsubscribe
│       Request: { email }
│       Response: { success: boolean }
│
├── /booking
│   ├── POST /route.ts              # Book consultation
│   │   Request: { name, email, service, date, time, notes? }
│   │   Response: { success: boolean, bookingId: string }
│   ├── GET /availability/route.ts  # Check available slots
│   │   Query: ?date=YYYY-MM-DD&service=web-development
│   │   Response: { slots: string[] }
│   └── PATCH /[id]/route.ts        # Update booking
│       Request: { status, date?, time? }
│       Response: { success: boolean }
│
├── /analytics
│   └── POST /track/route.ts        # Track page view
│       Request: { path, referrer?, visitorId? }
│       Response: { success: boolean }
│
├── /quote
│   └── POST /route.ts              # Request project quote
│       Request: { name, email, service, budget?, timeline?, description }
│       Response: { success: boolean, quoteId: string }
│
└── /webhook
    ├── POST /sanity/route.ts       # Sanity webhook for revalidation
    │   Request: Sanity webhook payload
    │   Response: { revalidated: boolean }
    └── POST /resend/route.ts       # Email delivery webhook
        Request: Resend webhook payload
        Response: { received: boolean }
```

### 4.2 API Route Implementation Pattern

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.enum(['WEB_DEVELOPMENT', 'AI_SOLUTIONS', 'BUSINESS_PLANNING', 'TOKENOMICS', 'OTHER']).optional(),
  message: z.string().min(10).max(2000),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip ?? 'anonymous'
    const { success } = await rateLimit(identifier)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Store in database
    const inquiry = await prisma.contactInquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        service: validatedData.service,
        message: validatedData.message,
        status: 'NEW',
      },
    })

    // Send notification email
    await sendEmail({
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact Inquiry from ${validatedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Service:</strong> ${validatedData.service || 'Not specified'}</p>
        <p><strong>Message:</strong> ${validatedData.message}</p>
      `,
    })

    // Send auto-reply to user
    await sendEmail({
      to: validatedData.email,
      subject: 'Thank you for contacting AiPlace',
      html: `
        <p>Hi ${validatedData.name},</p>
        <p>Thank you for reaching out to AiPlace. We've received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>AiPlace Team</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully',
      inquiryId: inquiry.id,
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### 4.3 API Security & Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

// Different rate limits for different endpoints
export const rateLimiters = {
  contact: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour
  }),
  newsletter: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
  }),
  general: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
  }),
}

export async function rateLimit(
  identifier: string,
  type: keyof typeof rateLimiters = 'general'
) {
  return await rateLimiters[type].limit(identifier)
}
```

---

## 5. Content Management (Sanity CMS)

### 5.1 Sanity Schema Structure

```typescript
// sanity/schemas/index.ts
import { blogPost } from './blog-post'
import { portfolioItem } from './portfolio-item'
import { teamMember } from './team-member'
import { testimonial } from './testimonial'
import { settings } from './settings'

export const schemaTypes = [
  blogPost,
  portfolioItem,
  teamMember,
  testimonial,
  settings,
]

// sanity/schemas/blog-post.ts
export const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'web-dev' },
          { title: 'AI & ML', value: 'ai' },
          { title: 'Business', value: 'business' },
          { title: 'Blockchain', value: 'blockchain' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
        {
          type: 'code',
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'TypeScript', value: 'typescript' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'Python', value: 'python' },
            ],
          },
        },
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display on homepage',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
        { name: 'metaKeywords', type: 'array', of: [{ type: 'string' }], title: 'Keywords' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
  },
}

// sanity/schemas/portfolio-item.ts
export const portfolioItem = {
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'client', title: 'Client Name', type: 'string' },
    { name: 'category', title: 'Category', type: 'array', of: [{ type: 'string' }] },
    { name: 'description', title: 'Short Description', type: 'text' },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image' }] },
    {
      name: 'caseStudy',
      title: 'Case Study',
      type: 'object',
      fields: [
        { name: 'challenge', type: 'text', title: 'Challenge' },
        { name: 'solution', type: 'text', title: 'Solution' },
        { name: 'results', type: 'array', of: [{ type: 'block' }], title: 'Results' },
      ],
    },
    {
      name: 'metrics',
      title: 'Project Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'string', title: 'Value' },
          ],
        },
      ],
    },
    { name: 'technologies', title: 'Technologies Used', type: 'array', of: [{ type: 'string' }] },
    { name: 'projectUrl', title: 'Live URL', type: 'url' },
    { name: 'featured', title: 'Featured Project', type: 'boolean' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}
```

### 5.2 Sanity Integration

```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Data fetching functions
export async function getBlogPosts(limit?: number) {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) ${
    limit ? `[0...${limit}]` : ''
  } {
    _id,
    title,
    slug,
    excerpt,
    category,
    mainImage,
    author->{name, image},
    publishedAt
  }`

  return await sanityClient.fetch(query)
}

export async function getPortfolioItems() {
  const query = `*[_type == "portfolioItem"] | order(order asc) {
    _id,
    title,
    slug,
    client,
    category,
    description,
    featuredImage,
    featured
  }`

  return await sanityClient.fetch(query)
}
```

---

## 6. File & Folder Structure

### 6.1 Complete Project Structure

```
aiplace-website/
├── .github/                        # GitHub workflows
│   └── workflows/
│       ├── ci.yml                  # CI/CD pipeline
│       └── deploy.yml              # Deployment workflow
│
├── app/                            # Next.js App Router
│   ├── (marketing)/                # Route group for marketing pages
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── web-development/page.tsx
│   │   │   ├── ai-solutions/page.tsx
│   │   │   ├── business-planning/page.tsx
│   │   │   └── tokenomics/page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── category/[category]/page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── (legal)/
│   │   ├── layout.tsx
│   │   ├── privacy-policy/page.tsx
│   │   └── terms-of-service/page.tsx
│   │
│   ├── api/                        # API routes
│   │   ├── contact/route.ts
│   │   ├── newsletter/
│   │   │   ├── subscribe/route.ts
│   │   │   └── unsubscribe/route.ts
│   │   ├── booking/
│   │   │   ├── route.ts
│   │   │   ├── availability/route.ts
│   │   │   └── [id]/route.ts
│   │   ├── quote/route.ts
│   │   ├── analytics/track/route.ts
│   │   └── webhook/
│   │       ├── sanity/route.ts
│   │       └── resend/route.ts
│   │
│   ├── layout.tsx                  # Root layout
│   ├── error.tsx                   # Error boundary
│   ├── not-found.tsx               # 404 page
│   ├── loading.tsx                 # Loading UI
│   ├── globals.css                 # Global styles
│   └── metadata.ts                 # Shared metadata
│
├── components/
│   ├── ui/                         # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   └── ... (other UI primitives)
│   │
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-menu.tsx
│   │   └── breadcrumbs.tsx
│   │
│   ├── home/
│   │   ├── hero-section.tsx
│   │   ├── services-grid.tsx
│   │   ├── process-timeline.tsx
│   │   ├── featured-work.tsx
│   │   ├── testimonials-carousel.tsx
│   │   ├── stats-section.tsx
│   │   └── cta-section.tsx
│   │
│   ├── services/
│   │   ├── service-card.tsx
│   │   ├── service-detail-hero.tsx
│   │   ├── service-features.tsx
│   │   └── service-cta.tsx
│   │
│   ├── portfolio/
│   │   ├── portfolio-grid.tsx
│   │   ├── portfolio-card.tsx
│   │   ├── portfolio-filter.tsx
│   │   ├── case-study-hero.tsx
│   │   └── project-metrics.tsx
│   │
│   ├── blog/
│   │   ├── blog-grid.tsx
│   │   ├── blog-card.tsx
│   │   ├── blog-hero.tsx
│   │   ├── blog-content.tsx
│   │   ├── author-bio.tsx
│   │   └── share-buttons.tsx
│   │
│   ├── forms/
│   │   ├── contact-form.tsx
│   │   ├── consultation-form.tsx
│   │   ├── quote-form.tsx
│   │   ├── newsletter-form.tsx
│   │   └── form-field.tsx
│   │
│   ├── common/
│   │   ├── section-wrapper.tsx
│   │   ├── container.tsx
│   │   ├── gradient-background.tsx
│   │   ├── animated-text.tsx
│   │   ├── image-with-blur.tsx
│   │   ├── badge.tsx
│   │   └── seo-meta.tsx
│   │
│   └── providers/
│       ├── theme-provider.tsx
│       ├── toast-provider.tsx
│       └── analytics-provider.tsx
│
├── lib/
│   ├── prisma.ts                   # Prisma client
│   ├── sanity.ts                   # Sanity client & queries
│   ├── email.ts                    # Email utilities (Resend)
│   ├── rate-limit.ts               # Rate limiting
│   ├── analytics.ts                # Analytics tracking
│   ├── utils.ts                    # Utility functions
│   └── validations.ts              # Zod schemas
│
├── hooks/
│   ├── use-toast.ts                # Toast notifications
│   ├── use-media-query.ts          # Responsive breakpoints
│   ├── use-scroll-position.ts      # Scroll tracking
│   └── use-analytics.ts            # Analytics tracking
│
├── types/
│   ├── index.ts                    # Shared types
│   ├── sanity.ts                   # Sanity content types
│   └── api.ts                      # API request/response types
│
├── config/
│   ├── site.ts                     # Site configuration
│   ├── navigation.ts               # Navigation structure
│   └── services.ts                 # Services data
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   ├── migrations/                 # Migration files
│   └── seed.ts                     # Database seeding
│
├── sanity/
│   ├── schemas/
│   │   ├── index.ts
│   │   ├── blog-post.ts
│   │   ├── portfolio-item.ts
│   │   ├── team-member.ts
│   │   ├── testimonial.ts
│   │   └── settings.ts
│   ├── sanity.config.ts
│   └── sanity.cli.ts
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero-bg.jpg
│   │   └── ... (static images)
│   ├── fonts/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/
│   ├── generate-sitemap.ts
│   └── seed-database.ts
│
├── docs/
│   ├── aiplace-specification.md
│   ├── aiplace-architecture.md     # This document
│   └── deployment.md
│
├── .env.example
├── .env.local
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### 6.2 Configuration Files

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

**tailwind.config.ts**
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-fira-code)'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config
```

**config/site.ts**
```typescript
export const siteConfig = {
  name: 'AiPlace',
  description: 'Your Partner in Digital Innovation & AI Solutions',
  url: 'https://aiplace.com',
  ogImage: 'https://aiplace.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/aiplace',
    github: 'https://github.com/aiplace',
    linkedin: 'https://linkedin.com/company/aiplace',
  },
  keywords: [
    'web development',
    'AI solutions',
    'business planning',
    'tokenomics',
    'digital agency',
  ],
}

export const navigationConfig = {
  main: [
    { title: 'Services', href: '/services' },
    { title: 'Portfolio', href: '/portfolio' },
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
  ],
  services: [
    { title: 'Web Development', href: '/services/web-development' },
    { title: 'AI Solutions', href: '/services/ai-solutions' },
    { title: 'Business Planning', href: '/services/business-planning' },
    { title: 'Tokenomics', href: '/services/tokenomics' },
  ],
}
```

---

## 7. Performance Optimization

### 7.1 Rendering Strategies

**Static Generation (SSG)**
- Homepage
- Service pages
- About page
- Legal pages

**Incremental Static Regeneration (ISR)**
- Blog posts (revalidate: 3600)
- Portfolio items (revalidate: 7200)

**Server-Side Rendering (SSR)**
- Contact page (with dynamic form tokens)
- Search results

**Client-Side Rendering**
- Interactive filters
- Real-time chat
- Analytics dashboard

### 7.2 Image Optimization

```typescript
// components/common/image-with-blur.tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

export function OptimizedImage({ image, alt, ...props }) {
  return (
    <Image
      src={urlFor(image).url()}
      alt={alt}
      placeholder="blur"
      blurDataURL={urlFor(image).width(20).blur(50).url()}
      quality={90}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
    />
  )
}
```

### 7.3 Code Splitting & Lazy Loading

```typescript
// app/(marketing)/page.tsx
import dynamic from 'next/dynamic'

// Lazy load below-the-fold components
const TestimonialsCarousel = dynamic(() =>
  import('@/components/home/testimonials-carousel')
)

const FeaturedWork = dynamic(() =>
  import('@/components/home/featured-work')
)

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <TestimonialsCarousel />
      <FeaturedWork />
    </>
  )
}
```

### 7.4 Caching Strategy

```typescript
// Next.js fetch with revalidation
async function getBlogPosts() {
  const res = await fetch('https://api.sanity.io/...', {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  return res.json()
}

// Route-level revalidation
export const revalidate = 3600 // seconds
```

---

## 8. SEO Architecture

### 8.1 Metadata Configuration

```typescript
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'AiPlace - Digital Innovation & AI Solutions',
    template: '%s | AiPlace',
  },
  description: 'Full-service digital agency specializing in web development, AI solutions, business planning, and tokenomics consulting',
  keywords: ['web development', 'AI', 'blockchain', 'business planning'],
  authors: [{ name: 'AiPlace' }],
  creator: 'AiPlace',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aiplace.com',
    title: 'AiPlace - Digital Innovation & AI Solutions',
    description: 'Your Partner in Digital Innovation',
    siteName: 'AiPlace',
    images: [{
      url: 'https://aiplace.com/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AiPlace - Digital Innovation & AI Solutions',
    description: 'Your Partner in Digital Innovation',
    images: ['https://aiplace.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### 8.2 JSON-LD Structured Data

```typescript
// components/common/schema-markup.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AiPlace',
    url: 'https://aiplace.com',
    logo: 'https://aiplace.com/logo.png',
    description: 'Full-service digital agency',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-xxx-xxx-xxxx',
      contactType: 'Customer Service',
    },
    sameAs: [
      'https://twitter.com/aiplace',
      'https://linkedin.com/company/aiplace',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 8.3 Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getBlogPosts, getPortfolioItems } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aiplace.com'

  const posts = await getBlogPosts()
  const portfolio = await getPortfolioItems()

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const portfolioUrls = portfolio.map((item) => ({
    url: `${baseUrl}/portfolio/${item.slug.current}`,
    lastModified: new Date(item._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
    ...portfolioUrls,
  ]
}
```

---

## 9. Deployment Architecture

### 9.1 Vercel Configuration

```json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "@sanity-project-id",
    "NEXT_PUBLIC_SANITY_DATASET": "@sanity-dataset",
    "RESEND_API_KEY": "@resend-api-key"
  }
}
```

### 9.2 Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"

# Email
RESEND_API_KEY="re_xxx"
CONTACT_EMAIL="contact@aiplace.com"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Rate Limiting
UPSTASH_REDIS_URL="https://xxx.upstash.io"
UPSTASH_REDIS_TOKEN="xxx"

# App
NEXT_PUBLIC_APP_URL="https://aiplace.com"
```

### 9.3 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
```

---

## 10. Architecture Decision Records (ADRs)

### ADR-001: Next.js 14 App Router

**Status**: Accepted

**Context**: Need to choose between Pages Router and App Router for Next.js 14.

**Decision**: Use App Router for the following reasons:
- Server Components by default (better performance)
- Better code organization with route groups
- Improved data fetching patterns
- Built-in loading and error states
- Future-proof (official recommendation)

**Consequences**:
- Learning curve for new paradigm
- Some libraries may not be fully compatible
- Better performance and developer experience

### ADR-002: PostgreSQL + Prisma

**Status**: Accepted

**Context**: Need to choose database and ORM.

**Decision**: PostgreSQL with Prisma ORM.

**Reasons**:
- PostgreSQL: Robust, scalable, JSONB support
- Prisma: Type-safe, great DX, migrations
- Hosted on Vercel Postgres for easy integration

**Alternatives Considered**:
- MongoDB: Less structured data requirements
- Drizzle ORM: Newer, less ecosystem support

### ADR-003: Sanity CMS for Content

**Status**: Accepted

**Context**: Need headless CMS for blog and portfolio.

**Decision**: Sanity.io for content management.

**Reasons**:
- Real-time collaboration
- Flexible content modeling
- Great developer experience
- Built-in image CDN
- Incremental Static Regeneration support

**Alternatives**:
- Contentful: More expensive
- Strapi: Self-hosted complexity

### ADR-004: Tailwind CSS + shadcn/ui

**Status**: Accepted

**Context**: Styling solution for the application.

**Decision**: Tailwind CSS with shadcn/ui component library.

**Reasons**:
- Utility-first approach for rapid development
- shadcn/ui provides accessible components
- Full design control (components copied to project)
- Great TypeScript support
- Small bundle size with JIT

### ADR-005: Monorepo Structure

**Status**: Rejected

**Context**: Should we use a monorepo for web + CMS?

**Decision**: Keep as separate repositories.

**Reasons**:
- Sanity Studio deployed separately
- Simpler deployment pipeline
- Less complexity for current scale
- Can migrate to monorepo later if needed

---

## 11. Security Considerations

### 11.1 Security Checklist

- [x] HTTPS enforcement
- [x] CSRF protection (Next.js built-in)
- [x] Rate limiting on API routes
- [x] Input validation (Zod schemas)
- [x] SQL injection prevention (Prisma ORM)
- [x] XSS protection (React escaping)
- [x] Security headers (CSP, HSTS, etc.)
- [x] Environment variable protection
- [x] API route authentication
- [x] Database connection encryption

### 11.2 Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: cdn.sanity.io;
      font-src 'self';
      connect-src 'self' *.sanity.io *.google-analytics.com;
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim()
  }
]
```

---

## 12. Monitoring & Analytics

### 12.1 Monitoring Stack

**Application Monitoring**
- Vercel Analytics (Core Web Vitals)
- Sentry (Error tracking)
- LogRocket (Session replay)

**Business Analytics**
- Google Analytics 4
- Custom event tracking
- Conversion tracking

**Performance Monitoring**
- Lighthouse CI
- Bundle size tracking
- Database query performance

### 12.2 Key Metrics

**Performance**
- Lighthouse score: Target 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

**Business**
- Contact form conversion rate
- Consultation booking rate
- Newsletter signup rate
- Average session duration
- Bounce rate

---

## 13. Future Enhancements

### Phase 2 Features
- Client portal with authentication
- Project management dashboard
- Real-time chat support
- Advanced analytics dashboard

### Phase 3 Features
- AI-powered chatbot (GPT-4)
- Interactive demos
- Webinar platform
- Resource library

### Technical Improvements
- E2E testing with Playwright
- Storybook for component documentation
- Automated accessibility testing
- GraphQL API layer

---

## Appendix

### A. Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend Framework | Next.js 14 | Server & Client rendering |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| Components | shadcn/ui | Accessible components |
| Animations | Framer Motion | Smooth transitions |
| Database | PostgreSQL | Relational data |
| ORM | Prisma | Type-safe queries |
| CMS | Sanity.io | Content management |
| Email | Resend | Transactional emails |
| Hosting | Vercel | Serverless deployment |
| CDN | Cloudflare | Asset delivery |
| Analytics | GA4 + Vercel | User tracking |

### B. Performance Targets

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Lighthouse Performance | 90+ | 85 |
| First Contentful Paint | < 1.5s | 2.0s |
| Time to Interactive | < 3s | 4.0s |
| Total Bundle Size | < 200KB | 300KB |
| API Response Time | < 200ms | 500ms |
| Database Query Time | < 50ms | 100ms |

### C. Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

**Document Control**
- **Created**: October 2025
- **Last Updated**: October 2025
- **Version**: 1.0
- **Status**: Architecture Design Complete
- **Next Review**: Before Phase 2 Development

**Approval**
- Technical Architect: [Pending]
- Lead Developer: [Pending]
- Project Manager: [Pending]
