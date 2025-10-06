# AiPlace Website - Component Architecture & Hierarchy

## Component Design Philosophy

**Principles**:
1. **Atomic Design**: Components organized from atoms → molecules → organisms → templates → pages
2. **Composition over Inheritance**: Build complex UIs from simple, reusable components
3. **Single Responsibility**: Each component has one clear purpose
4. **Prop-driven**: Components configured via props, not internal state where possible
5. **Accessibility-first**: WCAG 2.1 AA compliance built-in

---

## 1. Component Hierarchy Overview

```
app/
├── layout.tsx (Root Layout)
│   ├── <Providers>
│   ├── <Header>
│   ├── <Main>{children}</Main>
│   └── <Footer>
│
└── components/
    ├── atoms/           # Basic building blocks
    ├── molecules/       # Simple component combinations
    ├── organisms/       # Complex component combinations
    ├── templates/       # Page-level layouts
    ├── layouts/         # Layout components
    └── features/        # Feature-specific components
```

---

## 2. Atoms (Basic Building Blocks)

### 2.1 Button Component
**Location**: `components/atoms/Button.tsx`

```typescript
// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg, xl
// States: default, hover, active, disabled, loading

<Button variant="primary" size="lg" loading={isLoading}>
  Get Started
</Button>
```

**Props**:
- variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- size: 'sm' | 'md' | 'lg' | 'xl'
- loading: boolean
- disabled: boolean
- icon: ReactNode (optional)
- onClick: () => void
- children: ReactNode

**Styling**:
- Primary: Gradient background (cyan → purple → magenta)
- Hover: Scale 1.02, brightness increase
- Active: Scale 0.98
- Focus: Brand-colored outline ring

---

### 2.2 Input Component
**Location**: `components/atoms/Input.tsx`

```typescript
<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  error={errors.email}
  required
/>
```

**Props**:
- type: 'text' | 'email' | 'tel' | 'password' | 'number'
- label: string
- placeholder: string
- error: string (optional)
- required: boolean
- disabled: boolean
- icon: ReactNode (optional)

**Features**:
- Built-in validation states
- Error message display
- Icon support (left/right)
- Accessibility labels

---

### 2.3 Typography Components
**Location**: `components/atoms/Typography.tsx`

```typescript
<Heading level={1} gradient>Where Creativity Meets AI</Heading>
<Text size="lg" weight="medium">Subheading text</Text>
<Label>Form label</Label>
```

**Components**:
- `<Heading>`: h1-h6 with level prop
- `<Text>`: paragraph and span text
- `<Label>`: form labels
- `<Link>`: styled Next.js Link

**Props**:
- size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
- weight: 'normal' | 'medium' | 'semibold' | 'bold'
- gradient: boolean (applies brand gradient)
- align: 'left' | 'center' | 'right'

---

### 2.4 Icon Component
**Location**: `components/atoms/Icon.tsx`

```typescript
<Icon name="brain" size={24} className="text-purple-500" />
```

**Props**:
- name: string (icon identifier)
- size: number
- className: string
- aria-label: string

**Icon Library**: Lucide React (recommended) or Heroicons

---

### 2.5 Badge Component
**Location**: `components/atoms/Badge.tsx`

```typescript
<Badge variant="success">AI Development</Badge>
```

**Variants**:
- success (green)
- info (blue)
- warning (yellow)
- danger (red)
- gradient (brand colors)

---

### 2.6 Skeleton Loader
**Location**: `components/atoms/Skeleton.tsx`

```typescript
<Skeleton width="100%" height={200} />
```

**Purpose**: Loading states for async content

---

## 3. Molecules (Simple Combinations)

### 3.1 Card Component
**Location**: `components/molecules/Card.tsx`

```typescript
<Card variant="elevated" hover>
  <CardHeader>
    <Icon name="sparkles" />
    <CardTitle>AI Development</CardTitle>
  </CardHeader>
  <CardContent>
    Custom AI solutions tailored to your business needs.
  </CardContent>
  <CardFooter>
    <Button variant="outline">Learn More</Button>
  </CardFooter>
</Card>
```

**Variants**:
- flat (no shadow)
- elevated (subtle shadow)
- outlined (border)
- gradient (gradient border/background)

**Features**:
- Hover effects (lift, glow)
- Optional image/icon header
- Flexible content area
- Action footer

---

### 3.2 Form Field Component
**Location**: `components/molecules/FormField.tsx`

```typescript
<FormField
  label="Email"
  name="email"
  type="email"
  error={errors.email}
  helperText="We'll never share your email"
  required
/>
```

**Composition**: Label + Input + Error/Helper Text

