# Hero Logo Customization Guide

Quick reference for customizing the animated hero logo section.

## Quick Adjustments

### Change Animation Speed

#### Make it faster (more energetic):
```typescript
// In hero.tsx, find and adjust durations:

// Rotating rings: 8s → 6s
duration: 6  // was 8

// Pulsing glows: 3s → 2s
duration: 2  // was 3

// Floating: 4s → 3s
duration: 3  // was 4
```

#### Make it slower (more elegant):
```typescript
// Rotating rings: 8s → 12s
duration: 12  // was 8

// Pulsing glows: 3s → 5s
duration: 5  // was 3

// Floating: 4s → 6s
duration: 6  // was 4
```

### Adjust Color Intensity

#### More saturated (brighter):
```typescript
// Increase opacity values:
rgba(236, 72, 153, 0.95)  // was 0.85
rgba(168, 85, 247, 0.85)  // was 0.75
rgba(6, 182, 212, 0.75)   // was 0.65
```

#### More subtle (softer):
```typescript
// Decrease opacity values:
rgba(236, 72, 153, 0.6)   // was 0.85
rgba(168, 85, 247, 0.5)   // was 0.75
rgba(6, 182, 212, 0.4)    // was 0.65
```

### Change Logo Size

```tsx
// In hero.tsx, find:
className="relative w-auto h-40 md:h-52 lg:h-64"

// Smaller:
className="relative w-auto h-32 md:h-40 lg:h-48"

// Larger:
className="relative w-auto h-48 md:h-64 lg:h-80"
```

### Adjust Glow Spread

```typescript
// Increase glow area:
className="absolute inset-0 -m-16 md:-m-20 lg:-m-24"  // was -m-12, -m-16, -m-20

// Decrease glow area:
className="absolute inset-0 -m-8 md:-m-10 lg:-m-12"   // was -m-12, -m-16, -m-20
```

### Change Number of Particles

```typescript
// More particles (busier):
{[...Array(16)].map((_, i) => {  // was 12

// Fewer particles (cleaner):
{[...Array(8)].map((_, i) => {   // was 12
```

## Color Schemes

### Purple Theme (Default)
```typescript
Primary: #a855f7 (purple)
Secondary: #ec4899 (pink)
Accent: #3b82f6 (blue)
Highlight: #06b6d4 (cyan)
```

### Blue Theme
```typescript
Primary: #3b82f6 (blue)
Secondary: #06b6d4 (cyan)
Accent: #a855f7 (purple)
Highlight: #ec4899 (pink)
```

### Green Theme (AI/Tech)
```typescript
Primary: #10b981 (emerald)
Secondary: #06b6d4 (cyan)
Accent: #3b82f6 (blue)
Highlight: #a855f7 (purple)
```

### Orange Theme (Energetic)
```typescript
Primary: #f97316 (orange)
Secondary: #f59e0b (amber)
Accent: #ec4899 (pink)
Highlight: #a855f7 (purple)
```

## Animation Presets

### "Calm" Preset
```typescript
// Slower, gentler animations
rotatingGradientVariants: { duration: 15 }
pulsingGlowVariants: { duration: 5, scale: [1, 1.1, 1] }
floatingVariants: { duration: 8, y: [0, -10, 0] }
particleAnimations: { duration: 7 }
```

### "Energetic" Preset (Default)
```typescript
rotatingGradientVariants: { duration: 8 }
pulsingGlowVariants: { duration: 3, scale: [1, 1.2, 1] }
floatingVariants: { duration: 4, y: [0, -15, 0] }
particleAnimations: { duration: 5 }
```

### "Dramatic" Preset
```typescript
// Faster, more intense
rotatingGradientVariants: { duration: 5 }
pulsingGlowVariants: { duration: 2, scale: [1, 1.4, 1] }
floatingVariants: { duration: 3, y: [0, -20, 0] }
particleAnimations: { duration: 3 }
```

### "Minimal" Preset
```typescript
// Subtle, professional
rotatingGradientVariants: { duration: 20 }
pulsingGlowVariants: { duration: 6, scale: [1, 1.05, 1] }
floatingVariants: { duration: 10, y: [0, -8, 0] }
particleAnimations: { duration: 8 }
```

## Remove Specific Effects

### Remove Rotating Rings
```tsx
// Comment out or delete:
{/* Rotating gradient ring - SATURATED */}
<motion.div className="absolute inset-0 -m-12 md:-m-16 lg:-m-20" ...>
  ...
</motion.div>
```

### Remove Sparkle Particles
```tsx
// Comment out:
{/* Sparkle particles orbiting the logo - MORE VIBRANT */}
{[...Array(12)].map((_, i) => { ... })}
```

