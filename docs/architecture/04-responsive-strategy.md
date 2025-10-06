# AiPlace Website - Responsive Strategy & Breakpoints

## Mobile-First Approach

**Philosophy**: Design for mobile devices first, then progressively enhance for larger screens.

**Benefits**:
- Forces focus on essential content
- Better performance on mobile devices
- Easier to scale up than scale down
- Aligns with mobile-majority web traffic

---

## 1. Breakpoint System

### 1.1 Breakpoint Definitions

```typescript
// config/breakpoints.ts
export const breakpoints = {
  xs: 0,      // Mobile portrait (default)
  sm: 640,    // Mobile landscape / Small tablets
  md: 768,    // Tablets
  lg: 1024,   // Desktop / Laptops
  xl: 1280,   // Large desktop
  '2xl': 1536 // Extra large desktop / 4K
} as const

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,

  // Max-width queries (mobile-first exceptions)
  maxSm: `@media (max-width: ${breakpoints.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpoints.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpoints.lg - 1}px)`,

  // Range queries
  smToMd: `@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
  mdToLg: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,

  // Device-specific
  touch: '@media (hover: none) and (pointer: coarse)',
  mouse: '@media (hover: hover) and (pointer: fine)',

  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',

  // Reduced motion
  reducedMotion: '@media (prefers-reduced-motion: reduce)',

  // Dark mode
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
} as const
```

---

### 1.2 Device Categories

| Category | Breakpoint | Width Range | Common Devices | Layout |
|----------|------------|-------------|----------------|--------|
| **Mobile Portrait** | xs (0-639px) | 320-639px | iPhone SE, Galaxy S | Single column, stacked content |
| **Mobile Landscape / Small Tablet** | sm (640-767px) | 640-767px | iPhone Pro landscape, iPad Mini portrait | 1-2 columns, compact nav |
| **Tablet** | md (768-1023px) | 768-1023px | iPad, Android tablets | 2-3 columns, side nav |
| **Desktop** | lg (1024-1279px) | 1024-1279px | Laptops, small desktop | Multi-column, full nav |
| **Large Desktop** | xl (1280-1535px) | 1280-1535px | Large monitors | Optimized layouts, more whitespace |
| **Extra Large** | 2xl (1536px+) | 1536px+ | 4K displays, ultra-wide | Max content width, centered |

---

### 1.3 Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '0px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    // Container max-widths
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
}
```

---

## 2. Responsive Layout Patterns

### 2.1 Container System

```tsx
// components/layouts/Container.tsx
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  children: ReactNode
}

export const Container: FC<ContainerProps> = ({
  maxWidth = 'xl',
  padding = true,
  children
}) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  }

  return (
    <div className={`
      mx-auto
      ${maxWidthClasses[maxWidth]}
      ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
    `}>
      {children}
    </div>
  )
}
```

**Usage Examples**:
```tsx
// Home page hero - Full width
<Container maxWidth="2xl">
  <HeroSection />
</Container>

// Content sections - Standard width
<Container maxWidth="xl">
  <ServicesGrid />
</Container>

// Blog posts - Narrow width
<Container maxWidth="md">
  <BlogContent />
</Container>
```

---

### 2.2 Grid System

#### Responsive Columns

```tsx
// Auto-responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>

// Complex grid with mixed columns
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
  <div className="md:col-span-8">
    {/* Main content - 8 columns on desktop */}
  </div>
  <div className="md:col-span-4">
    {/* Sidebar - 4 columns on desktop */}
  </div>
</div>
```

#### Portfolio Grid (Masonry-style)

```tsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
// Large: 4 columns

<div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
  {projects.map(project => (
    <ProjectCard key={project.id} {...project} />
  ))}
</div>
```

---

### 2.3 Flexbox Patterns

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col lg:flex-row gap-6">
  <div className="lg:w-2/3">{/* Main content */}</div>
  <div className="lg:w-1/3">{/* Sidebar */}</div>
</div>

// Center content vertically on desktop
<div className="flex flex-col lg:flex-row lg:items-center gap-6">
  <div className="flex-1">{/* Text content */}</div>
  <div className="flex-1">{/* Image */}</div>
