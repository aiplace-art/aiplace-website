# AiPlace Design System

## Overview

This directory contains the complete design system for AiPlace - a modern, scalable, and maintainable set of design tokens, utilities, and components.

## Files Structure

```
src/styles/
├── globals.css           # Global styles, base utilities, and component classes
├── animations.css        # Custom animations and keyframes
├── design-tokens.ts      # TypeScript design tokens (colors, typography, spacing)
├── theme.ts             # Theme management system (light/dark mode)
└── README.md            # This file
```

## Brand Identity

### Logo
AiPlace with gradient brain icon (cyan → purple → magenta)

### Tagline
"Where Creativity Meets AI"

### Brand Colors

```typescript
// Primary Gradient
#00D4FF (Cyan)     → #9D4EDD (Purple)    → #FF006E (Magenta)

// Extended Palette
Cyan Light:   #33DDFF    Purple Light:  #B366F0    Magenta Light: #FF3388
Cyan Dark:    #00A8CC    Purple Dark:   #7B3AB8    Magenta Dark:  #CC0058
```

## Usage Guide

### 1. Tailwind Classes

The design system extends Tailwind CSS with custom utilities:

```jsx
// Gradient Text
<h1 className="text-gradient-brand">Welcome to AiPlace</h1>

// Glass Morphism
<div className="glass rounded-2xl p-6">Content</div>

// Cards
<div className="card-hover">Interactive Card</div>

// Buttons
<button className="btn-primary">Primary Action</button>
<button className="btn-outline">Secondary Action</button>

// Gradients & Animations
<div className="bg-gradient-animated">Animated Background</div>
```

### 2. Design Tokens (TypeScript)

Import tokens for programmatic use:

```typescript
import { designTokens } from '@/styles/design-tokens';

// Use in components
const buttonStyle = {
  backgroundColor: designTokens.colors.brand.purple,
  fontSize: designTokens.typography.fontSize.lg,
  padding: designTokens.spacing[4],
  borderRadius: designTokens.borderRadius['2xl'],
};
```

### 3. Theme Management

```typescript
import { themeManager } from '@/styles/theme';

// Set theme
themeManager.setTheme('dark');  // 'light' | 'dark' | 'system'

// Toggle theme
themeManager.toggleTheme();

// Get current theme
const theme = themeManager.getTheme();
const effectiveTheme = themeManager.getEffectiveThemeValue();

// React Hook
import { useTheme } from '@/styles/theme';

function ThemeToggle() {
  const { theme, effectiveTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current: {effectiveTheme}
    </button>
  );
}
```

### 4. Custom Animations

```jsx
// Scroll Reveal
<div className="animate-on-scroll">Content fades in on scroll</div>

// Floating Elements
<div className="animate-float">Floating brain icon</div>

// Stagger Children
<div className="stagger-children">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

// Loading States
<div className="loading-spinner"></div>
<div className="loading-dots">
  <span></span>
  <span></span>
  <span></span>
</div>
```

## Component Patterns

### Hero Section

```jsx
<section className="section bg-mesh">
  <div className="container-custom">
    <h1 className="text-gradient-brand animate-fade-in-up">
      Where Creativity Meets AI
    </h1>
    <p className="text-lg text-neutral-600 dark:text-neutral-400">
      Your description here
    </p>
    <button className="btn-primary hover-lift">
      Get Started
    </button>
  </div>
</section>
```

### Feature Card

```jsx
<div className="card-gradient card-lift">
  <div className="text-brand-purple mb-4">
    {/* Icon */}
  </div>
  <h3 className="text-2xl font-bold mb-2">Feature Title</h3>
  <p className="text-neutral-600 dark:text-neutral-400">
    Feature description
  </p>
</div>
```

### Glass Card

```jsx
<div className="glass rounded-3xl p-8">
  <h3 className="text-xl font-semibold mb-4">Glass Card</h3>
  <p>Content with backdrop blur effect</p>
</div>
```

## Responsive Design

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Usage

```jsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive Text
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive Grid */}
</div>
```

## Accessibility

### Focus States

All interactive elements have custom focus styles:

```css
:focus-visible {
  outline: none;
  ring: 2px solid theme(colors.brand.purple);
  ring-offset: 2px;
}
```

### Color Contrast

All color combinations meet WCAG AA standards:
- Light mode: 4.5:1 minimum
- Dark mode: 4.5:1 minimum

### Dark Mode

Automatic dark mode support:

```jsx
// CSS
.dark .text-neutral-900 { color: theme(colors.neutral.50); }

// Tailwind
<div className="bg-white dark:bg-neutral-900">
  <p className="text-neutral-900 dark:text-neutral-50">Content</p>
</div>
```

## Performance

### Optimizations

1. **CSS Variables**: Efficient theme switching
2. **Purged CSS**: Unused styles removed in production
3. **Optimized Animations**: GPU-accelerated transforms
4. **Lazy Loading**: Import animations only when needed

### Best Practices

```jsx
// Good: Use Tailwind utilities
<div className="bg-brand-purple rounded-lg p-4">

// Avoid: Inline styles
<div style={{ backgroundColor: '#9D4EDD' }}>
```

## Dark Mode Implementation

### Automatic Detection

```typescript
// System preference detection
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Listen for changes
prefersDark.addEventListener('change', (e) => {
  if (theme === 'system') {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});
```

### Manual Toggle

```typescript
themeManager.setTheme('dark');  // Force dark
themeManager.setTheme('light'); // Force light
themeManager.setTheme('system'); // Follow system
```

## Examples

### Landing Page Hero

```jsx
<section className="relative min-h-screen flex items-center justify-center bg-mesh">
  <div className="absolute inset-0 grid-pattern opacity-50"></div>
  <div className="container-custom relative z-10">
    <div className="stagger-children text-center">
      <h1 className="text-7xl font-display font-bold text-gradient-brand mb-6">
        AiPlace
      </h1>
      <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
        Where Creativity Meets AI
      </p>
      <div className="flex gap-4 justify-center">
        <button className="btn-primary">Get Started</button>
        <button className="btn-outline">Learn More</button>
      </div>
    </div>
  </div>
</section>
```

### Feature Grid

```jsx
<section className="section">
  <div className="container-custom">
    <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <div key={index} className="card-hover animate-on-scroll">
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Contributing

When adding new design elements:

1. Update `design-tokens.ts` for new tokens
2. Add utilities to `globals.css`
3. Create animations in `animations.css`
4. Document usage in this README
5. Ensure dark mode compatibility
6. Test accessibility

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**AiPlace Design System v1.0.0**
