# AiPlace Website - Architecture Documentation

## Overview

This directory contains comprehensive architecture documentation for the AiPlace website, a modern AI services platform built with Next.js 14.

**Brand**: "AiPlace - Where Creativity Meets AI"

**Design Language**: Modern, tech-forward platform with gradient branding (cyan → purple → magenta) symbolizing AI innovation.

---

## Documentation Index

### 1. [Site Structure](./01-site-structure.md)
**Complete page hierarchy and content organization**

- Site map (Home, Services, Portfolio, About, Contact)
- Page-by-page specifications
- Navigation structure
- SEO metadata strategy
- Analytics tracking plan
- Accessibility requirements

**Key Sections**:
- 5 primary pages + additional legal/blog pages
- Detailed section breakdowns
- User flow diagrams
- Performance targets

---

### 2. [Component Architecture](./02-component-hierarchy.md)
**Atomic design system and component organization**

- Component hierarchy (Atoms → Molecules → Organisms → Templates)
- 60-75 reusable components
- State management patterns
- TypeScript interfaces
- Development guidelines

**Component Categories**:
- **Atoms**: Button, Input, Typography, Icon, Badge, Skeleton
- **Molecules**: Card, FormField, ServiceCard, ProjectCard, TestimonialCard
- **Organisms**: Header, Footer, HeroSection, ContactForm, PortfolioGrid
- **Templates**: Page layouts, project detail templates

---

### 3. [Design System](./03-design-system.md)
**Complete design specifications and style guide**

- **Color System**: Brand gradients, extended palettes, semantic colors
- **Typography**: Font families, type scale, responsive sizing
- **Spacing**: 8px grid system, section padding
- **Shadows & Elevation**: 6-level shadow system, brand glows
- **Effects**: Transitions, animations, blur effects
- **Component Styles**: Buttons, cards, inputs with all variants

**Design Tokens**:
- 50+ color variables
- 13 font sizes
- 16 spacing values
- 7 border radius options
- Custom animations

---

### 4. [Responsive Strategy](./04-responsive-strategy.md)
**Mobile-first responsive design system**

- **Breakpoints**: xs (0), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Layout Patterns**: Grid systems, flexbox patterns, container widths
- **Component Behavior**: How each component adapts across breakpoints
- **Typography Scale**: Responsive font sizing
- **Touch Optimization**: 44x44px minimum targets, hover alternatives
- **Performance**: Conditional loading, responsive images

**Testing Matrix**:
- iPhone SE to 4K displays
- Portrait and landscape orientations
- Touch and mouse interactions

---

### 5. [Animation Patterns](./05-animation-patterns.md)
**Animation system and interaction design**

- **Entrance Animations**: Fade in, slide up, scale in, stagger
- **Scroll Animations**: Intersection Observer, parallax, progress indicators
- **Hover Effects**: Card lifts, scale, gradient shifts, image zoom, glows
- **Loading States**: Spinners, skeletons, shimmers, progress bars
- **Modal Animations**: Entrance/exit, slide-overs
- **Brand Animations**: AI particles, gradient text, logo reveal

**Animation Libraries**:
- Framer Motion (primary)
- GSAP (complex animations)
- CSS animations (simple transitions)

**Accessibility**:
- `prefers-reduced-motion` support
- Instant fallbacks
- Keyboard-friendly

---

### 6. [Tech Stack](./06-tech-stack.md)
**Complete technology decisions and dependencies**

**Core Technologies**:
- **Framework**: Next.js 14 (App Router, React Server Components)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4+
- **UI Primitives**: Radix UI + shadcn/ui
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State Management**: React Query + Zustand
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

**Development Tools**:
- ESLint + Prettier
- Vitest (unit tests)
- Playwright (E2E tests)
- Storybook (optional)

**Bundle Size Targets**:
- First Load JS: <150 KB (gzipped)
- CSS: <15 KB (gzipped)

---

### 7. [Architecture Decision Records](./07-adrs.md)
**Key architectural decisions with rationale**

**Documented Decisions**:
1. Use Next.js 14 with App Router
2. Use Tailwind CSS for styling
3. Use TypeScript for type safety
4. Use Supabase for backend
5. Use Framer Motion for animations
6. Use React Query for server state
7. Use Radix UI for accessibility
8. Use Zod for validation
9. Deploy on Vercel
10. Use Resend for emails

**Each ADR Includes**:
- Context and problem
- Decision made
- Rationale
- Alternatives considered
- Consequences (pros/cons)
- Implementation notes

---

### 8. [Data Flow](./08-data-flow.md)
**State management and data architecture**

**State Layers**:
1. **Server State**: React Query for API data, caching, mutations
2. **Client State**: useState/useReducer for local UI state
3. **Global State**: Zustand for cross-component state
4. **URL State**: Search params for shareable filters

**Data Flow Patterns**:
- Server Components → Initial SSR data
- Client Components → Interactive data fetching
- Hybrid approach → SSR + client hydration
- Form mutations → Server Actions
- Optimistic updates → React Query