</div>

// Responsive navigation
<nav className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
  <NavItem />
  <NavItem />
  <NavItem />
</nav>
```

---

## 3. Component Responsive Behavior

### 3.1 Header/Navigation

#### Mobile (xs - md)
- Hamburger menu icon
- Full-screen overlay menu
- Logo centered or left-aligned
- CTA button (optional, prominent)

```tsx
<header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md">
  <Container>
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <Logo />

      {/* Mobile menu toggle (visible only on mobile) */}
      <button className="md:hidden">
        <HamburgerIcon />
      </button>

      {/* Desktop navigation (hidden on mobile) */}
      <nav className="hidden md:flex items-center gap-6">
        <NavLinks />
        <CTAButton />
      </nav>
    </div>
  </Container>

  {/* Mobile menu overlay */}
  <MobileMenu isOpen={isOpen} />
</header>
```

#### Desktop (lg+)
- Horizontal navigation
- Logo left, links center/right
- CTA button right-aligned
- Dropdown menus (if needed)

---

### 3.2 Hero Section

#### Mobile
```tsx
<section className="
  min-h-screen
  flex items-center
  px-4
  py-16
">
  <div className="text-center">
    <h1 className="text-4xl font-extrabold mb-4">
      Where Creativity Meets AI
    </h1>
    <p className="text-lg mb-8">
      Transform your business with AI
    </p>
    <div className="flex flex-col gap-4">
      <CTAButton size="lg">Get Started</CTAButton>
      <SecondaryButton>View Portfolio</SecondaryButton>
    </div>
  </div>
</section>
```

#### Desktop
```tsx
<section className="
  min-h-screen
  flex items-center
  px-4 lg:px-8
  py-16 lg:py-0
">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    <div className="text-left">
      <h1 className="text-5xl lg:text-7xl font-extrabold mb-6">
        Where Creativity Meets AI
      </h1>
      <p className="text-xl mb-8">
        Transform your business with cutting-edge AI solutions
      </p>
      <div className="flex gap-4">
        <CTAButton size="xl">Get Started</CTAButton>
        <SecondaryButton size="xl">View Portfolio</SecondaryButton>
      </div>
    </div>
    <div>
      <AIBrainVisualization />
    </div>
  </div>
