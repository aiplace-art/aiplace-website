# AiPlace Website - Animation & Interaction Patterns

## Animation Philosophy

**Principles**:
1. **Purposeful**: Every animation serves a functional purpose
2. **Subtle**: Enhance, don't distract from content
3. **Performant**: 60fps, GPU-accelerated where possible
4. **Accessible**: Respect `prefers-reduced-motion`
5. **Brand-Aligned**: Reflect AiPlace's modern, creative AI identity

**Brand Animation Character**:
- Smooth, fluid movements (AI intelligence)
- Gradient transitions (brand colors)
- Tech-forward micro-interactions
- Particle/neural network effects (AI theme)
- Professional yet creative

---

## 1. Animation Categories

### 1.1 Entrance Animations
**Purpose**: Draw attention to content as it appears
**When**: Page load, scroll into view, route transitions

### 1.2 Exit Animations
**Purpose**: Smooth removal of elements
**When**: Modal close, navigation away, element removal

### 1.3 Micro-interactions
**Purpose**: Feedback for user actions
**When**: Button clicks, form interactions, hover states

### 1.4 Loading States
**Purpose**: Communicate system status
**When**: Data fetching, form submission, page transitions

### 1.5 Scroll Animations
**Purpose**: Progressive content reveal
**When**: Scrolling through long pages

### 1.6 Brand Animations
**Purpose**: Reinforce brand identity
**When**: Hero sections, logos, key brand moments

---

## 2. Entrance Animations

### 2.1 Fade In

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

**Usage**: Default entrance for most elements
**Duration**: 400-600ms
**Easing**: ease-out

---

### 2.2 Slide Up (Fade + Transform)

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.6s ease-out;
}
```

**Usage**: Text blocks, cards, sections
**Duration**: 500-700ms
**Easing**: ease-out or custom cubic-bezier(0.16, 1, 0.3, 1)

---

### 2.3 Scale In

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
```

**Usage**: Modal opens, emphasis elements, featured content
**Duration**: 400-600ms
**Easing**: Custom spring-like easing

---

### 2.4 Stagger Animation

```tsx
// Using Framer Motion
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((item, i) => (
    <motion.div key={i} variants={item}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

**Usage**: Lists, grids, navigation items
**Stagger Delay**: 50-100ms between items

---

### 2.5 Slide In From Direction

```css
/* Slide in from right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Slide in from left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Usage**: Side navigation, testimonial sliders, split sections
**Duration**: 500-700ms

---

## 3. Scroll-Triggered Animations

### 3.1 Intersection Observer Pattern

```typescript
// hooks/useInView.ts
import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useInView = (options: UseInViewOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isInView }
}
```

**Usage**:
```tsx
const AnimatedSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className={`
        transition-all duration-700
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      Content here
    </section>
  )
}
```

---

### 3.2 Parallax Scrolling

```tsx
// components/ParallaxSection.tsx
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

export const ParallaxSection = ({ children, speed = 0.5 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}
```

**Usage**:
```tsx
<ParallaxSection speed={0.3}>
  <Image src="/background.jpg" alt="Background" />
</ParallaxSection>
```

---

### 3.3 Scroll-Based Progress Indicator

```tsx
// components/ScrollProgress.tsx
import { useScroll, motion } from 'framer-motion'

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-magenta-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

---

## 4. Hover Interactions

### 4.1 Card Lift & Shadow

```css
.card-interactive {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

**Usage**: Project cards, service cards, clickable elements

---

### 4.2 Scale on Hover

```css
.button-scale {
  transition: transform 0.2s ease;
}

.button-scale:hover {
  transform: scale(1.05);
}

.button-scale:active {
  transform: scale(0.98);
}
```

**Usage**: Buttons, CTAs, interactive icons

---

### 4.3 Gradient Shift on Hover

```tsx
<button className="
  relative
  overflow-hidden
  bg-gradient-to-r
  from-cyan-500
  via-purple-500
  to-magenta-500
  bg-size-200
  hover:bg-pos-100
  transition-all
  duration-500
">
  Hover Me
</button>
```

```css
/* tailwind.config.js - Add utilities */
.bg-size-200 {
  background-size: 200% 100%;
}

.bg-pos-0 {
  background-position: 0% 0%;
}

.bg-pos-100 {
  background-position: 100% 0%;
}
```

**Usage**: Primary CTAs, featured buttons

---

### 4.4 Image Zoom on Hover

```css
.image-zoom-container {
  overflow: hidden;
  border-radius: 1rem;
}