### Remove Light Beams
```tsx
// Comment out:
{/* Light beams - MORE SATURATED */}
{[...Array(6)].map((_, i) => ( ... ))}
```

### Remove Corner Sparkles
```tsx
// Comment out:
{/* Corner sparkles - ENHANCED */}
{[ ... ].map((pos, i) => ( ... ))}
```

### Remove Shimmer Effect
```tsx
// Comment out:
{/* Shimmer effect overlay */}
<motion.div className="absolute inset-0 -m-8 ...">
  ...
</motion.div>
```

## Add Custom Effects

### Add a Heartbeat Pulse
```tsx
<motion.div
  className="absolute inset-0"
  animate={{
    scale: [1, 1.05, 1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5, 0.8, 0.5],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    times: [0, 0.2, 0.4, 0.6, 1],
  }}
>
  {/* Your content */}
</motion.div>
```

### Add Mouse Follow Effect
```tsx
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  window.addEventListener('mousemove', handleMouseMove)
  return () => window.removeEventListener('mousemove', handleMouseMove)
}, [])

// In render:
<motion.div
  animate={{
    x: (mousePosition.x - window.innerWidth / 2) * 0.05,
    y: (mousePosition.y - window.innerHeight / 2) * 0.05,
  }}
  transition={{ type: "spring", stiffness: 50 }}
>
  {/* Logo */}
</motion.div>
```

### Add Color Cycling
```tsx
<motion.div
  animate={{
    background: [
      'radial-gradient(circle, #ec4899 0%, transparent 80%)',
      'radial-gradient(circle, #a855f7 0%, transparent 80%)',
      'radial-gradient(circle, #3b82f6 0%, transparent 80%)',
      'radial-gradient(circle, #06b6d4 0%, transparent 80%)',
      'radial-gradient(circle, #ec4899 0%, transparent 80%)',
    ],
  }}
  transition={{ duration: 10, repeat: Infinity }}
>
  {/* Content */}
</motion.div>
```

## Performance Tuning

### Reduce for Mobile
```tsx
// Add conditional rendering:
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// Then:
{!isMobile && (
  <>
    {/* Heavy animations here */}
  </>
)}
```

### Disable on Low Performance
```tsx
const [reducedMotion, setReducedMotion] = useState(false)

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  setReducedMotion(mediaQuery.matches)
}, [])

// Use reducedMotion flag to conditionally apply animations
```

### Lazy Load Effects
```tsx
const [effectsLoaded, setEffectsLoaded] = useState(false)

useEffect(() => {
  // Load heavy effects after initial render
  setTimeout(() => setEffectsLoaded(true), 1000)
}, [])

{effectsLoaded && (
  <>
    {/* Expensive animations */}
  </>
)}
```

## Accessibility Options

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  /* Increase opacity of all colors */
  .glow-effect {
    opacity: 1 !important;
  }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

### Focus Visible
```tsx
<motion.div
  className="focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-500"
  tabIndex={0}
>
  {/* Logo */}
</motion.div>
```

## Troubleshooting

### Animation is choppy
1. Check browser DevTools Performance tab
2. Reduce number of particles
3. Increase animation durations
4. Use `will-change: transform` sparingly

### Colors don't match brand
1. Update Tailwind config brand colors
2. Replace inline RGB values in hero.tsx
3. Test in light/dark mode

### Logo not centered
1. Check parent container alignment
2. Verify logo dimensions
3. Inspect margin/padding values

### Effects too subtle/strong
1. Adjust opacity values
2. Modify blur amounts
3. Change animation scales

## Quick Copy-Paste Snippets

### Simple Floating Logo (Minimal)
```tsx
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 4, repeat: Infinity }}
>
  <Image src="/images/logo.png" alt="Logo" />
</motion.div>
```

### Pulsing Glow (Basic)
```tsx
<motion.div
  className="absolute -inset-8 rounded-full bg-purple-500/30 blur-3xl"
  animate={{ opacity: [0.3, 0.6, 0.3] }}
  transition={{ duration: 3, repeat: Infinity }}
/>
```

### Rotating Ring (Simple)
```tsx
<motion.div
  className="absolute -inset-12 rounded-full"
  animate={{ rotate: 360 }}
  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  style={{
    background: 'conic-gradient(from 0deg, #ec4899, #a855f7, #3b82f6, #ec4899)',
    filter: 'blur(40px)',
  }}
/>
```

---

**Need Help?**
- Check `/docs/hero-logo-technical-details.md` for implementation details
- Check `/docs/hero-logo-enhancements.md` for complete feature list
- Component file: `/src/components/sections/hero.tsx`

**Last Updated**: 2025-10-06
