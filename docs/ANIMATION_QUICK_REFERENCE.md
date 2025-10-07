# Animation Quick Reference Guide

## 🎬 CSS Animation Classes - Quick Reference

### Entrance Animations

```css
/* Fade in from bottom with scale */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Usage */
<div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
  Content
</div>
```

### Staggered Animations

```css
/* Portfolio Cards */
.portfolio-card:nth-child(1) { animation-delay: 0ms; }
.portfolio-card:nth-child(2) { animation-delay: 100ms; }
.portfolio-card:nth-child(3) { animation-delay: 200ms; }

/* Service Cards */
.service-card:nth-child(1) { animation-delay: 0ms; }
.service-card:nth-child(2) { animation-delay: 150ms; }
.service-card:nth-child(3) { animation-delay: 300ms; }
.service-card:nth-child(4) { animation-delay: 450ms; }
```

---

## 🎨 Glass Morphism

### Standard Glass
```css
.glass-morphism {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Strong Glass (Hero, Service Cards)
```css
.glass-morphism-strong {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```

### Usage
```jsx
<div className="glass-morphism-strong border border-white/30">
  Content with glass effect
</div>
```

---

## 🏃 Hover Effects

### Card Lift
```css
/* Portfolio/Service Cards */
.portfolio-card-hover:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 50px rgba(157, 78, 221, 0.3);
}
```

### Magnetic Tilt (Service Cards)
```css
.service-card-tilt:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateY(-12px);
  box-shadow:
    0 20px 50px -10px rgba(157, 78, 221, 0.3),
    0 10px 30px -10px rgba(0, 212, 255, 0.2);
}
```

### Icon Bounce
```css
.service-icon-bounce {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.service-card-tilt:hover .service-icon-bounce {
  animation: icon-bounce-glow 0.8s ease-in-out;
}

@keyframes icon-bounce-glow {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-12px) scale(1.15);
  }
}
```

---

## 🖼️ Image Effects

### Zoom on Hover
```css
.portfolio-image-container {
  overflow: hidden;
}

.portfolio-image-zoom {
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.portfolio-image-container:hover .portfolio-image-zoom {
  transform: scale(1.1);
}
```

### Usage
```jsx
<div className="portfolio-image-container">
  <div className="portfolio-image-zoom">
    {/* Image or gradient */}
  </div>
</div>
```

---

## 🌈 Gradient Effects

### Gradient Border
```css
/* Using inline style */
<div style={{
  background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(0, 212, 255, 0.6), rgba(157, 78, 221, 0.6), rgba(255, 0, 110, 0.6)) border-box',
  border: '3px solid transparent'
}}>
  Content
</div>
```

### Gradient Underline
```css
.gradient-underline {
  position: relative;
}

.gradient-underline::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #00D4FF, #9D4EDD, #FF006E);
  transition: width 0.4s ease, left 0.4s ease;
}

