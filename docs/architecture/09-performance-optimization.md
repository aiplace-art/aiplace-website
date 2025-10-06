# AiPlace Website - Performance Optimization Strategy

## Performance Goals

**Target Metrics** (Mobile & Desktop):
- **Lighthouse Score**: >95
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **TTFB (Time to First Byte)**: <600ms
- **FCP (First Contentful Paint)**: <1.8s
- **TTI (Time to Interactive)**: <3.8s
- **Speed Index**: <3.4s

**Bundle Size Targets**:
- First Load JS: <150 KB (gzipped)
- Per-page JS: <50 KB (gzipped)
- CSS: <15 KB (gzipped)
- Total Page Weight: <1 MB (initial load)

---

## 1. Image Optimization

### 1.1 Next.js Image Component

**Always use `next/image`** for automatic optimization:

```typescript
import Image from 'next/image'

// Responsive image
<Image
  src="/hero-image.jpg"
  alt="AI Brain Visualization"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  priority // Only for above-the-fold images
  placeholder="blur"
  blurDataURL={blurDataURL}
  quality={85} // Default is 75, adjust based on needs
/>

// Fill container (for backgrounds)
<div className="relative w-full h-96">
  <Image
    src="/background.jpg"
    alt="Background"
    fill
    className="object-cover"
    sizes="100vw"
  />
</div>
```

---

### 1.2 Image Format Strategy

**Format Priority**:
1. **AVIF**: Best compression, modern browsers
2. **WebP**: Good compression, wide support
3. **JPEG/PNG**: Fallback

**Next.js automatically serves AVIF/WebP** when supported.

**Configuration**:
```javascript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

---

### 1.3 Responsive Images

**Sizes Attribute**:
```typescript
// Portfolio grid item
<Image
  src={project.image}
  alt={project.title}
  width={600}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

**Explanation**:
- Mobile (<640px): Image is 100% of viewport width
- Tablet (<1024px): Image is 50% of viewport width (2 columns)
- Desktop: Image is 33% of viewport width (3 columns)

---

### 1.4 Lazy Loading

**Default behavior**: Images below the fold are lazy-loaded automatically.

**Force eager loading** for above-the-fold:
```typescript
<Image src="/hero.jpg" alt="Hero" priority />
```

**Disable lazy loading** (use sparingly):
```typescript
<Image src="/logo.png" alt="Logo" loading="eager" />
```

---

### 1.5 Blur Placeholder

**Generate blur placeholder** (build-time):
```typescript
import { getPlaiceholder } from 'plaiceholder'

// In Server Component or during build
async function getImageWithBlur(src: string) {
  const buffer = await fetch(src).then(res => res.arrayBuffer())
  const { base64 } = await getPlaiceholder(Buffer.from(buffer))

  return { src, blurDataURL: base64 }
}

// Usage
const imageData = await getImageWithBlur('/hero.jpg')

<Image
  {...imageData}
  alt="Hero"
  placeholder="blur"
/>
```

---

### 1.6 Image CDN

**Recommended**: Use CDN for external images

```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.yourdomain.com',
      },
    ],
  },
}
```

---

## 2. Code Splitting & Lazy Loading

### 2.1 Automatic Route-Based Splitting

Next.js automatically code-splits by route:
```
/app/page.tsx         → chunk-home.js
/app/services/page.tsx → chunk-services.js
/app/portfolio/page.tsx → chunk-portfolio.js
```

---

### 2.2 Dynamic Imports

**Lazy load heavy components**:

```typescript
import dynamic from 'next/dynamic'

// Load component only when needed
const AIVisualization = dynamic(() => import('@/components/AIVisualization'), {
  ssr: false, // Disable SSR if component uses browser-only APIs
  loading: () => <Skeleton height={400} />,
})

// Conditional loading
export const HeroSection = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section>
      {isDesktop ? (
        <AIVisualization />
      ) : (
        <Image src="/ai-static.jpg" alt="AI" />
      )}
    </section>
  )
}
```

---

### 2.3 Component-Level Code Splitting

**Heavy libraries** (charts, editors, etc.):

```typescript
// Load chart library only when tab is active
const ChartComponent = dynamic(() => import('react-chartjs-2'), {
  ssr: false,
})

export const StatsSection = () => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewStats />
      </TabsContent>
      <TabsContent value="charts">
        {activeTab === 'charts' && <ChartComponent data={data} />}
      </TabsContent>
    </Tabs>
  )
}
```

