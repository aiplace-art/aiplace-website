# Architecture Decision Records (ADRs)

## What are ADRs?

Architecture Decision Records document important architectural decisions made during the project. Each ADR describes:
- The context and problem
- Decision made
- Consequences (pros/cons)
- Status (proposed, accepted, deprecated, superseded)

---

## ADR-001: Use Next.js 14 with App Router

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need to choose a framework for building the AiPlace website that provides:
- Excellent SEO capabilities
- Server-side rendering
- Image optimization
- Developer experience
- Production-ready performance

**Decision**:
We will use Next.js 14 with the new App Router (React Server Components).

**Rationale**:
1. **React Server Components**: Reduce client-side JavaScript, improve performance
2. **Built-in Optimization**: Image, font, and script optimization out of the box
3. **SEO-Friendly**: Metadata API, automatic sitemap generation
4. **Developer Experience**: File-based routing, TypeScript support
5. **Vercel Integration**: Optimal deployment platform
6. **Community & Ecosystem**: Large community, extensive documentation

**Alternatives Considered**:
- **Remix**: Great DX, but smaller ecosystem
- **Gatsby**: Static-first, less flexible for dynamic content
- **Create React App + React Router**: Requires more manual setup, no SSR
- **Astro**: Excellent for content-heavy sites, but less suitable for complex interactions

**Consequences**:

**Positive**:
- Best-in-class performance with RSC
- Automatic code splitting
- Streaming and Suspense support
- Built-in API routes
- Easy deployment to Vercel

**Negative**:
- Learning curve for App Router paradigm
- Some third-party libraries not yet compatible with RSC
- Need to be mindful of client vs server components

**Implementation Notes**:
- Use `'use client'` directive for interactive components
- Leverage Server Actions for form submissions
- Implement proper error boundaries

---

## ADR-002: Use Tailwind CSS for Styling

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need a styling solution that:
- Enables rapid development
- Maintains consistency
- Provides good performance
- Supports responsive design
- Allows customization

**Decision**:
We will use Tailwind CSS as our primary styling solution.

**Rationale**:
1. **Utility-First**: Rapid prototyping and development
2. **Performance**: Automatic purging of unused CSS
3. **Consistency**: Design tokens enforced through config
4. **Responsive**: Built-in breakpoint utilities
5. **Customization**: Fully configurable design system
6. **Ecosystem**: Excellent plugin support

**Alternatives Considered**:
- **CSS Modules**: Good encapsulation, but verbose
- **Styled Components**: Runtime overhead, larger bundle
- **Vanilla Extract**: Type-safe, but smaller ecosystem
- **Sass/SCSS**: Requires more manual organization

**Consequences**:

**Positive**:
- Faster development with utility classes
- Smaller CSS bundle (10-15 KB gzipped)
- No naming conflicts
- Easy to maintain consistent spacing/colors
- Great documentation

**Negative**:
- HTML can look cluttered with many classes
- Learning curve for developers unfamiliar with utility-first
- Can be harder to enforce complex design patterns

**Mitigation**:
- Use `@apply` for repetitive patterns
- Create reusable components
- Leverage `clsx` and `tailwind-merge` for dynamic classes

---

## ADR-003: Use TypeScript for Type Safety

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need to ensure code quality, catch errors early, and improve developer experience.

**Decision**:
We will use TypeScript in strict mode for all code.

**Rationale**:
1. **Type Safety**: Catch errors at compile time
2. **IDE Support**: Better autocomplete and refactoring
3. **Documentation**: Types serve as inline documentation
4. **Maintainability**: Easier to refactor large codebases
5. **Next.js Integration**: First-class TypeScript support

**Consequences**:

**Positive**:
- Fewer runtime errors
- Better IntelliSense
- Easier onboarding for new developers
- Refactoring confidence

**Negative**:
- Slight learning curve
- Requires type definitions for third-party libraries
- Slightly slower development initially

**Implementation**:
- Enable `strict: true` in `tsconfig.json`
- Avoid `any` type; use `unknown` when necessary
- Define interfaces for all data structures
- Use Zod for runtime validation

---

## ADR-004: Use Supabase for Backend Services

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need a backend solution for:
- Database (project portfolio, blog posts, etc.)
- Authentication (future admin panel)
- File storage (images, documents)
- Real-time capabilities (future features)

**Decision**:
We will use Supabase as our backend-as-a-service platform.

**Rationale**:
1. **PostgreSQL**: Robust, SQL-based database
2. **Real-time**: Built-in real-time subscriptions
3. **Authentication**: Complete auth solution
4. **Storage**: S3-compatible file storage
5. **Edge Functions**: Serverless functions support
6. **Developer Experience**: Excellent Next.js integration
7. **Open Source**: Can self-host if needed
8. **Pricing**: Generous free tier