---

### 3.3 Service Card
**Location**: `components/molecules/ServiceCard.tsx`

```typescript
<ServiceCard
  icon="brain"
  title="AI Development"
  description="Custom AI solutions..."
  features={["Feature 1", "Feature 2"]}
  link="/services/ai-development"
/>
```

**Features**:
- Icon with gradient background
- Title and description
- Feature list with checkmarks
- CTA link/button
- Hover animations

---

### 3.4 Project Card
**Location**: `components/molecules/ProjectCard.tsx`

```typescript
<ProjectCard
  title="E-commerce AI Chatbot"
  category="AI Development"
  image="/projects/chatbot.jpg"
  tags={["NLP", "Machine Learning"]}
  slug="ecommerce-chatbot"
/>
```

**Features**:
- Image with overlay on hover
- Category badge
- Title reveal animation
- Tag list
- Click to navigate to detail page

---

### 3.5 Testimonial Card
**Location**: `components/molecules/TestimonialCard.tsx`

```typescript
<TestimonialCard
  quote="AiPlace transformed our business..."
  author="John Doe"
  role="CEO"
  company="Tech Corp"
  avatar="/avatars/john.jpg"
  rating={5}
/>
```

**Features**:
- Quote text
- Author info with avatar
- Star rating
- Company logo (optional)

---

### 3.6 Social Links
**Location**: `components/molecules/SocialLinks.tsx`

```typescript
<SocialLinks
  links={[
    { platform: "linkedin", url: "..." },
    { platform: "twitter", url: "..." },
    { platform: "github", url: "..." }
  ]}
  variant="filled"
/>
```

**Variants**:
- filled (solid background)
- outlined (border)
- ghost (transparent)

---

### 3.7 Stat Card
**Location**: `components/molecules/StatCard.tsx`

```typescript
<StatCard
  value="500+"
  label="Projects Completed"
  icon="check-circle"
  trend="+15%"
/>
```

**Features**:
- Large number display
- Label/description
- Optional icon
- Trend indicator
- Counter animation on scroll into view

---

## 4. Organisms (Complex Combinations)

### 4.1 Header/Navigation
**Location**: `components/organisms/Header.tsx`

```typescript
<Header>
  <Logo />
  <Navigation />
  <CTAButton />
  <MobileMenuToggle />
</Header>
```

**Features**:
- Sticky/fixed positioning
- Scroll-based background blur
- Desktop horizontal nav
- Mobile hamburger menu
- Dropdown menus (if needed)
- Active route highlighting
- Smooth scroll to sections

**Responsive Behavior**:
- Desktop: Horizontal menu
- Tablet/Mobile: Hamburger → full-screen overlay

---

### 4.2 Footer
**Location**: `components/organisms/Footer.tsx`

```typescript
<Footer>
  <FooterColumn title="Company" links={[...]} />
  <FooterColumn title="Services" links={[...]} />
  <FooterColumn title="Resources" links={[...]} />
  <FooterColumn title="Connect">
    <SocialLinks />
  </FooterColumn>
  <FooterBottom>
    <Copyright />
    <LegalLinks />
  </FooterBottom>
</Footer>
```

**Features**:
- Multi-column layout
- Newsletter signup (optional)
- Social media links
- Legal links
- Copyright notice
- Gradient accent line at top

---

### 4.3 Hero Section
**Location**: `components/organisms/HeroSection.tsx`

```typescript
<HeroSection
  headline="Where Creativity Meets AI"
  subheadline="Transform your business..."
  primaryCTA={{ text: "Get Started", href: "/contact" }}
  secondaryCTA={{ text: "View Portfolio", href: "/portfolio" }}
  background="gradient"
  animation="particles"
/>
```

**Features**:
- Animated gradient background
- Particle effects (AI theme)
- Animated brain icon
- Text fade-in animations
- CTA buttons
- Scroll indicator

**Variants**:
- Full-screen hero (home)
- Split hero (image + content)
- Minimal hero (inner pages)

---

### 4.4 Services Grid
**Location**: `components/organisms/ServicesGrid.tsx`

```typescript
<ServicesGrid
  services={servicesData}
  columns={3}
  variant="card"
/>
```

**Features**:
- Responsive grid layout
- Service cards with hover effects
- Optional filter/category tabs
- Load more functionality
- Staggered animations on scroll

---

### 4.5 Portfolio Grid
**Location**: `components/organisms/PortfolioGrid.tsx`

```typescript
<PortfolioGrid
  projects={projectsData}
  layout="masonry"
  filters={["All", "AI Development", "ML Solutions"]}
/>
```