.image-zoom-container img {
  transition: transform 0.5s ease;
  will-change: transform;
}

.image-zoom-container:hover img {
  transform: scale(1.1);
}
```

**Usage**: Portfolio project images, team photos

---

### 4.5 Glow Effect on Hover

```css
.glow-on-hover {
  position: relative;
  transition: box-shadow 0.3s ease;
}

.glow-on-hover:hover {
  box-shadow:
    0 0 20px rgba(0, 212, 255, 0.5),
    0 0 40px rgba(157, 78, 221, 0.3),
    0 0 60px rgba(255, 0, 110, 0.2);
}
```

**Usage**: Featured elements, AI-themed components

---

## 5. Loading States

### 5.1 Spinner

```tsx
// components/Spinner.tsx
export const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`
      ${sizeClasses[size]}
      border-4
      border-gray-200
      border-t-cyan-500
      rounded-full
      animate-spin
    `} />
  )
}
```

```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

### 5.2 Skeleton Loader

```tsx
// components/Skeleton.tsx
export const Skeleton = ({
  width = '100%',
  height = '1rem',
  className = ''
}) => {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      style={{ width, height }}
    />
  )
}
```

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

### 5.3 Shimmer Effect

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

**Usage**: Loading cards, placeholder content

---

### 5.4 Progress Bar

```tsx
// components/ProgressBar.tsx
export const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-magenta-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
```

---

## 6. Modal & Overlay Animations

### 6.1 Modal Entrance/Exit

```tsx
// Using Framer Motion
import { motion, AnimatePresence } from 'framer-motion'

export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-lg w-full p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

### 6.2 Slide-Over Panel

```tsx
export const SlideOver = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## 7. Brand-Specific Animations

### 7.1 AI Brain Particle Effect

```tsx
// components/animations/AIBrainAnimation.tsx
import { useEffect, useRef } from 'react'

export const AIBrainAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Particle system implementation
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5

        const colors = ['#00D4FF', '#9D4EDD', '#FF006E']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles = Array.from({ length: 100 }, () => new Particle())

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `rgba(157, 78, 221, ${1 - distance / 100})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      width={800}
      height={600}
    />
  )
}
```

---

### 7.2 Gradient Text Animation

```css
@keyframes gradientFlow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animated-gradient-text {
  background: linear-gradient(
    90deg,
    #00D4FF,
    #9D4EDD,
    #FF006E,
    #9D4EDD,
    #00D4FF
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientFlow 3s ease infinite;
}
```

---

### 7.3 Logo Reveal Animation

```tsx
export const LogoReveal = () => {
  return (
    <motion.svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="..." // Your logo path
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="transparent"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 0.5 }
            }
          }
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="50%" stopColor="#9D4EDD" />
          <stop offset="100%" stopColor="#FF006E" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
```

---

## 8. Form Animations

### 8.1 Input Focus Animation

```css
.input-animated {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.input-animated:focus {
  border-color: transparent;
  background-image: linear-gradient(white, white),
                    linear-gradient(135deg, #00D4FF, #9D4EDD, #FF006E);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
```

---

### 8.2 Label Float Animation

```tsx
export const FloatingLabelInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  return (
    <div className="relative">
      <input
        {...props}
        className="peer w-full px-4 pt-6 pb-2 border-2 border-gray-300 rounded-lg focus:border-cyan-500 transition-colors"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false)
          setHasValue(!!e.target.value)
        }}
      />
      <label className={`
        absolute left-4 transition-all duration-200
        ${isFocused || hasValue
          ? 'top-2 text-xs text-cyan-500'
          : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
        }
      `}>
        {label}
      </label>
    </div>
  )
}
```

---

### 8.3 Success Animation (Checkmark)

```tsx
export const SuccessCheckmark = () => {
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      initial="hidden"
      animate="visible"
    >
      {/* Circle */}
      <motion.circle
        cx="32"
        cy="32"
        r="30"
        stroke="#10B981"
        strokeWidth="3"
        fill="transparent"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        }}
      />

      {/* Checkmark */}
      <motion.path
        d="M20 32 L28 40 L44 24"
        stroke="#10B981"
        strokeWidth="3"
        fill="transparent"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 0.3, delay: 0.5, ease: "easeOut" }
          }
        }}
      />
    </motion.svg>
  )
}
```

---

## 9. Page Transition Animations

### 9.1 Fade Transition

```tsx
// app/template.tsx
'use client'

import { motion } from 'framer-motion'

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

---

### 9.2 Slide Transition

