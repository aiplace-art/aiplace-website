# AiPlace Website - Tech Stack & Dependencies

## Technology Selection Rationale

**Selection Criteria**:
1. Modern, production-ready technologies
2. Excellent developer experience
3. Strong community support
4. Performance-optimized
5. Scalable for future growth
6. Type-safe where possible
7. Well-documented

---

## 1. Core Framework

### Next.js 14 (App Router)

**Version**: `^14.0.0`

**Rationale**:
- ✅ React Server Components (RSC) for optimal performance
- ✅ Built-in image optimization
- ✅ File-based routing with layouts
- ✅ API routes for backend functionality
- ✅ Excellent SEO with metadata API
- ✅ Vercel deployment optimization
- ✅ Server Actions for form handling
- ✅ Streaming and Suspense support

**Installation**:
```bash
npx create-next-app@latest aiplace-website --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Configuration** (`next.config.js`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Add your CDN domains
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  // Enable strict mode for better React practices
  reactStrictMode: true,
}

module.exports = nextConfig
```

---

## 2. Language & Type Safety

### TypeScript

**Version**: `^5.3.0`

**Configuration** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 3. Styling

### 3.1 Tailwind CSS

**Version**: `^3.4.0`

**Rationale**:
- Utility-first CSS
- Excellent performance (PurgeCSS built-in)
- Rapid development
- Consistent design system
- Responsive design utilities
- Dark mode support

**Dependencies**:
```json
{
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.32",
  "autoprefixer": "^10.4.16"
}
```

**Configuration** (`tailwind.config.ts`):
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        cyan: {
          50: '#E0F7FF',
          100: '#B3EDFF',
          200: '#80E3FF',
          300: '#4DD9FF',
          400: '#26D1FF',
          500: '#00D4FF', // Primary
          600: '#00BAE6',
          700: '#009FCC',
          800: '#0085B3',
          900: '#005D80',
        },
        purple: {
          50: '#F5EDFC',
          100: '#E6D2F7',
          200: '#D6B5F2',
          300: '#C698ED',
          400: '#B97BE8',
          500: '#9D4EDD', // Primary
          600: '#8A3CC7',
          700: '#732FB0',
          800: '#5C2399',
          900: '#3F1670',
        },
        magenta: {
          50: '#FFE0EE',
          100: '#FFB3D6',
          200: '#FF80BC',
          300: '#FF4DA2',
          400: '#FF268F',
          500: '#FF006E', // Primary
          600: '#E60063',
          700: '#CC0058',
          800: '#B3004D',
          900: '#800037',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-fira-code)', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 50%, #FF006E 100%)',
        'gradient-mesh': `
          radial-gradient(at 0% 0%, rgba(0,212,255,0.3) 0px, transparent 50%),
          radial-gradient(at 50% 50%, rgba(157,78,221,0.3) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(255,0,110,0.3) 0px, transparent 50%)
        `,
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(157, 78, 221, 0.5)',
        'glow-magenta': '0 0 20px rgba(255, 0, 110, 0.5)',
        'glow-gradient': '0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(157, 78, 221, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
```

---

### 3.2 CSS-in-JS Alternative (Optional)

**Vanilla Extract** (if needed for complex component styling)

**Version**: `^1.14.0`

**Rationale**:
- Type-safe CSS
- Zero-runtime CSS-in-JS
- Excellent with Next.js

---

## 4. UI Components & Primitives

### 4.1 Radix UI

**Version**: `^1.0.0` (various packages)

**Rationale**:
- Unstyled, accessible components
- ARIA-compliant out of the box
- Composable primitives
- Keyboard navigation built-in

**Key Packages**:
```json
{
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-tooltip": "^1.0.7"
}
```

---

### 4.2 shadcn/ui

**Rationale**:
- Pre-built components using Radix UI
- Copy-paste components (not a library)
- Fully customizable
- Tailwind-based styling

**Installation**:
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

---

## 5. Animation Libraries

### 5.1 Framer Motion

**Version**: `^10.18.0`

**Rationale**:
- Declarative animations for React
- Layout animations
- Gesture support
- Excellent TypeScript support
- Server Components compatible (with 'use client')

```bash
npm install framer-motion
```

---

### 5.2 GSAP (Optional for Complex Animations)

**Version**: `^3.12.0`

**Rationale**:
- Industry-leading performance
- Timeline-based animations
- SVG morphing
- ScrollTrigger plugin

```bash
npm install gsap
```

---

## 6. Icons

### Lucide React

**Version**: `^0.300.0`

**Rationale**:
- Modern, consistent icon set
- Tree-shakeable
- TypeScript support
- 1000+ icons

```bash
npm install lucide-react
```

**Usage**:
```tsx
import { Brain, Sparkles, Zap } from 'lucide-react'