**Alternatives Considered**:
- **Firebase**: Good, but NoSQL might not suit structured data
- **Prisma + PostgreSQL**: Great, but requires separate auth solution
- **MongoDB + Atlas**: NoSQL better for unstructured data
- **Custom Backend**: Too much overhead

**Consequences**:

**Positive**:
- All-in-one solution (database, auth, storage)
- Automatic API generation
- Type-safe with generated TypeScript types
- Real-time capabilities out of the box
- Excellent documentation

**Negative**:
- Vendor lock-in (mitigated by open-source nature)
- Requires learning Supabase-specific APIs
- May be overkill for simple static content

**Migration Path**:
If migration is needed, PostgreSQL dump can be imported elsewhere.

---

## ADR-005: Use Framer Motion for Animations

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need an animation library for:
- Page transitions
- Component entrance/exit
- Micro-interactions
- Scroll-triggered animations

**Decision**:
We will use Framer Motion as our primary animation library.

**Rationale**:
1. **Declarative API**: Easy to reason about animations
2. **Layout Animations**: Automatic FLIP animations
3. **Gestures**: Built-in drag, hover, tap support
4. **TypeScript**: Full type safety
5. **Performance**: GPU-accelerated
6. **Next.js Compatibility**: Works with App Router (client components)

**Alternatives Considered**:
- **CSS Animations**: Limited control, no gesture support
- **GSAP**: Excellent performance, but imperative API
- **React Spring**: Physics-based, but steeper learning curve
- **Anime.js**: Good for SVG, but not React-first

**Consequences**:

**Positive**:
- Smooth, professional animations
- Easy to implement complex transitions
- Gesture support for interactive elements
- Variants system for coordinated animations

**Negative**:
- Adds ~35 KB to bundle (gzipped)
- All animated components must be client components
- Can impact performance if overused

**Guidelines**:
- Use `prefers-reduced-motion` for accessibility
- Lazy load Framer Motion for non-critical animations
- Keep animations subtle and purposeful

---

## ADR-006: Use React Query for Server State Management

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need to manage server state (data fetching, caching, mutations) efficiently.

**Decision**:
We will use TanStack Query (React Query) for server state management.

**Rationale**:
1. **Caching**: Automatic caching and background refetching
2. **DevTools**: Excellent debugging experience
3. **TypeScript**: Full type safety
4. **Optimistic Updates**: Built-in support
5. **SSR Support**: Works with Next.js Server Components
6. **Lightweight**: Minimal bundle impact

**Alternatives Considered**:
- **SWR**: Similar, but React Query has more features
- **Redux + RTK Query**: Overkill for our needs
- **Native fetch + useState**: No caching, manual error handling

**Consequences**:

**Positive**:
- Simplified data fetching logic
- Automatic loading and error states
- Background refetching
- Request deduplication
- Pagination and infinite scroll support

**Negative**:
- Learning curve for query keys and cache management
- Requires client component wrapper

**Implementation**:
```typescript
// Use in client components
const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

---

## ADR-007: Use Radix UI for Accessible Components

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need accessible, unstyled component primitives for:
- Modals/Dialogs
- Dropdowns
- Accordions
- Tabs
- Tooltips

**Decision**:
We will use Radix UI primitives for complex interactive components.

**Rationale**:
1. **Accessibility**: WCAG 2.1 AA compliant out of the box
2. **Unstyled**: Full control over styling with Tailwind
3. **Keyboard Navigation**: Built-in keyboard support
4. **Composable**: Flexible composition patterns
5. **TypeScript**: Fully typed
6. **Maintained**: Backed by WorkOS

**Alternatives Considered**:
- **Headless UI**: Good, but less comprehensive
- **Reach UI**: Solid, but less active development
- **Custom Components**: Too much work to make accessible
- **Material UI**: Opinionated styling

**Consequences**:

**Positive**:
- Guaranteed accessibility
- No need to reinvent complex patterns
- Focus states, ARIA labels handled
- Works seamlessly with Tailwind

**Negative**:
- Slightly larger bundle (tree-shakeable)
- Need to style each component
- Learning curve for composition API

**Usage Pattern**:
Use shadcn/ui for pre-styled Radix components, customize as needed.

---

## ADR-008: Use Zod for Schema Validation

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need runtime validation for:
- Form inputs
- API payloads
- Environment variables
- External data

**Decision**:
We will use Zod for schema validation.

**Rationale**:
1. **TypeScript-First**: Infer types from schemas
2. **Runtime Validation**: Catch errors at runtime
3. **Excellent Errors**: Detailed error messages
4. **Composable**: Build complex schemas from simple ones
5. **React Hook Form Integration**: Works seamlessly
6. **Server Actions**: Validate in Next.js Server Actions

**Alternatives Considered**:
- **Yup**: Similar, but not TypeScript-first
- **Joi**: More verbose syntax
- **Ajv**: JSON Schema-based, less ergonomic
- **Manual Validation**: Error-prone, repetitive

**Consequences**:

**Positive**:
- Single source of truth for types and validation
- Catch invalid data before it reaches database
- Better error messages to users
- Type safety throughout the stack

**Negative**:
- Adds ~15 KB to bundle
- Learning curve for complex schemas

**Example**:
```typescript
const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().min(18).optional(),
})