---

### 2.4 Prefetching

**Automatic prefetching** for `<Link>` components:

```typescript
// Prefetches linked page when link enters viewport
<Link href="/portfolio" prefetch>
  View Portfolio
</Link>

// Disable prefetch if not needed
<Link href="/contact" prefetch={false}>
  Contact
</Link>
```

**Manual prefetching**:
```typescript
import { useRouter } from 'next/navigation'

const router = useRouter()

const handleMouseEnter = () => {
  router.prefetch('/portfolio')
}

<div onMouseEnter={handleMouseEnter}>
  <Link href="/portfolio">Portfolio</Link>
</div>
```

---

## 3. Font Optimization

### 3.1 Next.js Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-inter',
  preload: true,
  weight: ['400', '500', '600', '700'], // Only load needed weights
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

**Benefits**:
- Automatic font subsetting
- Self-hosted fonts (no external request)
- Preloaded font files
- Zero layout shift

---

### 3.2 Variable Fonts

**Prefer variable fonts** (single file, multiple weights):

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// CSS
.text {
  font-variation-settings: 'wght' 450; // Any weight 100-900
}
```

---

### 3.3 Font Loading Strategy

**Display Strategies**:
- `swap`: Show fallback, swap when custom font loads (recommended)
- `optional`: Use custom font only if immediately available
- `fallback`: Brief blocking period, then swap
- `block`: Block text rendering until font loads (not recommended)

---

## 4. JavaScript Optimization

### 4.1 Tree Shaking

**Import only what you need**:

```typescript
// ❌ Bad - imports entire library
import _ from 'lodash'

// ✅ Good - imports only needed function
import debounce from 'lodash/debounce'

// ✅ Even better - use native alternative
const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
```

---

### 4.2 Bundle Analysis

**Analyze bundle size**:

```bash
npm install -D @next/bundle-analyzer

# Run analysis
ANALYZE=true npm run build
```

**Configuration**:
```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... config
})
```

---

### 4.3 Remove Unused Dependencies

**Audit packages**:
```bash
npx depcheck
```

**Check package sizes before installing**:
```bash
npx bundle-phobia [package-name]
```

---

## 5. CSS Optimization

### 5.1 Tailwind Purging

**Automatic purging** of unused CSS:

```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // Tailwind automatically purges unused classes
}
```

**Result**: 15-20 KB CSS (gzipped) instead of 3+ MB

---

### 5.2 Critical CSS

**Next.js automatically inlines critical CSS** in `<head>`.

**Manual critical CSS** (if needed):
```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold CSS */
            body { margin: 0; font-family: system-ui; }
            .hero { min-height: 100vh; }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 6. Rendering Strategies

### 6.1 Static Site Generation (SSG)

**Use for**: Pages that don't change frequently

```typescript
// app/about/page.tsx
export default async function AboutPage() {
  // This is statically generated at build time
  return <div>About Us</div>
}

// Force static generation
export const dynamic = 'force-static'
```

---

### 6.2 Incremental Static Regeneration (ISR)

**Use for**: Content that updates periodically

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)
  return <Article post={post} />
}
```

---

### 6.3 Server-Side Rendering (SSR)

**Use for**: User-specific or real-time data

```typescript
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const user = await getCurrentUser()
  return <UserDashboard user={user} />
}
```

---

### 6.4 Client-Side Rendering (CSR)

**Use for**: Highly interactive components

```typescript
'use client'

export default function InteractiveChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData().then(setData)
  }, [])

  return <Chart data={data} />
}
```

---

## 7. Caching Strategy

### 7.1 HTTP Caching

**Static assets** (images, fonts, JS, CSS):
```
Cache-Control: public, max-age=31536000, immutable
```

**HTML pages**:
```
Cache-Control: public, max-age=0, must-revalidate
```

**API responses**:
```
Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=86400
```

---

### 7.2 React Query Cache

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min - consider data fresh
      cacheTime: 10 * 60 * 1000, // 10 min - keep in cache
      refetchOnWindowFocus: false,
    },
  },
})
```

---

### 7.3 Service Worker (Future Enhancement)

**Progressive Web App** with offline support:

```bash
npm install next-pwa
```

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // ... config
})
```

---

## 8. Database Optimization

### 8.1 Query Optimization

**Use indexes** for frequently queried fields:

```sql
-- Supabase SQL Editor
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

---

### 8.2 Selective Field Fetching

**Don't fetch all columns**:

