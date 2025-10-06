/**
 * Test Configuration
 * Central configuration for all testing thresholds and rules
 */

module.exports = {
  // Performance thresholds (Lighthouse)
  performance: {
    scores: {
      performance: 90,
      accessibility: 90,
      bestPractices: 85,
      seo: 90
    },
    metrics: {
      firstContentfulPaint: 1800,       // ms
      largestContentfulPaint: 2500,     // ms
      cumulativeLayoutShift: 0.1,       // score
      totalBlockingTime: 200,           // ms
      speedIndex: 3400,                 // ms
      timeToInteractive: 3800           // ms
    }
  },

  // Accessibility thresholds
  accessibility: {
    maxErrors: 0,
    maxWarnings: 10,
    standards: ['WCAG2AA', 'Section508'],
    runners: ['axe', 'htmlcs']
  },

  // I18n thresholds
  i18n: {
    requiredLanguages: ['en', 'es', 'fr'],
    minimumCoverage: 95,  // percentage
    allowMissingKeys: false
  },

  // Layout validation
  layout: {
    maxFileSize: 500,     // lines
    requireModular: true,
    checkImports: true,
    maxErrors: 0
  },

  // Visual regression
  visualRegression: {
    threshold: 0.1,       // 10% difference allowed
    failureThreshold: 0.05, // 5% failure threshold
    failureThresholdType: 'percent'
  },

  // Test execution
  execution: {
    timeout: 30000,       // ms
    retries: 2,
    parallel: true,
    headless: true
  },

  // Reporting
  reporting: {
    outputDir: 'docs/testing',
    formats: ['html', 'json', 'markdown'],
    screenshots: true,
    videos: 'on-failure'
  },

  // URLs to test
  testUrls: {
    development: 'http://localhost:3000',
    staging: process.env.STAGING_URL || 'https://staging.aiplace.com',
    production: process.env.PRODUCTION_URL || 'https://aiplace.com'
  },

  // Pages to test
  pages: [
    { name: 'Homepage', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ],

  // Devices to test
  devices: {
    desktop: { width: 1920, height: 1080 },
    laptop: { width: 1366, height: 768 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 }
  },

  // Notification settings
  notifications: {
    onFailure: true,
    onSuccess: false,
    webhookUrl: process.env.WEBHOOK_URL || null
  }
};
