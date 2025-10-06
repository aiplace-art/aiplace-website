# AiPlace Design System Documentation

## Overview

This design system provides a comprehensive set of components and utilities for building the AiPlace website. Built with TypeScript, Tailwind CSS, Framer Motion, and Lucide React icons, following shadcn/ui design patterns.

## Color Palette

Based on the AiPlace brand identity:

- **Primary**: Indigo (#6366f1) - Trust, Innovation
- **Accent**: Purple (#8b5cf6) - Creativity, AI
- **Background**: Dark (#0a0a0a) - Modern, Premium
- **Text**: White/Gray - Clarity, Readability

## Typography

- **Font Family**: Inter (clean, modern, professional)
- **Headings**: Bold, hierarchical sizing (text-5xl → text-xl)
- **Body**: Regular weight, optimized line-height
- **Small Text**: Gray-400 for secondary information

## Component Library

### UI Components (`/src/components/ui/`)

#### Button
Versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary gradient (indigo to purple)
- `secondary` - Glass morphism style
- `ghost` - Transparent with hover effect
- `outline` - Border with hover fill
- `link` - Text with underline

**Sizes:**
- `sm` - Small (h-9)
- `default` - Medium (h-11)
- `lg` - Large (h-12)
- `xl` - Extra large (h-14)
- `icon` - Square (h-10 w-10)

**Usage:**
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">Get Started</Button>
<Button variant="secondary">Learn More</Button>
<Button variant="outline" size="sm">View Details</Button>
```

#### Input
Styled text input with glass morphism effect.

**Features:**
- Glass morphism background
- Focus ring (indigo)
- Placeholder styling
- Full accessibility support

**Usage:**
```tsx
import { Input } from "@/components/ui/input"

<Input type="email" placeholder="your@email.com" />
```

#### Textarea
Multi-line text input with consistent styling.

**Usage:**
```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Your message..." rows={5} />
```

#### Select
Dropdown select with custom styling.

**Props:**
- `options` - Array of { value, label } objects

**Usage:**
```tsx
import { Select } from "@/components/ui/select"

<Select
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" }
  ]}
/>
```

#### Card
Container component with glass morphism and hover effects.

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Top section
- `CardTitle` - Heading
- `CardDescription` - Subtitle
- `CardContent` - Main content
- `CardFooter` - Bottom section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
</Card>
```

#### Badge
Small label component for tags and categories.

**Variants:**
- `default` - Indigo
- `secondary` - Glass morphism
- `outline` - Border only
- `success` - Green
- `warning` - Yellow

**Usage:**
```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">New</Badge>
<Badge variant="success">Active</Badge>
```

### Layout Components (`/src/components/layout/`)

#### Header
Fixed navigation header with scroll effects.

**Features:**
- Sticky positioning
- Scroll-based background blur
- Desktop and mobile navigation
- Dropdown submenus
- Glass morphism when scrolled

**Navigation Items:**
- Home, Services (with submenu), Portfolio, About, Blog, Contact

#### Footer
Comprehensive footer with links and newsletter.

**Sections:**
- Brand and contact info
- Link columns (Services, Company, Resources, Legal)
- Newsletter subscription
- Social media links
- Copyright and utilities

### Section Components (`/src/components/sections/`)

#### Hero
Full-screen hero section with animations.

**Features:**
- Animated gradient background
- Floating orb animations
- Badge with icon
- Gradient text headline
- Dual CTAs
- Statistics grid
- Scroll indicator

**Animations:**
- Orb floating (Framer Motion)
- Staggered content reveal
- Scroll indicator pulse

#### ServiceCard
Individual service card with hover effects.

**Props:**
- `title` - Service name
- `description` - Brief description
- `icon` - Lucide icon component
- `offerings` - Array of features
- `gradient` - Gradient class
- `href` - Link URL
- `delay` - Animation delay

**Features:**
- Icon with gradient background
- Offerings list (max 5 visible)
- Hover lift effect
- Gradient border on hover

#### ServicesGrid
Grid layout for service cards.

**Features:**
- Section header
- 4-column responsive grid
- Staggered animations
- Service data integration

#### PortfolioGrid
Filterable portfolio showcase.

**Features:**
- Category filtering
- Animated grid layout
- Project cards with:
  - Image placeholder with gradient
  - Category badge
  - Client and title
  - Tags
  - Result metrics
- Modal transitions
- "View All" CTA

**Categories:**
- All, Web Development, AI Solutions, Business Planning, Tokenomics

#### ProcessTimeline
Vertical timeline showing process steps.

**Features:**
- 5-step process visualization
- Alternating left/right layout (desktop)
- Icon with gradient background
- Step numbers
- Connecting line (gradient)
- Scroll-triggered animations

**Steps:**
1. Discovery & Analysis
2. Strategy & Planning
3. Design & Development
4. Testing & Launch
5. Support & Growth

#### TestimonialCarousel
Auto-rotating testimonial carousel.

**Features:**
- Auto-advance (7 seconds)
- Manual navigation (arrows)
- Dot indicators
- 5-star ratings
- Client avatars (gradient initials)
- Slide animations
- Statistics bar

**Navigation:**
- Previous/Next buttons
- Clickable dots
- Touch/swipe support (via Framer Motion)

### Form Components (`/src/components/forms/`)

#### ContactForm
Multi-step contact form with validation.

**Steps:**
1. **Basic Information**
   - Name, Email (required)
   - Phone, Company (optional)
   - Service selection (required)

2. **Project Details**
   - Budget range (required)
   - Timeline (required)
   - Project type (optional)

3. **Additional Information**
   - Message (optional)
   - Privacy consent

**Features:**
- Progress indicator
- Step validation
- Slide transitions
- Success screen
- Form state management

**Form Data:**
```typescript
interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  projectType?: string
  budget?: string
  timeline?: string
  message: string
}
```

## Design Patterns

### Glass Morphism
Used throughout for modern, premium feel:
```css
bg-white/5 backdrop-blur-sm border border-white/10
```

### Gradient Buttons
Primary CTA style:
```css
bg-gradient-to-r from-indigo-600 to-purple-600
```

### Hover Effects
Consistent lift effect:
```tsx
whileHover={{ y: -8 }}
```

### Animation Timing
- Fast interactions: 0.2-0.3s
- Content reveals: 0.5-0.6s
- Background animations: 8-10s

## Utilities

### cn() Function
Merges Tailwind classes with clsx and tailwind-merge:

```typescript
import { cn } from "@/lib/utils"

<div className={cn("base-class", condition && "conditional-class")} />
```

## TypeScript Types (`/src/types/`)

### Service
```typescript
interface Service {
  id: string
  title: string
  description: string
  icon: LucideIcon
  offerings: string[]
  slug: string
  gradient: string
}
```

### PortfolioItem
```typescript
interface PortfolioItem {
  id: string
  title: string
  client: string
  category: string
  description: string
  image: string
  tags: string[]
  results: { metric: string; value: string }[]
  slug: string
}
```

### Testimonial
```typescript
interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
  rating: number
}
```

## Responsive Design

### Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1279px
- Laptop: 1280px - 1919px
- Desktop: 1920px+

### Grid Systems
- Services: 1 col (mobile) → 2 col (tablet) → 4 col (desktop)
- Portfolio: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Features: Flexible based on content

## Animation Guidelines

### Framer Motion Patterns

**Fade In:**
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

**Stagger Children:**
```tsx
variants={container}
initial="hidden"
animate="show"
```

**Hover:**
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Color contrast ratios (WCAG AA)

## Performance

- Code splitting by route
- Lazy loading images
- Optimized animations (transform/opacity only)
- Minimal re-renders
- Efficient state management

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the component demo.

### Build

```bash
npm run build
npm start
```

## File Structure

```
src/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── layout/           # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── sections/         # Page sections
│   │   ├── hero.tsx
│   │   ├── service-card.tsx
│   │   ├── services-grid.tsx
│   │   ├── portfolio-grid.tsx
│   │   ├── process-timeline.tsx
│   │   └── testimonial-carousel.tsx
│   ├── forms/            # Form components
│   │   └── contact-form.tsx
│   ├── demo.tsx          # Component showcase
│   └── index.ts          # Exports
├── lib/
│   └── utils.ts          # Utility functions
├── types/
│   └── index.ts          # TypeScript types
└── styles/
    └── globals.css       # Global styles
```

## Best Practices

1. **Component Composition**: Build complex UIs from simple components
2. **TypeScript**: Use proper typing for all props and data
3. **Accessibility**: Include ARIA labels and semantic HTML
4. **Performance**: Lazy load heavy components
5. **Consistency**: Follow established patterns
6. **Documentation**: Comment complex logic

## Support

For questions or issues, contact the development team.

---

**Version**: 1.0.0
**Last Updated**: October 2025
**Maintained By**: AiPlace Development Team