<Brain className="w-6 h-6 text-purple-500" />
```

---

## 7. Forms & Validation

### 7.1 React Hook Form

**Version**: `^7.49.0`

**Rationale**:
- Minimal re-renders
- Excellent performance
- Easy validation integration
- TypeScript support

```bash
npm install react-hook-form
```

---

### 7.2 Zod

**Version**: `^3.22.0`

**Rationale**:
- TypeScript-first schema validation
- Runtime type checking
- Excellent error messages
- Next.js Server Actions compatible

```bash
npm install zod
```

**Example**:
```typescript
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = (data: ContactFormData) => {
    // Handle form submission
  }

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>
}
```

---

## 8. Data Fetching & State Management

### 8.1 React Query (TanStack Query)

**Version**: `^5.17.0`

**Rationale**:
- Server state management
- Automatic caching
- Background refetching
- Optimistic updates
- TypeScript support

```bash
npm install @tanstack/react-query
```

**Setup**:
```tsx
// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

---

### 8.2 Zustand (Optional for Global State)

**Version**: `^4.4.0`

**Rationale**:
- Minimal boilerplate
- No context provider needed
- TypeScript-friendly
- Small bundle size

```bash
npm install zustand
```

**Usage**:
```typescript
import { create } from 'zustand'

interface UIStore {
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
}

export const useUIStore = create<UIStore>((set) => ({
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}))
```

---

## 9. Database & Backend

### 9.1 Supabase (Recommended)

**Version**: `^2.38.0`

**Rationale**:
- PostgreSQL database
- Built-in authentication
- Real-time subscriptions
- File storage
- Edge Functions
- Excellent Next.js integration

```bash
npm install @supabase/supabase-js
```

**Setup**:
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**Alternative**: Prisma + PostgreSQL/MongoDB

---

### 9.2 Prisma (Alternative ORM)

**Version**: `^5.8.0`

**Rationale**:
- Type-safe database client
- Auto-generated types
- Migration system
- Works with multiple databases

```bash
npm install prisma @prisma/client
npx prisma init
```

---

## 10. Email Service

### Resend

**Version**: `^3.0.0`

**Rationale**:
- Modern email API
- React email templates
- Excellent developer experience
- Affordable pricing

```bash
npm install resend
npm install react-email @react-email/components
```

**Example**:
```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  const { data, error } = await resend.emails.send({
    from: 'AiPlace <noreply@aiplace.com>',
    to: 'hello@aiplace.com',
    subject: `New Contact Form Submission from ${name}`,
    html: `<p>${message}</p>`,
  })

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ data })
}
```

**Alternatives**: SendGrid, Postmark

---

## 11. CMS (Content Management)

### 11.1 Sanity.io (Recommended)

**Version**: `^3.24.0`

**Rationale**:
- Headless CMS
- Real-time collaboration
- Customizable Studio
- Excellent TypeScript support
- Image CDN included

```bash
npm install @sanity/client next-sanity @portabletext/react
```

---

### 11.2 MDX (Alternative for Simple Content)

**Version**: `^3.0.0`

