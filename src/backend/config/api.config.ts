/**
 * API Configuration
 * General API settings and configuration
 */

export const apiConfig = {
  // Version
  version: 'v1',
  prefix: '/api',

  // Base URL
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',

  // CORS settings
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  },

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Cache
  cache: {
    enabled: process.env.NODE_ENV === 'production',
    ttl: 300, // 5 minutes
    maxSize: 100, // 100 items
  },

  // Security
  security: {
    recaptcha: {
      enabled: process.env.RECAPTCHA_SECRET_KEY !== undefined,
      secretKey: process.env.RECAPTCHA_SECRET_KEY,
      siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      minScore: 0.5,
    },
    csrf: {
      enabled: true,
      secret: process.env.CSRF_SECRET,
    },
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    },
  },

  // File uploads
  upload: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    destination: 'uploads/',
  },

  // Timeouts
  timeout: {
    default: 30000, // 30 seconds
    longRunning: 60000, // 1 minute
  },
} as const;

export default apiConfig;