**Features**:
- Masonry or standard grid
- Filter system (category, tech, industry)
- Project cards with lazy-loaded images
- Smooth filter transitions
- Load more / infinite scroll
- Search functionality (optional)

---

### 4.6 Contact Form
**Location**: `components/organisms/ContactForm.tsx`

```typescript
<ContactForm
  onSubmit={handleSubmit}
  loading={isSubmitting}
  success={isSuccess}
/>
```

**Fields**:
- Name (required)
- Email (required, validated)
- Phone (optional)
- Company (optional)
- Service interested in (dropdown)
- Message (required, textarea)
- Budget range (optional)
- File attachment (optional)

**Features**:
- Real-time validation
- Error states
- Success state with confetti animation
- Loading state
- Accessibility-compliant
- Spam protection

**Validation**:
- Client-side: Zod or Yup schema
- Server-side: API route validation

---

### 4.7 Testimonial Carousel
**Location**: `components/organisms/TestimonialCarousel.tsx`

```typescript
<TestimonialCarousel
  testimonials={testimonialsData}
  autoplay
  interval={5000}
/>
```

**Features**:
- Auto-rotating carousel
- Navigation dots
- Previous/next arrows
- Pause on hover
- Touch/swipe support
- Accessibility (ARIA live region)

**Library**: Embla Carousel or Swiper

---

### 4.8 FAQ Accordion
**Location**: `components/organisms/FAQAccordion.tsx`

```typescript
<FAQAccordion
  items={faqData}
  allowMultiple={false}
  defaultOpen={[0]}
/>
```

**Features**:
- Expand/collapse animation
- Single or multiple open items
- Search/filter functionality
- Keyboard navigation
- ARIA attributes

**Library**: Radix UI Accordion

---

### 4.9 Timeline Component
**Location**: `components/organisms/Timeline.tsx`

```typescript
<Timeline
  events={companyMilestones}
  orientation="vertical"
  animated
/>
```

**Features**:
- Vertical or horizontal layout
- Milestone markers
- Connecting lines
- Scroll-triggered animations
- Date labels
- Event descriptions

---

### 4.10 Team Grid
**Location**: `components/organisms/TeamGrid.tsx`

```typescript
<TeamGrid
  members={teamData}
  columns={4}
/>
```

**Features**:
- Team member cards
- Photo with hover overlay
- Name, role, bio
- Social links
- Modal or expanded view option

---

### 4.11 Process Steps
**Location**: `components/organisms/ProcessSteps.tsx`

```typescript
<ProcessSteps
  steps={processData}
  orientation="horizontal"
  numbered
/>
```

**Features**:
- Step indicators (numbers/icons)
- Step titles and descriptions
- Connecting lines/arrows
- Responsive layout (horizontal → vertical)
- Scroll animations

---

### 4.12 Tech Stack Showcase
**Location**: `components/organisms/TechStackShowcase.tsx`

```typescript
<TechStackShowcase
  technologies={techData}
  animated
  variant="carousel"
/>
```

**Features**:
- Technology logos
- Tooltips with descriptions
- Carousel or grid layout
- Fade-in animations
- Category grouping

---

## 5. Templates (Page Layouts)

### 5.1 Page Template
**Location**: `components/templates/PageTemplate.tsx`

```typescript
<PageTemplate
  hero={<PageHero title="Services" />}
  sidebar={<Sidebar />} // optional
>
  {/* Page content */}
</PageTemplate>
```

**Features**:
- Consistent page structure
- Optional sidebar
- Breadcrumbs
- SEO metadata
- Skip to content link

---

### 5.2 Project Detail Template
**Location**: `components/templates/ProjectDetailTemplate.tsx`

```typescript
<ProjectDetailTemplate project={projectData}>
  {/* Custom sections */}
</ProjectDetailTemplate>
```

**Sections**:
- Hero image/video
- Project overview
- Challenge & solution
- Results & metrics
- Tech stack
- Gallery
- Next/previous navigation
- CTA section

---

## 6. Features (Domain-Specific Components)

### 6.1 Animation Components
**Location**: `components/features/animations/`

- **ParticleBackground**: Animated particles for hero sections
- **GradientOrb**: Floating gradient spheres
- **ScrollReveal**: Reveal animations on scroll
- **TypewriterEffect**: Animated typing text
- **CounterAnimation**: Animated number counting

---

### 6.2 Interactive Components
**Location**: `components/features/interactive/`

- **AIBrainVisualization**: Animated brain network
- **CapabilityShowcase**: Interactive tech showcase
- **PricingCalculator**: Dynamic pricing estimation
- **ProjectFilter**: Advanced filtering system

---

