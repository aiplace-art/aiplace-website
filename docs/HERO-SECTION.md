# Hero Section Component Documentation

## Overview

The Hero section is a stunning, full-screen component that serves as the primary landing point for the AiPlace website. It features animated gradient backgrounds, logo integration, and engaging call-to-action buttons.

## Location

**File:** `/src/components/sections/hero.tsx`

## Features

### 1. Full-Screen Layout
- Responsive min-height viewport design
- Centered content with optimal spacing
- Mobile-first approach with breakpoint adaptations

### 2. Animated Gradient Background
- **Base gradient:** White → Brand Pink (50/30%) → Brand Purple (50/40%)
- **Three floating orbs** with independent animations:
  - Pink-Purple orb (top-left, 6s cycle)
  - Blue-Cyan orb (bottom-right, 7s cycle)
  - Purple-Pink orb (center, 8s cycle)
- **Mesh overlay:** Radial gradient for depth
- All animations use `ease-in-out` for smooth transitions

### 3. Logo Integration
- **Asset:** `/images/logo.png`
- **Responsive sizes:**
  - Mobile: h-32 (128px)
  - Small: h-40 (160px)
  - Large: h-48 (192px)
  - XL: h-56 (224px)
- **Animations:**
  - Scale-in on load (0.8 → 1.0)
  - Hover scale effect (1.05x)
  - Pulsing glow backdrop
- **Optimization:** Priority loading for LCP

### 4. Badge Component
- Sparkles icon indicator
- Glassmorphic background (white/80% + backdrop-blur)
- Multi-color gradient text
- Border: brand-purple-200/50

### 5. Headline
**Text:** "Where Creativity Meets AI"

**Typography:**
- Text sizes: 5xl → 6xl → 7xl → 8xl (responsive)
- Font weight: Bold (700)
- Line height: 1.1 (tight)
- Letter spacing: Tight tracking

**Gradient Split:**
- Line 1: Pink → Purple → Blue
- Line 2: Blue → Cyan → Purple

### 6. Subheadline
**Text:** "Transform your vision into reality with AI-powered solutions, premium web development, and strategic innovation for modern businesses."

**Styling:**
- Color: navy-700
- Sizes: lg → xl → 2xl (responsive)
- Max width: 3xl (768px)
- Leading: Relaxed (1.625)

### 7. CTA Buttons

#### Primary Button - "Get Started"
- **Style:** Gradient brand background
- **Size:** XL (h-14)
- **Features:**
  - Glow shadow effect
  - Arrow icon with translate animation
  - Scale on hover (1.05x)
  - Scale on tap (0.98x)

#### Secondary Button - "Learn More"
- **Style:** Outline variant
- **Background:** White/50% glassmorphic
- **Border:** 2px brand-purple-300
- **Hover:** White/80% background

### 8. Statistics Section
Three animated stat cards with individual gradients:

| Stat | Label | Gradient |
|------|-------|----------|
| 150+ | Projects Delivered | Pink → Purple |
| 98% | Client Satisfaction | Purple → Blue |
| 24/7 | Premium Support | Blue → Cyan |

**Animations:**
- Scale-in on load
- Hover scale (1.05x)
- Spring transitions

### 9. Scroll Indicator
- Position: Absolute bottom center
- Animated scroll mouse icon
- Pulse animation (y: 0 → 8 → 0)
- Inner dot with delayed animation

## Animation System

### Stagger Pattern
```typescript
containerVariants: {
  staggerChildren: 0.15s
  delayChildren: 0.2s
}
```

### Spring Physics
- Stiffness: 100-120
- Damping: 12-15
- Mass: 0.5

### Orb Animations
- Duration: 6-8 seconds
- Infinite repeat
- Ease-in-out timing

## Color Palette

### Brand Colors Used
- **Pink:** #FF1493 (primary), lighter shades for gradients
- **Purple:** #9B4DFF (primary), lighter shades for gradients
- **Blue:** #4D9FFF (primary), lighter shades for gradients
- **Cyan:** #00D4FF (primary), lighter shades for gradients
- **Navy:** #0A1628 (text), lighter shades for secondary text

### Gradient Definitions
```css
bg-gradient-brand: linear-gradient(135deg, #FF1493 0%, #9B4DFF 33%, #4D9FFF 66%, #00D4FF 100%)
bg-gradient-brand-hover: linear-gradient(135deg, #E6007A 0%, #7A1FFF 33%, #0080FF 66%, #00B3E6 100%)
```

## Responsive Breakpoints

| Breakpoint | Viewport | Changes |
|------------|----------|---------|
| Mobile | < 640px | Stacked buttons, smaller logo, base text sizes |
| Tablet | 640px - 1023px | Inline buttons, medium logo, increased text |
| Desktop | 1024px - 1279px | Full layout, large logo, optimal text |
| XL | ≥ 1280px | Maximum sizes, enhanced spacing |

## Performance Optimizations

1. **Next.js Image Component**
   - Automatic format optimization (WebP/AVIF)
   - Priority loading for hero logo
   - Responsive sizing

2. **GPU-Accelerated Animations**
   - Transform and opacity only
   - Will-change hints for smooth performance
   - Hardware acceleration enabled

3. **Framer Motion**
   - Optimized spring animations
   - Reduced motion support
   - Efficient stagger calculations

## Accessibility

- **Semantic HTML:** `<section>` with proper heading hierarchy
- **Alt text:** Descriptive image alt for logo
- **Focus states:** Keyboard navigation support on buttons
- **Color contrast:** WCAG AA compliant text colors
- **Motion:** Respects prefers-reduced-motion (built into Framer Motion)

## Usage Example

```tsx
import { Hero } from "@/components/sections/hero"

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Other sections */}
    </>
  )
}
```

## Dependencies

- `next/image` - Image optimization
- `framer-motion` - Animation library
- `lucide-react` - Icon components
- `@/components/ui/button` - Button component

## Customization

### Change Headline
Edit lines 165-171 in `/src/components/sections/hero.tsx`

### Modify Statistics
Edit the array at lines 222-226

### Adjust Animation Speed
Modify `staggerChildren` and `delayChildren` in `containerVariants` (lines 10-18)

### Update Colors
Use Tailwind brand color utilities from `tailwind.config.ts`

## Future Enhancements

- [ ] Particle system for interactive background
- [ ] Video background option
- [ ] Parallax scrolling effects
- [ ] Dynamic text animation (typewriter effect)
- [ ] A/B testing variants
- [ ] Analytics tracking integration

## Testing Checklist

- [ ] Logo loads correctly on all devices
- [ ] Animations perform smoothly (60fps)
- [ ] Buttons are clickable and accessible
- [ ] Text is readable on all backgrounds
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Lighthouse performance score > 90
- [ ] No layout shift (CLS < 0.1)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

**Version:** 1.0.0
**Last Updated:** October 2025
**Created By:** Frontend Development Team
