/**
 * Email Configuration
 * Resend and email service configuration
 */

export const emailConfig = {
  // Resend API
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },

  // Email addresses
  addresses: {
    from: process.env.FROM_EMAIL || 'noreply@aiplace.com',
    admin: process.env.ADMIN_EMAIL || 'contact@aiplace.com',
    support: process.env.SUPPORT_EMAIL || 'support@aiplace.com',
    newsletter: process.env.NEWSLETTER_EMAIL || 'newsletter@aiplace.com',
  },

  // Email templates
  templates: {
    contact: {
      subject: 'Thank you for contacting AiPlace',
      replyTo: process.env.ADMIN_EMAIL,
    },
    newsletter: {
      subject: 'Welcome to AiPlace Newsletter',
      unsubscribeUrl: process.env.NEXT_PUBLIC_BASE_URL + '/newsletter/unsubscribe',
    },
    consultation: {
      subject: 'Your AiPlace Consultation',
      calendarInvite: true,
    },
  },

  // Rate limiting
  rateLimit: {
    maxEmailsPerHour: 100,
    maxEmailsPerDay: 1000,
  },

  // Features
  features: {
    sendConfirmations: true,
    trackOpens: true,
    trackClicks: true,
    attachments: true,
  },
} as const;

export default emailConfig;