```typescript
// ❌ Bad - fetches all columns
const { data } = await supabase.from('projects').select('*')

// ✅ Good - fetches only needed columns
const { data } = await supabase
  .from('projects')
  .select('id, title, category, image_url')
```

---

### 8.3 Pagination

```typescript
const PAGE_SIZE = 12

const { data, count } = await supabase
  .from('projects')
  .select('*', { count: 'exact' })
  .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
```

---

### 8.4 Database Connection Pooling

**Supabase handles this automatically**, but be mindful of:
- Connection limits
- Query timeouts
- Simultaneous requests

---

## 9. Network Optimization

### 9.1 HTTP/2 & HTTP/3

**Vercel automatically uses HTTP/2** (and HTTP/3 where supported).

**Benefits**:
- Multiplexing (parallel requests)
- Header compression
- Server push

---

### 9.2 Compression

**Automatic Gzip/Brotli** on Vercel:
- HTML, CSS, JS, JSON: Brotli compressed
- 70-90% size reduction

---

### 9.3 CDN

**Vercel Edge Network**:
- 100+ global locations
- Automatic asset caching
- DDoS protection

---

## 10. Performance Monitoring

### 10.1 Web Vitals Tracking

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

### 10.2 Real User Monitoring (RUM)

**Vercel Analytics** provides:
- Core Web Vitals by page
- Device/browser breakdown
- Geographic performance
- Conversion tracking

---

### 10.3 Lighthouse CI

**Automate performance testing**:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install && npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://preview-url.vercel.app
            https://preview-url.vercel.app/portfolio
          budgetPath: ./lighthouse-budget.json
```

**Budget file**:
```json
{
  "performance": 95,
  "accessibility": 100,
  "best-practices": 95,
  "seo": 100
}
```

---

## 11. Performance Checklist

### Pre-Launch Checklist

**Images**:
- [ ] All images using `next/image`
- [ ] Appropriate sizes attribute
- [ ] Priority set for above-the-fold images
- [ ] Lazy loading for below-the-fold
- [ ] AVIF/WebP formats enabled

**JavaScript**:
- [ ] Code splitting implemented
- [ ] Heavy components lazy loaded
- [ ] Bundle size < 150 KB (first load)
- [ ] No unused dependencies
- [ ] Tree shaking verified

**CSS**:
- [ ] Tailwind purging enabled
- [ ] No unused CSS
- [ ] CSS bundle < 15 KB
- [ ] Critical CSS inlined

**Fonts**:
- [ ] Using `next/font`
- [ ] Only necessary weights loaded
- [ ] `display: swap` set
- [ ] Variable fonts considered

**Caching**:
- [ ] Static assets cached (1 year)
- [ ] API responses cached appropriately
- [ ] React Query cache configured
- [ ] ISR enabled for dynamic content

**Rendering**:
- [ ] SSG for static pages
- [ ] ISR for semi-static content
- [ ] Server Components by default
- [ ] Client Components minimized

**Database**:
- [ ] Queries optimized
- [ ] Indexes created
- [ ] Selective field fetching
- [ ] Pagination implemented

**Monitoring**:
- [ ] Analytics installed
- [ ] Web Vitals tracked
- [ ] Error tracking configured
- [ ] Lighthouse CI set up

---

## 12. Performance Budget

**Enforce performance limits**:

```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.performance = {
        maxEntrypointSize: 150000, // 150 KB
        maxAssetSize: 100000, // 100 KB
      }
    }
    return config
  },
}
```

---

## Summary

This performance optimization strategy ensures:

✅ **Fast Loading**: LCP <2.5s, FCP <1.8s
✅ **Small Bundles**: <150 KB first load JS
✅ **Optimized Images**: AVIF/WebP, lazy loading, blur placeholders
✅ **Smart Caching**: Multi-layer caching strategy
✅ **Code Splitting**: Route and component-level splitting
✅ **Monitoring**: Real-time performance tracking
✅ **Accessibility**: No performance at expense of accessibility

**Key Optimizations**:
1. Use `next/image` for all images
2. Lazy load non-critical components
3. Optimize fonts with `next/font`
4. Enable ISR for dynamic content
5. Implement proper caching
6. Monitor with Vercel Analytics
7. Set performance budgets
8. Test regularly with Lighthouse

**Expected Results**:
- Lighthouse Score: 95+
- LCP: <2.5s
- FID: <100ms
- CLS: <0.1
- Page load: <3s (3G)
- Time to Interactive: <3.8s
