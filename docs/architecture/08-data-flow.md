# AiPlace Website - Data Flow & State Management

## Overview

This document defines how data flows through the AiPlace website, from user interactions to database persistence, and how state is managed across the application.

---

## 1. Data Flow Architecture

### 1.1 High-Level Data Flow Diagram

```
┌─────────────┐
│   Browser   │
│  (Client)   │
└──────┬──────┘
       │
       │ User Interaction
       ▼
┌─────────────────────────────────────┐
│     Next.js Client Components       │
│  - Forms, Interactive UI            │
│  - Client State (useState, Zustand) │
└─────────┬───────────────────────────┘
          │
          │ Data Request/Mutation
          ▼
┌─────────────────────────────────────┐
│      React Query (TanStack)         │
│  - Cache Management                 │
│  - Request Deduplication            │
│  - Optimistic Updates               │
└─────────┬───────────────────────────┘
          │
          │ API Call
          ▼
┌─────────────────────────────────────┐
│    Next.js API Routes/Actions       │
│  - Validation (Zod)                 │
│  - Business Logic                   │
│  - Authentication                   │
└─────────┬───────────────────────────┘
          │
          │ Database Query
          ▼
┌─────────────────────────────────────┐
│         Supabase Backend            │
│  - PostgreSQL Database              │
│  - Authentication                   │
│  - Storage (Images/Files)           │
└─────────────────────────────────────┘
```

---

## 2. State Management Layers

### 2.1 Server State (React Query)

**Purpose**: Manage data from external sources (database, APIs)

**Characteristics**:
- Asynchronous
- Requires caching
- Can be outdated
- Shared across users

**Examples**:
- Portfolio projects
- Blog posts
- Service offerings
- Testimonials
- Team members

**Implementation**:
```typescript
// hooks/useProjects.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export interface Project {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  created_at: string
}

export const useProjects = (category?: string) => {
  return useQuery({
    queryKey: ['projects', category],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) throw error
      return data as Project[]
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

**Query Keys Strategy**:
```typescript
// lib/queryKeys.ts
export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    byCategory: (category: string) => ['projects', category] as const,
    detail: (id: string) => ['projects', 'detail', id] as const,
  },
  blog: {
    all: ['blog'] as const,
    detail: (slug: string) => ['blog', 'detail', slug] as const,
  },
  testimonials: ['testimonials'] as const,
  team: ['team'] as const,
}
```

---

### 2.2 Client State (Local Component State)

**Purpose**: Manage UI-specific state that doesn't need to persist

**Characteristics**:
- Synchronous
- Ephemeral
- User-specific
- Not shared

**Examples**:
- Modal open/closed state
- Form input values (before submission)
- Accordion expanded state
- Hover states
- Loading indicators

**Implementation**:
```typescript
// components/organisms/Modal.tsx
import { useState } from 'react'

export const Modal = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{trigger}</button>
      {isOpen && (
        <div className="modal">
          {children}
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </>
  )
}
```

---

### 2.3 Global Client State (Zustand)

**Purpose**: Share state across components without prop drilling

**Characteristics**:
- Synchronous
- Persists during session
- User-specific
- Shared across components

**Examples**:
- Mobile menu open/closed
- Theme preference (light/dark)
- Shopping cart (if e-commerce)
- User preferences

**Implementation**:
```typescript
// stores/uiStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  mobileMenuOpen: boolean
  theme: 'light' | 'dark'
  toggleMobileMenu: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      mobileMenuOpen: false,
      theme: 'light',
      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage', // localStorage key
      partialize: (state) => ({ theme: state.theme }), // Only persist theme
    }
  )
)

// Usage in components
import { useUIStore } from '@/stores/uiStore'