### 6.3 Media Components
**Location**: `components/features/media/`

- **OptimizedImage**: Next.js Image with blur-up
- **VideoPlayer**: Custom video player with controls
- **ImageGallery**: Lightbox gallery
- **LogoCloud**: Animated logo carousel

---

## 7. Layouts

### 7.1 Root Layout
**Location**: `app/layout.tsx`

```typescript
<html>
  <body>
    <Providers>
      <Header />
      <main>{children}</main>
      <Footer />
    </Providers>
  </body>
</html>
```

---

### 7.2 Section Layout
**Location**: `components/layouts/Section.tsx`

```typescript
<Section
  id="services"
  background="gradient"
  padding="large"
  className="..."
>
  {children}
</Section>
```

**Props**:
- background: 'white' | 'gray' | 'gradient' | 'dark'
- padding: 'none' | 'small' | 'medium' | 'large'
- fullWidth: boolean

---

### 7.3 Container
**Location**: `components/layouts/Container.tsx`

```typescript
<Container maxWidth="xl" centered>
  {children}
</Container>
```

**Max Widths**:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
- full: 100%

---

## 8. Component Communication Patterns

### 8.1 Props Drilling (Small Hierarchies)
```typescript
<Parent data={data}>
  <Child data={data} />
</Parent>
```

### 8.2 Context API (Shared State)
```typescript
// Theme, user preferences, UI state
<ThemeProvider>
  <Component /> // accesses theme via useTheme()
</ThemeProvider>
```

### 8.3 Custom Hooks (Reusable Logic)
```typescript
// useMediaQuery, useIntersectionObserver, useLocalStorage
const isMobile = useMediaQuery('(max-width: 768px)')
```

### 8.4 Server Actions (Form Submissions)
```typescript
// Server-side form handling
const formAction = async (formData: FormData) => {
  'use server'
  // Process form
}
```

---

## 9. State Management Strategy

### 9.1 Local State
**Use Case**: Component-specific state
**Tool**: useState, useReducer

```typescript
const [isOpen, setIsOpen] = useState(false)
```

---

### 9.2 URL State
**Use Case**: Shareable state (filters, pagination)
**Tool**: Next.js searchParams, useRouter

```typescript
const searchParams = useSearchParams()
const category = searchParams.get('category')
```

---

### 9.3 Server State
**Use Case**: Data fetching, caching, mutations
**Tool**: React Query (TanStack Query) or SWR

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects
})
```

---

### 9.4 Global State (if needed)
**Use Case**: Cross-cutting concerns (theme, auth)
**Tool**: Zustand or React Context

```typescript
const { theme, setTheme } = useTheme()
```

---

## 10. Component Development Guidelines

### 10.1 File Structure
```
ComponentName/
├── ComponentName.tsx        # Main component
├── ComponentName.module.css # Styles (if CSS Modules)
├── ComponentName.test.tsx   # Tests
├── ComponentName.stories.tsx # Storybook (optional)
├── index.ts                 # Re-export
└── types.ts                 # TypeScript types
```

### 10.2 Component Template
```typescript
import { FC } from 'react'

interface ComponentNameProps {
  // Props definition
}

export const ComponentName: FC<ComponentNameProps> = ({
  prop1,
  prop2,
  ...props
}) => {
  // Hooks

  // Event handlers

  // Render
  return (
    <div {...props}>
      {/* Component JSX */}
    </div>
  )
}

ComponentName.displayName = 'ComponentName'
```

### 10.3 TypeScript Best Practices
- Always type props interfaces
- Use FC (FunctionComponent) or explicit return types
- Avoid `any` type
- Use union types for variants
- Export types from component files

### 10.4 Accessibility Checklist
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] Color contrast compliance
- [ ] Alt text for images
- [ ] Error messages in forms
- [ ] Skip links for navigation

### 10.5 Performance Considerations
- Lazy load heavy components
- Memoize expensive computations (useMemo)
- Memoize callbacks (useCallback)
- Use React.memo for pure components
- Optimize images with next/image
- Code split by route
- Prefetch critical resources

---

## Summary

This component architecture provides:
- **Scalability**: Atomic design enables easy growth
- **Reusability**: Components can be composed in multiple contexts
- **Maintainability**: Clear separation of concerns
- **Accessibility**: Built-in WCAG compliance
- **Performance**: Optimized for Next.js 14
- **Type Safety**: Full TypeScript coverage
- **Testability**: Isolated, testable components

**Component Count Estimate**:
- Atoms: ~15-20 components
- Molecules: ~20-25 components
- Organisms: ~15-20 components
- Templates: ~5-8 layouts
- Total: ~60-75 reusable components
