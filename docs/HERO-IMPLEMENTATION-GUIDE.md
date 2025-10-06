# Hero Section: Implementation Guide

## Quick Reference

This guide provides practical implementation details, code snippets, and best practices for the minimalist hero section design.

---

## Table of Contents

1. [Component Structure](#component-structure)
2. [Responsive Sizing](#responsive-sizing)
3. [Animation Implementation](#animation-implementation)
4. [Accessibility](#accessibility)
5. [Performance Optimization](#performance-optimization)
6. [Testing Checklist](#testing-checklist)
7. [Troubleshooting](#troubleshooting)

---

## 1. Component Structure

### Current Implementation (Simplified)

```tsx
// /Users/ai.place/WEbsite/src/components/sections/hero.tsx
export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background */}
      <BackgroundEffects />

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <Tagline />
          <CTAButtons />
        </div>
      </div>
    </section>
  )
}
```

### Recommended Modular Structure

```tsx
// hero/Hero.tsx
import { HeroBackground } from './HeroBackground'
import { HeroLogo } from './HeroLogo'
import { HeroTagline } from './HeroTagline'
import { HeroCTA } from './HeroCTA'

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      aria-label="Hero section"
    >
      <HeroBackground />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center space-y-12 sm:space-y-16 md:space-y-20">
          <HeroLogo />
          <HeroTagline />
          <HeroCTA />
        </div>
      </div>
    </section>
  )
}
```

---

## 2. Responsive Sizing

### Logo Sizing Formula

```tsx
// hero/HeroLogo.tsx
export function HeroLogo() {
  return (
    <div className="relative animate-fade-in-scale">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-400/20 via-brand-purple-400/20 to-brand-blue-400/20 blur-3xl opacity-60 animate-pulse-glow" />

      {/* Logo with responsive sizing */}
      <div className="relative group cursor-default">
        <Image
          src="/images/logo.png"
          alt="AiPlace - Where Creativity Meets AI"
          width={2000}
          height={520}
          priority
          quality={95}
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 55vw, 900px"
          className={cn(
            // Base sizing
            "w-[60vw] h-auto object-contain",
            // Responsive sizing
            "sm:w-[55vw] md:w-[50vw] lg:w-[900px] xl:w-[1000px]",
            // Effects
            "drop-shadow-2xl",
            // Hover animation
            "transition-transform duration-500 ease-out",
            "group-hover:scale-[1.02]"
          )}
        />
      </div>
    </div>
  )
}
```

### Spacing System

```tsx
// Spacing constants (8px grid)
const spacing = {
  mobile: {
    vertical: 'py-20',      // 80px
    logoToTagline: 'mb-12', // 48px
    taglineToCTA: 'mb-10',  // 40px
  },
  tablet: {
    vertical: 'sm:py-30',      // 120px
    logoToTagline: 'sm:mb-16', // 64px
    taglineToCTA: 'sm:mb-12',  // 48px
  },
  desktop: {
    vertical: 'lg:py-40',      // 160px
    logoToTagline: 'lg:mb-20', // 80px
    taglineToCTA: 'lg:mb-16',  // 64px
  },
}

// Usage
<div className={cn(
  "flex flex-col items-center",
  spacing.mobile.vertical,
  spacing.tablet.vertical,
  spacing.desktop.vertical
)}>
  <HeroLogo className={cn(
    spacing.mobile.logoToTagline,
    spacing.tablet.logoToTagline,
    spacing.desktop.logoToTagline
  )} />
  <HeroTagline className={cn(
    spacing.mobile.taglineToCTA,
    spacing.tablet.taglineToCTA,
    spacing.desktop.taglineToCTA
  )} />
  <HeroCTA />
</div>
```

### Breakpoint Reference

```typescript
// tailwind.config.ts breakpoints
const breakpoints = {
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
}

// Logo size calculations
const logoSizes = {
  mobile: '60vw',    // ~350px on iPhone 12/13/14
  tablet: '55vw',    // ~420px on iPad
  laptop: '50vw',    // ~512px on MacBook
  desktop: '900px',  // Fixed size
  xl: '1000px',      // Large screens
}
```

---

## 3. Animation Implementation

### Custom Animations (globals.css)

```css
/* Logo entrance - elegant fade with scale */
@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(20px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0);
  }
}

/* Tagline entrance - subtle slide up */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating orbs - very slow, subtle */
@keyframes float-slow {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(10px, -20px);
  }
}

@keyframes float-slower {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-15px, 20px);
  }
}

/* Glow pulse - very subtle */
@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}
```

### Animation Classes

```css
/* Apply animations */
.animate-fade-in-scale {
  animation: fade-in-scale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  /* Start invisible */
  opacity: 0;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 10s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 4s ease-in-out infinite;
}
```

### Staggered Animation Component

```tsx
// hero/AnimatedElement.tsx
interface AnimatedElementProps {
  children: React.ReactNode
  delay?: number // in seconds
  className?: string
}

export function AnimatedElement({ children, delay = 0, className }: AnimatedElementProps) {
  return (
    <div
      className={cn("animate-fade-in-up opacity-0", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

// Usage
<AnimatedElement delay={0}>
  <HeroLogo />
</AnimatedElement>
<AnimatedElement delay={0.3}>
  <HeroTagline />
</AnimatedElement>
<AnimatedElement delay={0.5}>
  <HeroCTA />
</AnimatedElement>
```

---

## 4. Accessibility

### ARIA Labels and Semantic HTML

```tsx
export function Hero() {
  return (
    <section
      aria-label="Hero section with AiPlace branding"
      className="relative min-h-screen flex items-center justify-center"
    >
      <HeroBackground aria-hidden="true" />

      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center">
          {/* Logo with descriptive alt */}
          <div role="img" aria-label="AiPlace logo - Where Creativity Meets AI">
            <HeroLogo />
          </div>

          {/* Tagline as h1 for SEO */}
          <h1 className="text-xl md:text-2xl text-slate-700 font-light">
            {t("hero.tagline")}
          </h1>

          {/* CTA group */}
          <div role="group" aria-label="Call to action buttons">
            <HeroCTA />
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Focus States

```tsx
// hero/HeroCTA.tsx
export function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        size="lg"
        className={cn(
          "h-14 px-8 text-base font-medium",
          "bg-gradient-to-r from-brand-pink-600 via-brand-purple-600 to-brand-blue-600",
          "hover:from-brand-pink-700 hover:via-brand-purple-700 hover:to-brand-blue-700",
          "text-white rounded-full",
          "shadow-xl hover:shadow-2xl",
          "transition-all duration-300 hover:scale-105",
          // Focus state for keyboard navigation
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple-400/50",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        )}
      >
        {t("hero.getStarted")}
      </Button>

      <Button
        size="lg"
        variant="outline"
        className={cn(
          "h-14 px-8 text-base font-medium",
          "bg-white/80 backdrop-blur-sm hover:bg-white",
          "border-2 border-slate-300 hover:border-brand-purple-400",
          "text-slate-700 hover:text-brand-purple-700",
          "rounded-full shadow-lg hover:shadow-xl",
          "transition-all duration-300 hover:scale-105",
          // Focus state
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple-400/50",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        )}
      >
        {t("hero.learnMore")}
      </Button>
    </div>
  )
}
```

### Reduced Motion Support

```css
/* globals.css or hero.module.css */
@media (prefers-reduced-motion: reduce) {
  .hero-section * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Ensure elements are visible immediately */
  .animate-fade-in-scale,
  .animate-fade-in-up {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    animation: none !important;
  }

  /* Disable floating orbs */
  .animate-float-slow,
  .animate-float-slower,
  .animate-pulse-glow {
    animation: none !important;
    opacity: 0.3 !important;
  }
}
```

### Keyboard Navigation Test

```typescript
// hero/__tests__/Hero.a11y.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Hero } from '../Hero'

describe('Hero Accessibility', () => {
  it('should be keyboard navigable', async () => {
    render(<Hero />)
    const user = userEvent.setup()

    // Tab through elements
    await user.tab()
    expect(screen.getByText('Get Started')).toHaveFocus()

    await user.tab()
    expect(screen.getByText('Learn More')).toHaveFocus()
  })

  it('should have proper ARIA labels', () => {
    render(<Hero />)

    expect(screen.getByLabelText(/hero section/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/aiplace logo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/call to action/i)).toBeInTheDocument()
  })

  it('should respect reduced motion preference', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
    }))

    render(<Hero />)

    const logo = screen.getByAltText(/aiplace/i)
    expect(logo).toHaveStyle({ animation: 'none' })
  })
})
```

---

## 5. Performance Optimization

### Image Optimization

```tsx
// Optimal Next.js Image configuration
<Image
  src="/images/logo.png"
  alt="AiPlace - Where Creativity Meets AI"
  width={2000}
  height={520}
  priority // Load immediately (LCP)
  quality={95} // High quality for hero
  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 55vw, 900px"
  placeholder="blur" // If you have a blurDataURL
  blurDataURL={logoBlurDataURL}
  className="..."
  // Optimize loading
  loading="eager" // Don't lazy load hero image
  fetchPriority="high" // Browser hint
/>
```

### Image Format Optimization

```bash
# Convert PNG to WebP for better compression
npm install sharp

# Create optimized versions
npx sharp -i public/images/logo.png \
  -o public/images/logo.webp \
  --webp-quality 95

# Create blur placeholder
npx sharp -i public/images/logo.png \
  -o public/images/logo-blur.webp \
  --webp-quality 10 \
  --resize 40
```

```tsx
// Use WebP with PNG fallback
import { useState } from 'react'

export function HeroLogo() {
  const [imgSrc, setImgSrc] = useState('/images/logo.webp')

  return (
    <Image
      src={imgSrc}
      onError={() => setImgSrc('/images/logo.png')} // Fallback
      alt="AiPlace - Where Creativity Meets AI"
      {...props}
    />
  )
}
```

### CSS Performance

```css
/* Use GPU-accelerated properties */
.logo-container {
  /* Good: GPU accelerated */
  transform: translateZ(0);
  will-change: transform, opacity;

  /* Avoid: Forces repaint */
  /* width, height, top, left */
}

/* Optimize animations */
.animate-logo {
  /* Only animate transform and opacity */
  animation: logo-entrance 1.2s ease-out forwards;

  /* Remove will-change after animation */
  animation-fill-mode: forwards;
}

@keyframes logo-entrance {
  from {
    transform: scale(0.92) translateY(20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
```

### Loading Performance

```tsx
// hero/Hero.tsx with performance monitoring
import { useEffect } from 'react'

export function Hero() {
  useEffect(() => {
    // Monitor LCP
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
            // Send to analytics
          }
        }
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })

      return () => observer.disconnect()
    }
  }, [])

  return <section>{/* ... */}</section>
}
```

### Preload Critical Resources

```tsx
// app/layout.tsx or pages/_document.tsx
export default function RootLayout() {
  return (
    <html>
      <head>
        {/* Preload hero logo */}
        <link
          rel="preload"
          as="image"
          href="/images/logo.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/logo.png"
          type="image/png"
        />
      </head>
      <body>{/* ... */}</body>
    </html>
  )
}
```

---

## 6. Testing Checklist

### Visual Testing

```markdown
- [ ] Logo is the dominant element on all screen sizes
- [ ] Logo maintains aspect ratio at all breakpoints
- [ ] Spacing is consistent with 8px grid system
- [ ] Animations are smooth (60fps)
- [ ] Hover effects work on desktop
- [ ] No layout shift during page load
- [ ] Colors match design tokens
- [ ] Typography is crisp and readable
- [ ] Background effects are subtle
- [ ] Elements are perfectly centered
```

### Responsive Testing

```markdown
Mobile (< 640px):
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 12/13/14 Pro Max (428px)
- [ ] iPhone SE (375px)
- [ ] Samsung Galaxy S21 (360px)

Tablet (640px - 1024px):
- [ ] iPad Mini (768px)
- [ ] iPad Air (820px)
- [ ] iPad Pro (1024px)

Desktop (> 1024px):
- [ ] MacBook Air (1280px)
- [ ] MacBook Pro 14" (1512px)
- [ ] MacBook Pro 16" (1728px)
- [ ] iMac 24" (1920px)
- [ ] 4K Display (2560px)
```

### Performance Testing

```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 \
  --only-categories=performance \
  --output=html \
  --output-path=./lighthouse-report.html

# Expected scores:
# - Performance: > 90
# - LCP: < 2.5s
# - CLS: < 0.1
# - FID: < 100ms
```

### Accessibility Testing

```bash
# axe DevTools
npm install -D @axe-core/cli

# Run accessibility audit
npx axe http://localhost:3000

# Expected: 0 violations
```

### Cross-Browser Testing

```markdown
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)
```

---

## 7. Troubleshooting

### Issue: Logo appears blurry

**Cause**: Image resolution too low for large display sizes

**Solution**:
```tsx
// Use high-resolution source
<Image
  src="/images/logo.png"
  width={2000} // 2x resolution
  height={520}
  quality={95} // Increase quality
/>
```

### Issue: Animation janky on mobile

**Cause**: Too many simultaneous animations

**Solution**:
```tsx
// Reduce animations on mobile
const isMobile = useMediaQuery('(max-width: 640px)')

<div className={cn(
  !isMobile && "animate-float-slow"
)}>
```

### Issue: Layout shift during logo load

**Cause**: Missing width/height or improper aspect ratio

**Solution**:
```tsx
// Add explicit dimensions
<div className="w-[60vw] aspect-[1200/312]">
  <Image
    src="/images/logo.png"
    width={1200}
    height={312}
    className="w-full h-full"
  />
</div>
```

### Issue: Focus outline not visible

**Cause**: Custom styling removing outline

**Solution**:
```tsx
<Button className={cn(
  // Always use focus-visible, never remove outline completely
  "focus-visible:outline-none",
  "focus-visible:ring-4 focus-visible:ring-brand-purple-400/50"
)}>
```

### Issue: Animation doesn't work in Safari

**Cause**: Missing `-webkit-` prefix

**Solution**:
```css
@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.92);
    -webkit-transform: scale(0.92); /* Safari */
    filter: blur(8px);
    -webkit-filter: blur(8px); /* Safari */
  }
}
```

### Issue: Logo not centered on some devices

**Cause**: Inconsistent flex behavior

**Solution**:
```tsx
<div className="flex flex-col items-center justify-center">
  {/* Use both items-center AND justify-center */}
  {/* Add text-center for inline elements */}
  <div className="text-center">
    <HeroLogo />
  </div>