.gradient-underline:hover::after {
  width: 100%;
  left: 0%;
}
```

### Gradient Text
```css
.text-gradient-brand {
  background: linear-gradient(90deg, #00D4FF, #9D4EDD, #FF006E);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## ✨ Button Effects

### Shimmer Effect
```css
.btn-shimmer {
  position: relative;
  overflow: hidden;
}

.btn-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.btn-shimmer:hover::before {
  left: 100%;
}
```

### Loading Spinner
```css
.button-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: button-loading 0.8s linear infinite;
}

@keyframes button-loading {
  to { transform: rotate(360deg); }
}
```

---

## 📊 Stat Card Effects

### Hero Stat Cards
```css
.stat-card {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 12px 30px -5px rgba(157, 78, 221, 0.2),
    0 8px 20px -5px rgba(0, 212, 255, 0.15);
}
```

### Usage
```jsx
<div className="stat-card glass-morphism-strong p-5">
  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
    98%
  </div>
  <div className="text-sm text-gray-600 mt-2">
    Satisfaction
  </div>
</div>
```

---

## 🎯 Filter Button Animations

### Portfolio Filters
```css
.portfolio-filter-btn {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.portfolio-filter-btn:hover {
  transform: translateY(-2px);
}

.portfolio-filter-btn:active {
  transform: scale(0.95);
}

/* Active state */
.portfolio-filter-btn.active {
  background: linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234));
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.5);
  transform: scale(1.05);
}
```

---

## 🎨 Hero Effects

### Logo Breathing Glow
```css
@keyframes logo-breathe {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(157, 78, 221, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 40px rgba(157, 78, 221, 0.6))
           drop-shadow(0 0 60px rgba(0, 212, 255, 0.3));
  }
}

.animate-logo-breathe {
  animation: logo-breathe 4s ease-in-out infinite;
}
```

### Floating Orbs (Background)
```css
@keyframes float-organic-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

.animate-float-organic-1 {
  animation: float-organic-1 20s ease-in-out infinite;
}
```

---

## 💡 Form Input Effects

### Floating Label
```css
.floating-label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  color: rgb(107, 114, 128);
}

.input-field:focus ~ .floating-label,
.input-field:not(:placeholder-shown) ~ .floating-label {
  top: -0.5rem;
  font-size: 0.75rem;
  color: rgb(157, 78, 221);
  background: white;
  padding: 0 0.5rem;
}
```

### Input Glow
```css
.input-glow {
  transition: all 0.4s ease;
  border: 2px solid rgb(209, 213, 219);
}

.input-glow:focus {
  border-color: transparent;
  box-shadow:
    0 0 0 3px rgba(157, 78, 221, 0.1),
    0 0 20px rgba(157, 78, 221, 0.2),
    0 0 40px rgba(0, 212, 255, 0.1);
}
```

---

## 📐 Spacing System

### Section Spacing
```css
.section-spacing-sm { @apply py-12 md:py-16; }
.section-spacing-md { @apply py-16 md:py-24; }
.section-spacing-lg { @apply py-24 md:py-32; }
```

### Card Spacing
```css
.card-spacing { @apply space-y-6 md:space-y-8; }
```

### Grid Gaps
```css
.grid-gap-sm { @apply gap-4 md:gap-6; }
.grid-gap-md { @apply gap-6 md:gap-8; }
.grid-gap-lg { @apply gap-8 md:gap-12; }
```

---

## ⚡ Performance Tips

### Hardware Acceleration
```css
/* Add to animated elements */
transform: translateZ(0);
will-change: transform, opacity;
```

### Optimal Properties
```css
/* Use only these for animations */
transform, opacity, filter

/* Avoid animating these */
width, height, top, left, margin, padding
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🎯 Timing Functions

### Standard Easing
```css
/* Material Design standard */
cubic-bezier(0.4, 0.0, 0.2, 1)

/* Elastic bounce (our preference) */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Ease out */
cubic-bezier(0.16, 1, 0.3, 1)
```

### Duration Guide
```css
/* Quick interactions */
100-200ms: Button press, small hover

/* Standard transitions */
300-500ms: Card hover, modal open

/* Complex animations */
600-800ms: Multi-stage, entrance effects

/* Ambient animations */
2000-4000ms: Background, breathing effects
```

---

## 🔧 Common Patterns

### Stagger Children
```jsx
{items.map((item, index) => (
  <div
    key={item.id}
    className="animate-fade-in-up"
    style={{
      animationDelay: `${index * 100}ms`,
      animationFillMode: 'forwards'
    }}
  >
    {item.content}
  </div>
))}
```

### Group Hover
```jsx
<div className="group">
  <div className="opacity-0 group-hover:opacity-100 transition">
    Appears on parent hover
  </div>
</div>
```

### Conditional Animation
```jsx
<div className={`
  transition-all duration-500
  ${isActive ? 'scale-105 shadow-lg' : 'scale-100'}
`}>
  Content
</div>
```

---

## 📚 Color System

### Brand Gradients
```css
/* Hero */
from-cyan-400 via-purple-500 to-pink-500

/* Services */
from-purple-500 via-magenta-500 to-pink-500

/* Portfolio */
from-indigo-600 via-purple-600 to-pink-600

/* Contact */
from-pink-500 via-purple-500 to-cyan-400
```

### Shadow Colors
```css
/* Purple glow */
shadow-lg shadow-purple-500/50

/* Multi-layer */
box-shadow:
  0 20px 50px -10px rgba(157, 78, 221, 0.3),
  0 10px 30px -10px rgba(0, 212, 255, 0.2);
```

---

**End of Quick Reference**

*Use this guide for consistent animation implementation across the site.*
