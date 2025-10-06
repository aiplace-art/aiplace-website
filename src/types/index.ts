import { LucideIcon } from "lucide-react"

// Service types
export interface Service {
  id: string
  title: string
  description: string
  icon: LucideIcon
  offerings: string[]
  slug: string
  gradient: string
}

export interface ServiceFeature {
  title: string
  description: string
  icon?: LucideIcon
}

// Portfolio types
export interface PortfolioItem {
  id: string
  title: string
  client: string
  category: string
  description: string
  image: string
  tags: string[]
  results: {
    metric: string
    value: string
  }[]
  slug: string
}

export interface PortfolioCategory {
  id: string
  name: string
  slug: string
  count: number
}

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
  rating: number
}

// Process types
export interface ProcessStep {
  id: string
  title: string
  description: string
  icon: LucideIcon
  duration?: string
}

// Contact form types
export interface ContactFormData {
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

export interface QuoteFormData extends ContactFormData {
  requirements: string[]
  deadline?: Date
  attachments?: File[]
}

// Blog types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: Author
  category: string
  tags: string[]
  publishedAt: Date
  updatedAt?: Date
  readingTime: number
  featuredImage?: string
}

export interface Author {
  id: string
  name: string
  role: string
  avatar?: string
  bio?: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

// Team types
export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  expertise: string[]
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

// Analytics types
export interface PageView {
  page: string
  timestamp: Date
  referrer?: string
  userAgent?: string
}

// Newsletter types
export interface NewsletterSubscription {
  email: string
  subscribedAt: Date
  status: 'active' | 'pending' | 'unsubscribed'
  preferences?: string[]
}

// Booking types
export interface BookingRequest {
  id: string
  name: string
  email: string
  phone?: string
  service: string
  preferredDate: Date
  preferredTime: string
  duration: number
  notes?: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

// FAQ types
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
  children?: NavItem[]
}

// SEO types
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonical?: string
  noindex?: boolean
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  page: number
  pageSize: number
  totalPages: number
  totalItems: number
}

// Form validation types
export type FormErrors<T> = {
  [K in keyof T]?: string
}

export interface FormState<T> {
  values: T
  errors: FormErrors<T>
  touched: { [K in keyof T]?: boolean }
  isSubmitting: boolean
  isValid: boolean
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Utility types
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
