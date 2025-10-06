# AiPlace Responsive Design Guidelines

## Table of Contents
1. [Breakpoint Strategy](#breakpoint-strategy)
2. [Mobile-First CSS Patterns](#mobile-first-css-patterns)
3. [Touch-Friendly UI Guidelines](#touch-friendly-ui-guidelines)
4. [Performance Optimization](#performance-optimization)
5. [Responsive Images Strategy](#responsive-images-strategy)
6. [Mobile Navigation Patterns](#mobile-navigation-patterns)

---

## 1. Breakpoint Strategy

### Breakpoint System

Based on the AiPlace specification, we use a 4-tier responsive system optimized for modern devices:

```css
/* Mobile-first breakpoints */
--breakpoint-sm: 640px;   /* Small tablets, large phones */
--breakpoint-md: 768px;   /* Tablets, small laptops */
--breakpoint-lg: 1024px;  /* Laptops, desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1920px; /* Ultra-wide displays */
```

### Device Targeting

| Device | Width Range | Layout Strategy |
|--------|-------------|-----------------|
| **Mobile** | 320px - 767px | Single column, stacked, touch-first |
| **Tablet** | 768px - 1023px | 2-column grid, simplified nav |
| **Laptop** | 1024px - 1279px | 3-4 column grid, full nav |
| **Desktop** | 1280px - 1919px | Full features, optimized spacing |
| **Ultra-wide** | 1920px+ | Max-width container, enhanced visuals |

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1920px',
    },
    extend: {
      // AiPlace brand colors
      colors: {
        primary: {
          DEFAULT: '#6366f1', // Indigo
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        accent: {
          DEFAULT: '#8b5cf6', // Purple
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      // Responsive spacing scale
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      }
    }
  }
}
```

---

## 2. Mobile-First CSS Patterns

### Core Principle
Always start with mobile styles and enhance for larger screens using `min-width` media queries.

### Layout Patterns

#### Container System
```css
/* Mobile-first container */
.container {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (min-width: 1920px) {
  .container {
    max-width: 1536px;
  }
}
```

#### Grid System
```css
/* Services Grid - Mobile First */
.services-grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(4, 1fr); /* Desktop: 4 columns */
    gap: 2rem;
  }
}
```

#### Typography Scale
```css
/* Mobile-first typography */
.hero-title {
  font-size: 2rem; /* 32px mobile */
  line-height: 1.2;
  font-weight: 700;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3rem; /* 48px tablet */
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 4rem; /* 64px desktop */
  }
}

@media (min-width: 1920px) {
  .hero-title {
    font-size: 5rem; /* 80px ultra-wide */
  }
}
```

### Tailwind Mobile-First Examples

```jsx
// Hero Section
<div className="
  px-4 py-12           // Mobile
  sm:px-6 sm:py-16     // Small tablets
  md:px-8 md:py-20     // Tablets
  lg:px-12 lg:py-24    // Laptops
  xl:px-16 xl:py-32    // Desktop
">
  <h1 className="
    text-3xl leading-tight    // Mobile
    sm:text-4xl               // Small tablets
    md:text-5xl               // Tablets
    lg:text-6xl               // Laptops
    xl:text-7xl               // Desktop
    font-bold
  ">
    Your Partner in Digital Innovation
  </h1>
</div>

// Service Cards
<div className="
  grid grid-cols-1     // Mobile: 1 column
  sm:grid-cols-2       // Small tablets: 2 columns
  lg:grid-cols-4       // Desktop: 4 columns
  gap-4 sm:gap-6 lg:gap-8
">
  {services.map(service => (
    <ServiceCard key={service.id} {...service} />
  ))}
</div>
```

---

## 3. Touch-Friendly UI Guidelines

### Minimum Touch Target Sizes

Based on Apple and Google guidelines:

```css
/* Minimum touch targets */
--touch-target-min: 44px;  /* iOS minimum */
--touch-target-ideal: 48px; /* Material Design */
--touch-spacing-min: 8px;   /* Minimum spacing between targets */
```

### Button Guidelines

```css
/* Touch-optimized buttons */
.btn {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 24px;
  font-size: 16px; /* Prevents iOS zoom on focus */
  border-radius: 8px;

  /* Touch feedback */
  -webkit-tap-highlight-color: rgba(99, 102, 241, 0.2);
  touch-action: manipulation;
  user-select: none;
}

/* Primary CTA */
.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-primary:active {
  transform: scale(0.97);
}

/* Secondary button */
.btn-secondary {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
}

@media (min-width: 1024px) {
  .btn {
    min-height: 44px; /* Slightly smaller on desktop with mouse */
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
  }
}
```

### Form Input Guidelines

```css
/* Touch-optimized form inputs */
.form-input {
  min-height: 48px;
  font-size: 16px; /* Prevents iOS zoom */
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Textarea specific */
.form-textarea {
  min-height: 120px;
  resize: vertical;
}

/* Select/Dropdown */
.form-select {
  min-height: 48px;
  appearance: none;
  background-image: url("data:image/svg+xml,...");
  background-position: right 12px center;
  background-repeat: no-repeat;
  padding-right: 40px;
}
```

### Touch Gesture Patterns

```jsx
// Swipeable Portfolio Cards
import { motion } from 'framer-motion';

const PortfolioCard = () => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      dragElastic={0.1}
      whileTap={{ scale: 0.98 }}
      className="touch-none select-none"
    >
      {/* Card content */}
    </motion.div>
  );
};
```

### Interactive Element Spacing

```css
/* Ensure adequate spacing between interactive elements */
.nav-links {
  display: flex;
  gap: 12px; /* Minimum 8px, ideal 12px */
}

@media (max-width: 767px) {
  .nav-links {
    flex-direction: column;
    gap: 0;
  }

  .nav-links a {
    padding: 16px 24px; /* Full-width touch targets */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
```

---

## 4. Performance Optimization for Mobile

### Loading Strategy

#### Critical CSS Inlining
```html
<!-- Inline critical above-the-fold styles -->
<style>
  /* Hero section styles - inline for instant render */
  .hero { /* ... */ }
  .nav { /* ... */ }
</style>

<!-- Async load non-critical CSS -->
<link rel="preload" href="/styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

#### Code Splitting Strategy
```javascript
// app/layout.tsx
import dynamic from 'next/dynamic';

// Lazy load non-critical components
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
  loading: () => <div>Loading chat...</div>
});

const AnimatedBackground = dynamic(
  () => import('@/components/AnimatedBackground'),
  { ssr: false }
);
```

### Image Optimization

```jsx
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};
```

### Font Loading Strategy

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Fallback font stack */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
               Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-display: swap;
}
```

### JavaScript Optimization

```javascript
// Debounce scroll events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Use Intersection Observer for lazy loading
const observerOptions = {
  rootMargin: '50px 0px',
  threshold: 0.01
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load content
      loadContent(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
```

### Service Worker for Offline Support

```javascript
// public/sw.js
const CACHE_NAME = 'aiplace-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

---

## 5. Responsive Images Strategy

### Next.js Image Component Usage

```jsx
import Image from 'next/image';

// Hero Background
<div className="relative w-full h-screen">
  <Image
    src="/images/hero-bg.jpg"
    alt="AiPlace Hero Background"
    fill
    priority
    quality={90}
    sizes="100vw"
    className="object-cover"
  />
</div>

// Service Icons
<Image
  src="/icons/ai-brain.svg"
  alt="AI Solutions"
  width={64}
  height={64}
  className="w-12 h-12 md:w-16 md:h-16"
/>

// Portfolio Images
<Image
  src={project.imageUrl}
  alt={project.title}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="rounded-lg"
  loading="lazy"
/>
```

### Responsive Image Sizes

```jsx
// Service card images
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

// Portfolio grid
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"

// Blog featured images
sizes="(max-width: 768px) 100vw, 800px"

// Team member avatars
sizes="(max-width: 768px) 80px, 120px"
```

### Art Direction with Picture Element

```jsx
const ResponsiveHero = () => {
  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet="/images/hero-mobile.jpg"
      />
      <source
        media="(max-width: 1023px)"
        srcSet="/images/hero-tablet.jpg"
      />
      <source
        media="(min-width: 1024px)"
        srcSet="/images/hero-desktop.jpg"
      />
      <img
        src="/images/hero-desktop.jpg"
        alt="AiPlace Hero"
        className="w-full h-full object-cover"
      />
    </picture>
  );
};
```

### SVG Optimization

```jsx
// Use inline SVG for icons with color customization
const CodeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M8 18L2 12L8 6" stroke="currentColor" strokeWidth="2" />
    <path d="M16 6L22 12L16 18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Usage
<CodeIcon className="w-6 h-6 text-primary-500" />
```

### Background Images

```css
/* Responsive background images */
.hero-section {
  background-image: url('/images/hero-mobile.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero-section {
    background-image: url('/images/hero-tablet.jpg');
  }
}

@media (min-width: 1920px) {
  .hero-section {
    background-image: url('/images/hero-desktop.jpg');
  }
}

/* Or use CSS image-set */
.portfolio-card {
  background-image: image-set(
    url('/images/project.jpg') 1x,
    url('/images/project@2x.jpg') 2x
  );
}
```

---

## 6. Mobile Navigation Patterns

### Hamburger Menu Implementation

```jsx
// components/Navigation/MobileNav.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-primary-400 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Menu Panel */}
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-gray-900 z-50 p-6 overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-white"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Logo */}
              <div className="mb-12 mt-4">
                <span className="text-2xl font-bold text-white">
                  Ai<span className="text-primary-500">Place</span>
                </span>
              </div>

              {/* Navigation Links */}
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 text-lg text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                initial="closed"
                animate="open"
                className="mt-8"
              >
                <a
                  href="/contact"
                  className="block w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center rounded-lg font-medium hover:shadow-lg transition-shadow"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </a>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### Bottom Navigation (Alternative Pattern)

```jsx
// components/Navigation/BottomNav.tsx
'use client';

import { Home, Briefcase, FolderOpen, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/services', icon: Briefcase, label: 'Services' },
    { href: '/portfolio', icon: FolderOpen, label: 'Portfolio' },
    { href: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-white/10 z-40 lg:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center flex-1 h-full space-y-1 transition-colors ${
                isActive
                  ? 'text-primary-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

### Sticky Header with Scroll Behavior

```jsx
// components/Navigation/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import MobileNav from './MobileNav';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Hide header on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Add background when scrolled
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="text-xl md:text-2xl font-bold text-white">
            Ai<span className="text-primary-500">Place</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['Services', 'Portfolio', 'About', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="/contact"
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              Get Started
            </a>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
```

### Swipeable Tab Navigation

```jsx
// components/Services/ServiceTabs.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, TrendingUp, Coins } from 'lucide-react';

const services = [
  { id: 'web', icon: Code, label: 'Web Dev' },
  { id: 'ai', icon: Brain, label: 'AI Solutions' },
  { id: 'business', icon: TrendingUp, label: 'Business' },
  { id: 'tokenomics', icon: Coins, label: 'Tokenomics' },
];

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState('web');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-white/10">
        {services.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === id
                ? 'text-primary-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {activeTab === id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Service content */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## Testing Checklist

### Device Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad Mini (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop (1920px)

### Orientation Testing
- [ ] Portrait mode
- [ ] Landscape mode
- [ ] Orientation change handling

### Touch Interactions
- [ ] All buttons min 48px
- [ ] Form inputs properly sized
- [ ] Swipe gestures work
- [ ] Scrolling smooth
- [ ] No accidental taps

### Performance
- [ ] Lighthouse score 90+
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Images properly optimized
- [ ] No layout shifts

### Accessibility
- [ ] Touch targets meet WCAG AA
- [ ] Font sizes readable
- [ ] Contrast ratios pass
- [ ] Focus states visible
- [ ] Screen reader compatible

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Framer Motion](https://www.framer.com/motion/)
- [Mobile Web Best Practices](https://developers.google.com/web/fundamentals)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design Guidelines](https://material.io/design)

---

**Version**: 1.0
**Last Updated**: October 2025
**Maintained by**: AiPlace Development Team