const Header = () => {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore()

  return (
    <button onClick={toggleMobileMenu}>
      {mobileMenuOpen ? 'Close' : 'Menu'}
    </button>
  )
}
```

---

### 2.4 URL State (Search Params)

**Purpose**: State that should be shareable via URL

**Characteristics**:
- Synchronous
- Shareable
- Bookmarkable
- Persists across refreshes

**Examples**:
- Portfolio filters
- Search queries
- Pagination
- Sorting preferences

**Implementation**:
```typescript
// app/portfolio/page.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function PortfolioPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const category = searchParams.get('category') || 'all'

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('category', newCategory)
    router.push(`/portfolio?${params.toString()}`)
  }

  return (
    <div>
      <FilterButtons
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />
      <ProjectGrid category={category} />
    </div>
  )
}
```

---

## 3. Data Fetching Patterns

### 3.1 Server Components (Default)

**When to use**:
- Initial page load data
- SEO-critical content
- Static or rarely changing data

**Implementation**:
```typescript
// app/portfolio/page.tsx
import { supabase } from '@/lib/supabase'

async function getProjects() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  return data
}

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}
```

---

### 3.2 Client Components with React Query

**When to use**:
- Interactive filtering/sorting
- Real-time updates
- Optimistic updates
- User-specific data

**Implementation**:
```typescript
// app/portfolio/page.tsx
'use client'

import { useProjects } from '@/hooks/useProjects'

export default function PortfolioPage() {
  const { data: projects, isLoading, error } = useProjects()

  if (isLoading) return <SkeletonGrid />
  if (error) return <ErrorMessage error={error} />

  return (
    <div>
      {projects?.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}
```

---

### 3.3 Hybrid Approach (Server + Client)

**When to use**:
- Initial SSR data + client-side updates
- Best of both worlds

**Implementation**:
```typescript
// app/portfolio/page.tsx
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { PortfolioClient } from './PortfolioClient'
import { supabase } from '@/lib/supabase'

async function getProjects() {
  const { data } = await supabase.from('projects').select('*')
  return data
}

export default async function PortfolioPage() {
  const queryClient = new QueryClient()

  // Prefetch on server
  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PortfolioClient />
    </HydrationBoundary>
  )
}

// PortfolioClient.tsx (client component)
'use client'

export const PortfolioClient = () => {
  const { data: projects } = useProjects()
  // Client-side interactivity with server-rendered initial data
}
```

---

## 4. Mutations & Form Handling

### 4.1 Contact Form Flow

```
User fills form
      ↓
Client-side validation (Zod)
      ↓
Server Action submission
      ↓
Server-side validation (Zod)
      ↓
Send email (Resend) + Save to DB
      ↓
Return success/error
      ↓
Update UI (show success message)
```

**Implementation**:
```typescript
// app/contact/actions.ts
'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function submitContactForm(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  // Validate
  const result = contactSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }

  const { name, email, message } = result.data

  try {
    // Send email
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'AiPlace <noreply@aiplace.com>',
      to: 'hello@aiplace.com',
      subject: `New Contact Form from ${name}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    })

    // Save to database
    await supabase.from('contact_submissions').insert({
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return { error: 'Failed to submit form. Please try again.' }
  }
}

// app/contact/ContactForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitContactForm } from './actions'

export const ContactForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    const result = await submitContactForm(formData)

    if (result.success) {
      // Show success message
      toast.success('Thank you! We\'ll be in touch soon.')
    } else {
      // Show error
      toast.error(result.error || 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <textarea {...register('message')} placeholder="Message" />
      {errors.message && <span>{errors.message.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

---

### 4.2 Optimistic Updates (Example: Like Button)

```typescript
// hooks/useLikeProject.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export const useLikeProject = (projectId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .update({ likes: supabase.sql`likes + 1` })
        .eq('id', projectId)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['projects', 'detail', projectId] })

      // Snapshot previous value
      const previousProject = queryClient.getQueryData(['projects', 'detail', projectId])

      // Optimistically update
      queryClient.setQueryData(['projects', 'detail', projectId], (old: any) => ({
        ...old,
        likes: (old?.likes || 0) + 1,
      }))

      return { previousProject }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(
        ['projects', 'detail', projectId],
        context?.previousProject
      )
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['projects', 'detail', projectId] })
    },
  })
}
```

---

## 5. Real-time Data (Future Enhancement)

### 5.1 Supabase Realtime Subscriptions

**Use case**: Live updates for collaborative features

```typescript
// hooks/useRealtimeProjects.ts
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export const useRealtimeProjects = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          // Invalidate queries when data changes
          queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])
}
```

---

## 6. Caching Strategy

### 6.1 React Query Cache Configuration

```typescript
// app/providers.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data considered fresh
      cacheTime: 10 * 60 * 1000, // 10 minutes - cache retention
      refetchOnWindowFocus: false, // Don't refetch on window focus
      refetchOnMount: true, // Refetch on component mount if stale
      retry: 1, // Retry failed requests once
    },
  },
})
```

---

### 6.2 Cache Invalidation Strategy

**When to invalidate**:
1. After successful mutation
2. On user action (manual refresh)
3. On navigation to stale page
4. Time-based (automatic background refetch)

**Implementation**:
```typescript
// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['projects'] })

