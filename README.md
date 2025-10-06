# AiPlace Website - Component Library & Design System

A comprehensive design system and component library for the AiPlace website, built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Lucide React icons.

## Overview

This project contains a complete design system implementation based on the AiPlace brand specification, featuring:

- 🎨 **UI Components** - Buttons, inputs, cards, badges with glass morphism effects
- 🏗️ **Layout Components** - Header with sticky navigation, comprehensive footer
- 📦 **Section Components** - Hero, services grid, portfolio, timeline, testimonials
- 📝 **Form Components** - Multi-step contact form with validation
- ✨ **Animations** - Smooth transitions and micro-interactions with Framer Motion
- 🎯 **TypeScript** - Full type safety throughout
- 🌙 **Dark Theme** - Premium dark UI with gradient accents

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the component demo page showcasing all components.

### Build for Production

```bash
npm run build
npm start
```

## Component Library

### UI Components (`src/components/ui/`)

**Button** - Versatile button with 5 variants (default, secondary, ghost, outline, link) and 5 sizes
```tsx
import { Button } from "@/components/ui/button"
<Button variant="default" size="lg">Get Started</Button>
```

**Input** - Text input with glass morphism styling
```tsx
import { Input } from "@/components/ui/input"
<Input placeholder="Enter text..." />
```

**Textarea** - Multi-line text input
```tsx
import { Textarea } from "@/components/ui/textarea"
<Textarea placeholder="Your message..." />
```

**Select** - Dropdown with custom options
```tsx
import { Select } from "@/components/ui/select"
<Select options={[{ value: "1", label: "Option 1" }]} />
```

**Card** - Container with header, content, footer sections
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

**Badge** - Labels and tags with 5 variants
```tsx
import { Badge } from "@/components/ui/badge"
<Badge variant="default">New</Badge>
```

### Layout Components (`src/components/layout/`)

**Header** - Fixed navigation with scroll effects, mobile menu, submenus
- Sticky positioning with blur effect on scroll
- Desktop and mobile navigation
- Dropdown submenus for Services
- Glass morphism styling

**Footer** - Comprehensive footer with links, newsletter, social media
- Company info and contact details
- 4 link columns (Services, Company, Resources, Legal)
- Newsletter subscription
- Social media icons
- Back to top button

### Section Components (`src/components/sections/`)

**Hero** - Full-screen hero with animations
- Animated gradient background with floating orbs
- Staggered text animations
- Dual CTA buttons
- Statistics grid
- Scroll indicator

**ServiceCard** - Individual service card with hover effects
- Icon with gradient background
- Feature list (max 5 visible)
- Hover lift animation
- Gradient border on hover

**ServicesGrid** - 4-column service showcase
- Responsive grid layout
- Staggered animations
- Service data integration

**PortfolioGrid** - Filterable project showcase
- Category filtering (All, Web Dev, AI, Business, Tokenomics)
- Animated grid with project cards
- Result metrics display
- Case study links

**ProcessTimeline** - 5-step process visualization
- Vertical timeline with alternating layout
- Gradient connecting line
- Icon backgrounds
- Scroll-triggered animations

**TestimonialCarousel** - Auto-rotating testimonials
- 5-star ratings
- Auto-advance (7 seconds)
- Manual navigation
- Slide animations
- Statistics section

### Form Components (`src/components/forms/`)

**ContactForm** - Multi-step contact form
- Step 1: Basic information (name, email, service)
- Step 2: Project details (budget, timeline)
- Step 3: Additional information (message)
- Progress indicator
- Step validation
- Success screen

## Design System

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Accent**: Purple (#8b5cf6)
- **Background**: Dark Gray (#0a0a0a)
- **Text**: White/Gray scale

### Typography
- **Font**: Inter
- **Headings**: text-5xl → text-xl (bold)
- **Body**: text-base → text-sm
- **Colors**: white (primary), gray-300 (secondary), gray-400 (tertiary)

### Effects
- **Glass Morphism**: `bg-white/5 backdrop-blur-sm border-white/10`
- **Gradients**: Indigo → Purple, Multi-color backgrounds
- **Shadows**: Colored shadows on gradients
- **Animations**: Framer Motion for smooth transitions

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1279px
- Desktop: ≥ 1280px

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page (component demo)
├── components/
│   ├── ui/                 # Base UI components
│   ├── layout/             # Header & Footer
│   ├── sections/           # Page sections
│   ├── forms/              # Form components
│   ├── demo.tsx            # Component showcase page
│   └── index.ts            # Component exports
├── lib/
│   └── utils.ts            # Utility functions (cn)
├── types/
│   └── index.ts            # TypeScript interfaces
└── styles/
    └── globals.css         # Global styles & Tailwind
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Components**: shadcn/ui pattern
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Key Features

### Animations
- Scroll-triggered reveals
- Hover effects (lift, scale, glow)
- Page transitions
- Micro-interactions
- Loading states

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus visible states
- Color contrast (WCAG AA)

### Performance
- Code splitting
- Lazy loading
- Optimized animations (transform/opacity)
- Minimal re-renders
- Static generation ready

## TypeScript Types

All components are fully typed. Key interfaces:

```typescript
Service - Service card data
PortfolioItem - Portfolio project data
Testimonial - Client testimonial data
ProcessStep - Timeline step data
ContactFormData - Contact form fields
```

See `/src/types/index.ts` for complete definitions.

## Customization

### Colors
Edit Tailwind config in `tailwind.config.ts` and CSS variables in `src/styles/globals.css`

### Components
All components accept className prop for custom styling via Tailwind utilities

### Content
Update data arrays in section components:
- Services: `src/components/sections/services-grid.tsx`
- Portfolio: `src/components/sections/portfolio-grid.tsx`
- Testimonials: `src/components/sections/testimonial-carousel.tsx`

## Demo Page

The `/src/components/demo.tsx` file showcases all components in action:
- Full page layout with header and footer
- All section components
- UI component variations
- Interactive examples

Access at `http://localhost:3000` when running dev server.

## Documentation

For detailed component documentation, see `/docs/DESIGN-SYSTEM.md`

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For questions or issues, contact the AiPlace development team.

---

**Built with** ❤️ **by the AiPlace team**