```tsx
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 10. Accessibility Considerations

### 10.1 Reduced Motion

```tsx
// hooks/usePrefersReducedMotion.ts
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const listener = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return prefersReducedMotion
}

// Usage in component
const AnimatedCard = () => {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      Card content
    </motion.div>
  )
}
```

---

### 10.2 Global Reduced Motion CSS

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 11. Performance Optimization

### 11.1 GPU-Accelerated Properties

**Prefer animating these properties** (GPU-accelerated):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter`

**Avoid animating these** (causes reflow/repaint):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

```css
/* Good */
.element {
  transform: translateY(10px);
  opacity: 0.5;
}

/* Avoid */
.element {
  top: 10px;
  height: 200px;
}
```

---

### 11.2 Will-Change Property

```css
.card-animated {
  will-change: transform;
  transition: transform 0.3s ease;
}

.card-animated:hover {
  transform: translateY(-4px);
}

/* Remove will-change when not needed */
.card-animated.animation-complete {
  will-change: auto;
}
```

**Warning**: Don't overuse `will-change` - it consumes resources

---

### 11.3 Animation Performance Monitoring

```typescript
// utils/performanceMonitor.ts
export const monitorAnimation = (name: string, callback: () => void) => {
  const start = performance.now()

  callback()

  requestAnimationFrame(() => {
    const end = performance.now()
    const duration = end - start

    if (duration > 16.67) { // Slower than 60fps
      console.warn(`Animation "${name}" took ${duration}ms (>16.67ms for 60fps)`)
    }
  })
}
```

---

## 12. Animation Library Recommendations

### 12.1 Framer Motion

**Best for**: React components, complex animations, gestures

```bash
npm install framer-motion
```

**Pros**:
- Declarative API
- Excellent TypeScript support
- Layout animations
- Gesture support
- Variants system

---

### 12.2 GSAP (GreenSock)

**Best for**: Complex timelines, SVG animations, high-performance

```bash
npm install gsap
```

**Pros**:
- Industry standard
- Maximum performance
- Powerful timeline system
- Plugin ecosystem

---

### 12.3 React Spring

**Best for**: Physics-based animations, natural motion

```bash
npm install @react-spring/web
```

**Pros**:
- Spring physics
- Smooth interpolations
- Performant

---

### 12.4 CSS-only (Tailwind + Custom)

**Best for**: Simple transitions, lightweight needs

**Pros**:
- Zero JS overhead
- Native browser performance
- Easy to maintain

---

## 13. Animation Testing

### 13.1 Visual Regression Testing

```typescript
// tests/animations.visual.test.ts
import { test, expect } from '@playwright/test'

test('Button hover animation', async ({ page }) => {
  await page.goto('/components/button')

  const button = page.locator('button.primary')

  // Before hover
  await expect(button).toHaveScreenshot('button-default.png')

  // Hover state
  await button.hover()
  await page.waitForTimeout(300) // Wait for animation
  await expect(button).toHaveScreenshot('button-hover.png')
})
```

---

### 13.2 Animation Performance Testing

```typescript
// tests/performance.test.ts
test('Scroll animation performance', async ({ page }) => {
  await page.goto('/')

  // Start performance tracing
  await page.evaluate(() => performance.mark('scroll-start'))

  // Trigger scroll
  await page.evaluate(() => window.scrollTo(0, 1000))

  // Measure
  const metrics = await page.evaluate(() => {
    performance.mark('scroll-end')
    performance.measure('scroll', 'scroll-start', 'scroll-end')
    return performance.getEntriesByName('scroll')[0].duration
  })

  expect(metrics).toBeLessThan(100) // Should complete in <100ms
})
```

---

## Summary

This animation system provides:

✅ **Purposeful Animations**: Every animation serves a function
✅ **Brand Consistency**: Gradient effects, AI themes, modern aesthetics
✅ **Performance**: GPU-accelerated, optimized for 60fps
✅ **Accessibility**: Reduced motion support, semantic animations
✅ **Flexibility**: Multiple implementation approaches (CSS, Framer Motion, GSAP)
✅ **User Delight**: Micro-interactions that enhance UX

**Animation Budget**:
- Page load: < 500ms for critical animations
- Micro-interactions: 200-300ms
- Transitions: 300-500ms
- Decorative: 500-1000ms

**Key Principles**:
1. Animate `transform` and `opacity` for performance
2. Respect `prefers-reduced-motion`
3. Keep animations subtle and purposeful
4. Test on real devices, especially mobile
5. Use spring physics for natural motion
6. Stagger animations for visual hierarchy
7. Always provide instant fallbacks