</section>
```

**Responsive Characteristics**:
- Heading size: `text-4xl` → `text-5xl` → `text-7xl`
- Layout: Stacked → Two-column
- Buttons: Full-width stacked → Inline horizontal
- Padding: `px-4 py-16` → `px-8 py-0`

---

### 3.3 Services Grid

```tsx
<section className="py-16 lg:py-24">
  <Container>
    <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">
      Our Services
    </h2>

    {/* Responsive grid:
        Mobile: 1 column
        Tablet: 2 columns
        Desktop: 3 columns
    */}
    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
      lg:gap-8
    ">
      {services.map(service => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  </Container>
</section>
```

---

### 3.4 Portfolio Grid

```tsx
<section className="py-16 lg:py-24">
  <Container>
    {/* Filter tabs - horizontal scroll on mobile */}
    <div className="
      flex
      overflow-x-auto
      gap-2
      mb-8
      pb-2
      scrollbar-hide
      md:justify-center
    ">
      {categories.map(category => (
        <FilterButton key={category} {...category} />
      ))}
    </div>

    {/* Masonry grid */}
    <div className="
      columns-1
      sm:columns-2
      lg:columns-3
      xl:columns-4
      gap-4
      lg:gap-6
    ">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  </Container>
</section>
```

**Mobile Optimizations**:
- Horizontal scrolling filter tabs
- Single column masonry
- Smaller gap between items
- Touch-friendly tap targets (min 44x44px)

---

### 3.5 Contact Form

#### Mobile Layout
```tsx
<form className="space-y-4">
  {/* Full-width stacked fields */}
  <FormField label="Name" />
  <FormField label="Email" />
  <FormField label="Phone" />
  <FormField label="Message" type="textarea" rows={4} />
  <Button type="submit" className="w-full">
    Send Message
  </Button>
</form>
```

#### Desktop Layout
```tsx
<form className="space-y-6">
  {/* Two-column layout for short fields */}
  <div className="grid lg:grid-cols-2 gap-6">
    <FormField label="Name" />
    <FormField label="Email" />
  </div>
  <div className="grid lg:grid-cols-2 gap-6">
    <FormField label="Phone" />
    <FormField label="Company" />
  </div>
  {/* Full-width for textarea */}
  <FormField label="Message" type="textarea" rows={6} />
  <Button type="submit" size="lg">
    Send Message
  </Button>
</form>
```

---

### 3.6 Footer

```tsx
<footer className="bg-gray-900 text-white py-12 lg:py-16">
  <Container>
    {/* Mobile: Stacked columns, Desktop: 4 columns */}
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-8
      lg:gap-12
      mb-8
    ">
      <FooterColumn title="Company" links={companyLinks} />
      <FooterColumn title="Services" links={serviceLinks} />
      <FooterColumn title="Resources" links={resourceLinks} />
      <FooterColumn title="Connect">
        <SocialLinks />
      </FooterColumn>
    </div>

    {/* Footer bottom: Stack on mobile, flex on desktop */}
    <div className="
      flex
      flex-col
      md:flex-row
      md:justify-between
      items-center
      gap-4
      pt-8
      border-t border-gray-700
    ">
      <Copyright />
      <LegalLinks />
    </div>
  </Container>
</footer>
```

---

## 4. Typography Responsive Scale

### 4.1 Heading Scale

```tsx
// H1 - Hero heading
className="
  text-4xl      /* Mobile: 36px */
  sm:text-5xl   /* Small: 48px */
  lg:text-6xl   /* Desktop: 60px */
  xl:text-7xl   /* Large: 72px */
  font-extrabold
  leading-tight
"

// H2 - Section heading
className="
  text-3xl      /* Mobile: 30px */
  md:text-4xl   /* Tablet: 36px */
  lg:text-5xl   /* Desktop: 48px */
  font-bold
"

// H3 - Subsection heading
className="
  text-2xl      /* Mobile: 24px */
  md:text-3xl   /* Tablet: 30px */
  font-semibold
"

// H4 - Card heading
className="
  text-xl       /* Mobile: 20px */
  md:text-2xl   /* Tablet: 24px */
  font-semibold
"
```

---

### 4.2 Body Text Scale

```tsx
// Lead paragraph
className="
  text-lg       /* Mobile: 18px */
  md:text-xl    /* Tablet: 20px */
  leading-relaxed
"

// Body text
className="
  text-base     /* Mobile/Desktop: 16px */
  leading-relaxed
"

// Small text / captions
className="
  text-sm       /* Mobile: 14px */
  md:text-base  /* Desktop: 16px */
"
```

---

## 5. Spacing Responsive Scale

### 5.1 Section Padding

```tsx
// Top/bottom padding for sections
className="
  py-12        /* Mobile: 48px */
  md:py-16     /* Tablet: 64px */
  lg:py-20     /* Desktop: 80px */
  xl:py-24     /* Large: 96px */
"

// Horizontal padding
className="
  px-4         /* Mobile: 16px */
  sm:px-6      /* Small: 24px */
  lg:px-8      /* Desktop: 32px */
"
```

---

### 5.2 Gap Spacing

```tsx
// Grid/flex gap
className="
  gap-4        /* Mobile: 16px */
  md:gap-6     /* Tablet: 24px */
  lg:gap-8     /* Desktop: 32px */
"

// Vertical spacing between elements
className="
  space-y-4    /* Mobile: 16px */
  md:space-y-6 /* Tablet: 24px */
  lg:space-y-8 /* Desktop: 32px */
"
```

---

## 6. Image & Media Responsive Strategy

### 6.1 Next.js Image Component

```tsx
import Image from 'next/image'

// Responsive image with sizes attribute
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         1200px"
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="..."
/>
```

---

### 6.2 Responsive Background Images

```tsx
// CSS approach
<div className="
  bg-cover
  bg-center
  h-64           /* Mobile: 256px */
  md:h-96        /* Tablet: 384px */
  lg:h-screen    /* Desktop: Full viewport height */
"
style={{
  backgroundImage: `url('/hero-bg.jpg')`
}}
/>

// Picture element for art direction
<picture>
  <source
    media="(min-width: 1024px)"
    srcSet="/hero-desktop.jpg"
  />
  <source
    media="(min-width: 640px)"
    srcSet="/hero-tablet.jpg"
  />
  <img src="/hero-mobile.jpg" alt="Hero" />
</picture>
```

---

### 6.3 Video Background

```tsx
// Hide video on mobile, show on desktop
<div className="relative h-screen overflow-hidden">
  {/* Desktop video background */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="
      hidden
      lg:block
      absolute
      inset-0
      w-full
      h-full
      object-cover
    "
  >
    <source src="/hero-video.mp4" type="video/mp4" />
  </video>

  {/* Mobile fallback image */}
  <div className="
    lg:hidden
    absolute
    inset-0
    bg-cover
    bg-center
  "
  style={{ backgroundImage: "url('/hero-fallback.jpg')" }}
  />

  {/* Content overlay */}
  <div className="relative z-10">
    {/* Hero content */}
  </div>
</div>
```

---

## 7. Touch & Interaction Responsive Behavior

### 7.1 Touch Targets

```tsx
// Minimum touch target size: 44x44px
<button className="
  min-h-[44px]
  min-w-[44px]
  px-4
  py-2
  touch-manipulation /* Disable double-tap zoom */
">
  Click Me
</button>
```

---

### 7.2 Hover States

```tsx
// Hover only on devices that support it (desktop)
<div className="
  transition-transform
  md:hover:scale-105  /* Only scale on hover-capable devices */
  md:hover:shadow-xl
">
  Card content
</div>

// Alternative: Use media query
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: scale(1.05);
  }
}
```

---

### 7.3 Scrollable Containers

```tsx
// Horizontal scroll on mobile
<div className="
  flex
  overflow-x-auto
  gap-4
  pb-4
  snap-x
  snap-mandatory
  scrollbar-hide
  md:grid
  md:grid-cols-3
  md:overflow-visible
">
  {items.map(item => (
    <div className="
      flex-shrink-0
      w-80
      snap-start
      md:w-auto
    ">
      {item}
    </div>
  ))}
</div>
```

**Custom scrollbar hiding**:
```css
/* tailwind.config.js - Add plugin */
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

---

## 8. Performance Optimization by Breakpoint

### 8.1 Lazy Loading Components

```tsx
import dynamic from 'next/dynamic'

// Load heavy components only on desktop
const AIVisualization = dynamic(
  () => import('@/components/AIVisualization'),
  {
    ssr: false,
    loading: () => <Skeleton height={400} />
  }
)

export const HeroSection = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section>
      {isDesktop ? (
        <AIVisualization />
      ) : (
        <StaticImage src="/ai-static.jpg" alt="AI" />
      )}
    </section>
  )
}
```

---

### 8.2 Conditional Loading

```tsx
// Load different content based on screen size
const useResponsiveContent = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')

  return {
    projectsToShow: isMobile ? 6 : 12,
    enableAnimations: !isMobile,
    imageQuality: isMobile ? 'medium' : 'high',
  }
}
```

---

### 8.3 Font Loading Strategy

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-inter',
  // Preload only essential weights
  preload: true,
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

---

## 9. Testing Responsive Design

### 9.1 Responsive Breakpoint Testing

**Manual Testing Checklist**:
- [ ] iPhone SE (375px) - Smallest mobile
- [ ] iPhone 14 Pro (393px) - Standard mobile
- [ ] iPad Mini (768px) - Small tablet
- [ ] iPad Pro (1024px) - Large tablet
- [ ] MacBook (1280px) - Standard laptop
- [ ] Desktop (1920px) - Standard desktop
- [ ] 4K (2560px+) - Large desktop

**Automated Testing**:
```typescript
// tests/responsive.test.tsx
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/Header'

describe('Header - Responsive', () => {
  it('shows mobile menu on small screens', () => {
    // Mock viewport
    global.innerWidth = 375
    render(<Header />)
    expect(screen.getByLabelText('Mobile menu')).toBeVisible()
  })

  it('shows desktop nav on large screens', () => {
    global.innerWidth = 1024
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeVisible()
  })
})
```

---

### 9.2 Responsive Utilities

```typescript
// hooks/useMediaQuery.ts
import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Usage
const isMobile = useMediaQuery('(max-width: 767px)')
const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
const isDesktop = useMediaQuery('(min-width: 1024px)')
```

---

## 10. Responsive Design Checklist

### Pre-Launch Checklist

**Layout & Structure**:
- [ ] All pages tested at all breakpoints
- [ ] No horizontal scrolling on any device
- [ ] Content readable without zooming
- [ ] Navigation accessible on all devices
- [ ] Forms functional on mobile
- [ ] Tables responsive or scrollable
- [ ] Modals/overlays work on mobile

**Typography**:
- [ ] Text sizes appropriate for each breakpoint
- [ ] Line lengths optimal (45-75 characters)
- [ ] Headings scale properly
- [ ] Text remains readable on all screens

**Images & Media**:
- [ ] Images responsive and optimized
- [ ] Videos work on mobile
- [ ] Proper aspect ratios maintained
- [ ] Lazy loading implemented
- [ ] Appropriate image sizes served

**Touch & Interaction**:
- [ ] Touch targets minimum 44x44px
- [ ] Hover states don't break mobile
- [ ] Swipe/scroll gestures work
- [ ] No reliance on hover for critical info
- [ ] Buttons easy to tap

**Performance**:
- [ ] Fast load times on mobile (< 3s)
- [ ] Core Web Vitals pass on mobile
- [ ] Appropriate code splitting
- [ ] Mobile-specific optimizations
- [ ] Reduced motion respected

**Accessibility**:
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Focus states visible
- [ ] ARIA labels where needed

---

## 11. Common Responsive Patterns

### 11.1 Sidebar Layout

```tsx
// Mobile: Sidebar below content
// Desktop: Sidebar beside content

<div className="
  flex
  flex-col
  lg:flex-row
  gap-8
">
  {/* Main content - full width mobile, 2/3 desktop */}
  <main className="lg:w-2/3 lg:order-1">
    {content}
  </main>

  {/* Sidebar - full width mobile, 1/3 desktop */}
  <aside className="lg:w-1/3 lg:order-2">
    {sidebar}
  </aside>
</div>
```

---

### 11.2 Card Layouts

```tsx
// 1 column mobile → 2 tablet → 3 desktop → 4 large

<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-4
  md:gap-6
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

---

### 11.3 Hero Splits

```tsx
// Stacked mobile → Side-by-side desktop

<section className="
  grid
  lg:grid-cols-2
  gap-8
  lg:gap-12
  items-center
">
  <div className="order-2 lg:order-1">
    {/* Text content */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Image/visual */}
  </div>
</section>
```

---

### 11.4 Navigation Patterns

```tsx
// Hamburger mobile → Horizontal desktop

<nav>
  {/* Mobile hamburger */}
  <button className="lg:hidden">☰</button>

  {/* Desktop links */}
  <ul className="
    hidden
    lg:flex
    lg:items-center
    lg:gap-6
  ">
    <li><Link href="/">Home</Link></li>
    <li><Link href="/services">Services</Link></li>
    <li><Link href="/portfolio">Portfolio</Link></li>
  </ul>
</nav>
```

---

## Summary

This responsive strategy ensures:

✅ **Mobile-First Design**: Optimized for smallest screens first
✅ **Fluid Layouts**: Adapt smoothly across all breakpoints
✅ **Touch-Friendly**: Appropriate tap targets and interactions
✅ **Performance**: Optimized loading for each device
✅ **Accessibility**: Works for all users on all devices
✅ **Consistent Experience**: Brand identity maintained across screens
✅ **Future-Proof**: Scalable system for new devices

**Key Principles**:
1. Design mobile → scale up (not desktop → scale down)
2. Test on real devices, not just browser resize
3. Optimize images and assets per breakpoint
4. Consider touch vs. mouse interactions
5. Maintain accessibility at all sizes
6. Monitor Core Web Vitals on mobile
7. Use progressive enhancement