// Invalidate multiple related queries
queryClient.invalidateQueries({ queryKey: ['projects'] })
queryClient.invalidateQueries({ queryKey: ['portfolio'] })

// Refetch immediately
queryClient.refetchQueries({ queryKey: ['projects'] })

// Remove from cache entirely
queryClient.removeQueries({ queryKey: ['projects', 'detail', '123'] })
```

---

## 7. Error Handling

### 7.1 Error Boundaries

```typescript
// components/ErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    // Log to error tracking service (e.g., Sentry)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

---

### 7.2 Query Error Handling

```typescript
const { data, error, isError } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
  onError: (error) => {
    console.error('Failed to fetch projects:', error)
    toast.error('Failed to load projects. Please try again.')
  },
})

if (isError) {
  return <ErrorMessage error={error} retry={() => refetch()} />
}
```

---

## 8. Data Flow Summary

### Read Flow
```
User visits page
    ↓
Server Component fetches initial data (SSR)
    ↓
Hydration with React Query cache
    ↓
User filters/sorts (client interaction)
    ↓
React Query fetches filtered data
    ↓
Cache updated
    ↓
UI re-renders
```

### Write Flow
```
User submits form
    ↓
Client validation (Zod)
    ↓
Server Action called
    ↓
Server validation (Zod)
    ↓
Database mutation (Supabase)
    ↓
Cache invalidation (React Query)
    ↓
Success notification
    ↓
UI update
```

---

## 9. Performance Considerations

**Optimizations**:
1. **Prefetching**: Prefetch likely next pages
2. **Pagination**: Load data in chunks
3. **Infinite Scroll**: Use `useInfiniteQuery`
4. **Debouncing**: Debounce search queries
5. **Request Deduplication**: React Query handles automatically
6. **Caching**: Aggressive caching with smart invalidation
7. **Parallel Queries**: Fetch independent data in parallel

**Example: Prefetching**:
```typescript
const queryClient = useQueryClient()

const handleProjectHover = (projectId: string) => {
  queryClient.prefetchQuery({
    queryKey: ['projects', 'detail', projectId],
    queryFn: () => fetchProject(projectId),
  })
}
```

---

## Summary

This data flow architecture provides:

✅ **Clear Separation**: Server state vs. client state
✅ **Type Safety**: End-to-end TypeScript with Zod validation
✅ **Performance**: Caching, prefetching, optimistic updates
✅ **Reliability**: Error boundaries, retry logic, fallbacks
✅ **Developer Experience**: React Query DevTools, clear patterns
✅ **Scalability**: Modular hooks, reusable patterns
✅ **User Experience**: Fast UI updates, optimistic feedback

**Key Patterns**:
- Server Components for initial data
- React Query for client data fetching
- Zustand for global UI state
- URL state for shareable filters
- Server Actions for mutations
- Zod for validation
- Error boundaries for resilience
