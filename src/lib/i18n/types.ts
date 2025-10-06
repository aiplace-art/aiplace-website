// Type definitions for i18n system

export type Language = 'en' | 'ru'

// Full translation structure matching the JSON files
export interface TranslationKeys {
  nav: {
    services: string
    portfolio: string
    about: string
    blog: string
    contact: string
    getStarted: string
  }
  hero: {
    badge: string
    title: string
    titleLine2: string
    description: string
    getStarted: string
    learnMore: string
    stats: {
      projects: string
      satisfaction: string
      support: string
    }
  }
  services: {
    title: string
    description: string
    descriptionLine2: string
    webDev: {
      title: string
      description: string
    }
    ai: {
      title: string
      description: string
    }
    business: {
      title: string
      description: string
    }
    tokenomics: {
      title: string
      description: string
    }
  }
  portfolio: {
    title: string
    description: string
    categories: {
      all: string
      webDev: string
      ai: string
      business: string
      tokenomics: string
    }
    quickView: string
    caseStudy: string
    viewAll: string
    projects: Record<string, any>
  }
  testimonials: {
    title: string
    description: string
    stats: {
      projectsCompleted: string
      clientSatisfaction: string
      activeClients: string
      averageRating: string
    }
  }
  contact: {
    title: string
    description: string
    descriptionLine2: string
    ctaTitle: string
    ctaDescription: string
    contactUs: string
    emailUs: string
    callUs: string
    form: Record<string, any>
    info: Record<string, any>
    social: Record<string, any>
    hours: Record<string, any>
  }
  cta: {
    title: string
    description: string
    getStarted: string
    stats: {
      projectsDelivered: string
      clientSatisfaction: string
      activeClients: string
      premiumSupport: string
    }
  }
  footer: {
    tagline: string
    email: string
    phone: string
    location: string
    sections: {
      services: string
      company: string
      resources: string
      legal: string
    }
    services: {
      webDevelopment: string
      aiSolutions: string
      businessPlanning: string
      tokenomics: string
    }
    company: {
      about: string
      portfolio: string
      blog: string
      careers: string
    }
    resources: {
      caseStudies: string
      documentation: string
      support: string
      faq: string
    }
    legal: {
      privacy: string
      terms: string
      cookies: string
    }
    newsletter: {
      title: string
      subtitle: string
      placeholder: string
      button: string
    }
    copyright: string
    backToTop: string
  }
}

export interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: TranslationKeys
}