**Rationale**:
- Markdown with JSX components
- Version-controlled content
- No external dependency
- Great for blogs/docs

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
```

---

## 12. Analytics

### 12.1 Vercel Analytics

**Version**: `^1.1.0`

**Rationale**:
- Zero-config with Vercel
- Privacy-friendly
- Core Web Vitals tracking
- Free tier available

```bash
npm install @vercel/analytics
```

**Setup**:
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

### 12.2 Google Analytics 4 (Optional)

**Version**: `^5.0.0`

```bash
npm install react-ga4
```

---

## 13. SEO

### Next.js Built-in Metadata API

**Rationale**:
- Type-safe metadata
- Automatic OpenGraph images
- Dynamic sitemap generation
- Built into Next.js 14

**Example**:
```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | AiPlace',
    default: 'AiPlace - Where Creativity Meets AI',
  },
  description: 'Transform your business with cutting-edge AI solutions.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aiplace.com',
    siteName: 'AiPlace',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AiPlace - Where Creativity Meets AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aiplace',
    creator: '@aiplace',
  },
}
```

---

## 14. Testing

### 14.1 Vitest

**Version**: `^1.0.0`

**Rationale**:
- Fast unit testing
- Vite-powered
- Jest-compatible API
- TypeScript support

```bash
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom
```

---

### 14.2 Playwright

**Version**: `^1.40.0`

**Rationale**:
- E2E testing
- Cross-browser support
- Visual regression testing
- Excellent Next.js integration

```bash
npm install -D @playwright/test
npx playwright install
```

---

## 15. Code Quality

### 15.1 ESLint

**Configuration** (`.eslintrc.json`):
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

---

### 15.2 Prettier

**Configuration** (`.prettierrc`):
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 16. Development Tools

### 16.1 Storybook (Optional)

**Version**: `^7.6.0`

**Rationale**:
- Component development in isolation
- Documentation
- Visual testing

```bash
npx storybook@latest init
```

---

## 17. Deployment & Hosting

### Vercel (Recommended)

**Rationale**:
- Built by Next.js creators
- Zero-config deployment
- Edge Network
- Automatic HTTPS
- Preview deployments
- Analytics included

**Alternative**: Netlify, Cloudflare Pages

---

## 18. Environment Variables

**`.env.local`**:
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
RESEND_API_KEY=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=

# CMS (if using Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Feature Flags
NEXT_PUBLIC_ENABLE_BLOG=false
```

---

## 19. Complete package.json

```json
{
  "name": "aiplace-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.3.3",

    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",

    "framer-motion": "^10.18.0",
    "lucide-react": "^0.300.0",

    "react-hook-form": "^7.49.3",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",

    "@tanstack/react-query": "^5.17.19",
    "@tanstack/react-query-devtools": "^5.17.19",

    "@supabase/supabase-js": "^2.38.4",
    "resend": "^3.0.0",
    "react-email": "^2.0.0",

    "@vercel/analytics": "^1.1.1",

    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",

    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "@tailwindcss/aspect-ratio": "^0.4.2",

    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.4",
    "prettier": "^3.1.1",
    "prettier-plugin-tailwindcss": "^0.5.10",

    "vitest": "^1.1.0",
    "@vitejs/plugin-react": "^4.2.1",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "jsdom": "^23.0.1",

    "@playwright/test": "^1.40.1"
  }
}
```

---

## 20. Build & Bundle Optimization

### 20.1 Bundle Analyzer

```bash
npm install -D @next/bundle-analyzer
```

**Configuration** (`next.config.js`):
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... rest of config
})
```

**Usage**:
```bash
ANALYZE=true npm run build
```

---

### 20.2 Package Size Optimization

**Strategies**:
1. Tree-shaking with ES modules
2. Dynamic imports for large components
3. Lazy load third-party scripts
4. Use `next/dynamic` for client components
5. Optimize images with `next/image`

---

## 21. Project Structure

```
aiplace-website/
├── public/
│   ├── images/
│   ├── videos/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── portfolio/
│   │   │   └── contact/
│   │   ├── api/
│   │   │   └── contact/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── templates/
│   │   └── features/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   ├── utils/
│   └── styles/
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Summary

This tech stack provides:

✅ **Modern Framework**: Next.js 14 with App Router
✅ **Type Safety**: Full TypeScript coverage
✅ **Styling**: Tailwind CSS with design system
✅ **Animations**: Framer Motion for smooth interactions
✅ **Forms**: React Hook Form + Zod validation
✅ **Data Fetching**: React Query for server state
✅ **Backend**: Supabase for database and auth
✅ **Email**: Resend for transactional emails
✅ **Analytics**: Vercel Analytics for insights
✅ **Testing**: Vitest + Playwright
✅ **Deployment**: Vercel for optimal Next.js hosting

**Estimated Bundle Sizes**:
- First Load JS: ~120-150 KB (gzipped)
- Largest page: ~180 KB (with animations)
- Image optimization: ~60-80% reduction

**Performance Targets**:
- Lighthouse Score: >95
- LCP: <2.5s
- FID: <100ms
- CLS: <0.1
- TTI: <3.8s