type User = z.infer<typeof userSchema>
```

---

## ADR-009: Deploy on Vercel

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need a hosting platform for production deployment.

**Decision**:
We will deploy the AiPlace website on Vercel.

**Rationale**:
1. **Next.js Optimized**: Built by the Next.js team
2. **Zero Config**: Automatic deployment from Git
3. **Edge Network**: Global CDN for fast loading
4. **Preview Deployments**: Automatic previews for PRs
5. **Analytics**: Built-in performance monitoring
6. **Serverless Functions**: API routes run on serverless
7. **Free SSL**: Automatic HTTPS

**Alternatives Considered**:
- **Netlify**: Good, but less optimized for Next.js
- **Cloudflare Pages**: Excellent edge network, but newer
- **AWS Amplify**: More complex setup
- **Self-hosted**: Too much operational overhead

**Consequences**:

**Positive**:
- Optimal Next.js performance
- Simple deployment workflow
- Automatic HTTPS and DNS
- Branch previews for testing
- Built-in analytics

**Negative**:
- Vendor lock-in (mitigated by Next.js portability)
- Pricing can scale with usage
- Edge runtime has some limitations

**Deployment Strategy**:
- Production: `main` branch auto-deploys
- Staging: `develop` branch auto-deploys
- Feature branches: Preview deployments

---

## ADR-010: Use Resend for Transactional Emails

**Status**: Accepted

**Date**: 2025-10-06

**Context**:
We need to send transactional emails for:
- Contact form submissions
- Newsletter signups (future)
- Admin notifications

**Decision**:
We will use Resend as our email service provider.

**Rationale**:
1. **Modern API**: Clean, developer-friendly API
2. **React Email**: Built-in support for React email templates
3. **Reliability**: High deliverability rates
4. **Pricing**: Affordable, transparent pricing
5. **TypeScript Support**: Fully typed SDK

**Alternatives Considered**:
- **SendGrid**: Mature, but complex API
- **Postmark**: Excellent, but more expensive
- **Mailgun**: Good, but dated developer experience
- **AWS SES**: Cheapest, but requires more setup

**Consequences**:

**Positive**:
- Simple integration with Next.js API routes
- Beautiful emails with React Email
- Good deliverability
- Easy to track emails

**Negative**:
- Relatively new service
- Smaller ecosystem than SendGrid

**Implementation**:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'AiPlace <noreply@aiplace.com>',
  to: 'hello@aiplace.com',
  subject: 'New Contact Form',
  html: '<p>...</p>',
})
```

---

## ADR Template (for future ADRs)

```markdown
## ADR-XXX: [Title]

**Status**: [Proposed | Accepted | Deprecated | Superseded]

**Date**: YYYY-MM-DD

**Context**:
[Describe the context and problem statement]

**Decision**:
[State the decision clearly]

**Rationale**:
[List reasons for the decision]

**Alternatives Considered**:
[List alternatives and why they were rejected]

**Consequences**:

**Positive**:
[List positive outcomes]

**Negative**:
[List negative outcomes and trade-offs]

**Implementation Notes**:
[Any specific notes about implementation]
```

---

## Summary

These ADRs document the key architectural decisions for the AiPlace website:

1. **Framework**: Next.js 14 with App Router
2. **Styling**: Tailwind CSS
3. **Language**: TypeScript (strict mode)
4. **Backend**: Supabase
5. **Animations**: Framer Motion
6. **State Management**: React Query
7. **UI Components**: Radix UI
8. **Validation**: Zod
9. **Deployment**: Vercel
10. **Email**: Resend

**Key Principles**:
- Modern, production-ready technologies
- Developer experience matters
- Performance is a feature
- Accessibility is non-negotiable
- Type safety throughout

**Review Process**:
ADRs should be reviewed when:
- New major features are planned
- Performance issues arise
- Technology landscape changes significantly
- Team composition changes

**Updating ADRs**:
- Create new ADR to supersede old ones
- Don't delete historical ADRs
- Link superseding ADRs
- Maintain chronological order