**Examples**:
- Contact form submission flow
- Portfolio filtering with URL state
- Real-time data with Supabase subscriptions
- Cache invalidation strategies

---

### 9. [Performance Optimization](./09-performance-optimization.md)
**Comprehensive performance strategy**

**Core Web Vitals Targets**:
- LCP: <2.5s
- FID: <100ms
- CLS: <0.1

**Optimization Strategies**:
1. **Images**: next/image, AVIF/WebP, lazy loading, blur placeholders
2. **Code Splitting**: Route-based, dynamic imports, prefetching
3. **Fonts**: next/font, subsetting, variable fonts, swap strategy
4. **JavaScript**: Tree shaking, bundle analysis, remove unused code
5. **CSS**: Tailwind purging, critical CSS inlining
6. **Rendering**: SSG, ISR, SSR, CSR (strategic use)
7. **Caching**: HTTP caching, React Query cache, CDN
8. **Database**: Query optimization, indexes, pagination

**Monitoring**:
- Vercel Analytics
- Speed Insights
- Lighthouse CI
- Real User Monitoring (RUM)

**Performance Budget**:
- 150 KB first load JS
- 15 KB CSS
- 1 MB initial page weight

---

## Quick Reference

### Project Structure
```
aiplace-website/
├── docs/architecture/        # This directory
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable components
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities, Supabase client
│   ├── stores/               # Zustand stores
│   └── types/                # TypeScript types
├── public/                   # Static assets
└── tests/                    # Test files
```

---

### Development Commands

```bash
# Development
npm run dev              # Start dev server

# Build & Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # TypeScript check

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests

# Analysis
ANALYZE=true npm run build  # Bundle analysis
```

---

### Environment Setup

**Required Environment Variables**:
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
RESEND_API_KEY=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

---

## Design Principles

### 1. Mobile-First
Start with mobile design, enhance for larger screens.

### 2. Accessibility-First
WCAG 2.1 AA compliance is non-negotiable.

### 3. Performance is a Feature
Fast loading times and smooth interactions are core to UX.

### 4. Type Safety
TypeScript throughout, runtime validation with Zod.

### 5. Component Reusability
Build once, use everywhere. Atomic design principles.

### 6. Progressive Enhancement
Basic functionality works everywhere, enhanced features for modern browsers.

### 7. User-Centric
Every decision optimized for user experience.

---

## Performance Targets Summary

| Metric | Target | Priority |
|--------|--------|----------|
| Lighthouse Score | >95 | High |
| LCP | <2.5s | Critical |
| FID | <100ms | Critical |
| CLS | <0.1 | Critical |
| TTFB | <600ms | High |
| First Load JS | <150 KB | High |
| Total Page Weight | <1 MB | Medium |

---

## Browser Support

**Modern Browsers** (Last 2 versions):
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile Safari
- Chrome Mobile

**Progressive Enhancement** for:
- Older browsers (basic functionality)
- JavaScript disabled (core content accessible)
- Slow connections (optimized assets)

---

## Accessibility Compliance

**WCAG 2.1 Level AA Requirements**:
- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Color contrast ≥4.5:1
- [ ] Alt text for images
- [ ] Form labels and errors
- [ ] Screen reader friendly
- [ ] Reduced motion support

---

## Next Steps

1. **Review Documentation**: Read through each architecture document
2. **Set Up Environment**: Configure `.env.local` with required variables
3. **Install Dependencies**: Run `npm install`
4. **Start Development**: Run `npm run dev`
5. **Create Components**: Follow component architecture guidelines
6. **Implement Pages**: Build pages according to site structure
7. **Optimize**: Apply performance optimizations
8. **Test**: Run tests and Lighthouse audits
9. **Deploy**: Push to Vercel for automatic deployment

---

## Contributing to Documentation

When updating architecture:
1. Update relevant `.md` file(s)
2. Add new ADR if making major decision
3. Update this README index if adding new doc
4. Keep diagrams and examples up to date
5. Include code examples where helpful
6. Maintain consistent formatting

---

## Resources

**Official Documentation**:
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Supabase Docs](https://supabase.com/docs)

**Design References**:
- [Vercel Design System](https://vercel.com/design)
- [Radix UI Components](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

**Performance**:
- [web.dev Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/pages/building-your-application/optimizing)

---

## Changelog

**2025-10-06**: Initial architecture documentation created
- Complete site structure
- Component hierarchy
- Design system specifications
- Responsive strategy
- Animation patterns
- Tech stack decisions
- ADRs
- Data flow architecture
- Performance optimization strategy

---

## Support

For questions or clarifications about the architecture:
1. Review this documentation thoroughly
2. Check ADRs for decision rationale
3. Consult official library documentation
4. Open discussion with team

---

**Document Version**: 1.0.0
**Last Updated**: 2025-10-06
**Maintained By**: System Architecture Team