</div>
```

---

## 8. Code Snippets

### Complete Hero Component Example

```tsx
// hero/Hero.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/lib/i18n/hooks'
import { cn } from '@/lib/utils'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      aria-label="Hero section"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-brand-pink-200/10 to-brand-purple-200/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-brand-blue-200/10 to-brand-cyan-200/10 blur-3xl animate-float-slower" />
      </div>

      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),rgba(255,255,255,1))] pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col items-center text-center space-y-12 sm:space-y-16 md:space-y-20">

          {/* Logo */}
          <div className="relative animate-fade-in-scale" role="img" aria-label="AiPlace logo">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-400/20 via-brand-purple-400/20 to-brand-blue-400/20 blur-3xl opacity-60 animate-pulse-glow" />

            <div className="relative group cursor-default">
              <Image
                src="/images/logo.png"
                alt="AiPlace - Where Creativity Meets AI"
                width={2000}
                height={520}
                priority
                quality={95}
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 55vw, 900px"
                className="relative w-[60vw] sm:w-[55vw] md:w-[50vw] lg:w-[900px] xl:w-[1000px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Tagline */}
          <h1
            className="text-lg sm:text-xl md:text-2xl text-slate-700 font-light tracking-wide max-w-2xl animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.3s' }}
          >
            {t("hero.description")}
          </h1>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.5s' }}
            role="group"
            aria-label="Call to action buttons"
          >
            <Button
              size="lg"
              className={cn(
                "group h-14 px-8 text-base font-medium",
                "bg-gradient-to-r from-brand-pink-600 via-brand-purple-600 to-brand-blue-600",
                "hover:from-brand-pink-700 hover:via-brand-purple-700 hover:to-brand-blue-700",
                "text-white rounded-full shadow-xl hover:shadow-2xl",
                "transition-all duration-300 hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple-400/50"
              )}
            >
              {t("hero.getStarted")}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className={cn(
                "h-14 px-8 text-base font-medium",
                "bg-white/80 backdrop-blur-sm hover:bg-white",
                "border-2 border-slate-300 hover:border-brand-purple-400",
                "text-slate-700 hover:text-brand-purple-700",
                "rounded-full shadow-lg hover:shadow-xl",
                "transition-all duration-300 hover:scale-105",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-purple-400/50"
              )}
            >
              {t("hero.learnMore")}
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
```

---

## 9. Next Steps

### Immediate Actions
1. Run Lighthouse audit
2. Test on real devices
3. Gather user feedback
4. Monitor analytics

### Future Enhancements
1. A/B test logo sizes
2. Add microinteractions
3. Implement dark mode variant
4. Add video background option

### Maintenance
1. Update logo if rebranded
2. Monitor Core Web Vitals
3. Update animations based on trends
4. Optimize images quarterly

---

## Support and Resources

### Documentation
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebPageTest](https://www.webpagetest.org/)

### Community
- GitHub Issues: Report bugs and request features
- Design System Discussions: Share feedback

---

**Last Updated**: 2025-10-06
**Version**: 1.0.0
