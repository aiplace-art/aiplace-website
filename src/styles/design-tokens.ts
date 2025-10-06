/**
 * AiPlace Design System Tokens
 * Central source of truth for design values
 */

export const designTokens = {
  // Brand Colors
  colors: {
    brand: {
      cyan: '#00D4FF',
      purple: '#9D4EDD',
      magenta: '#FF006E',
      cyanLight: '#33DDFF',
      cyanDark: '#00A8CC',
      purpleLight: '#B366F0',
      purpleDark: '#7B3AB8',
      magentaLight: '#FF3388',
      magentaDark: '#CC0058',
    },

    // Neutral Palette
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0A0A0A',
    },

    // Semantic Colors
    semantic: {
      success: {
        light: '#10B981',
        default: '#059669',
        dark: '#047857',
      },
      warning: {
        light: '#F59E0B',
        default: '#D97706',
        dark: '#B45309',
      },
      error: {
        light: '#EF4444',
        default: '#DC2626',
        dark: '#B91C1C',
      },
      info: {
        light: '#3B82F6',
        default: '#2563EB',
        dark: '#1D4ED8',
      },
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: [
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ].join(', '),
      display: [
        'Space Grotesk',
        'Inter',
        'system-ui',
        'sans-serif',
      ].join(', '),
      mono: [
        'JetBrains Mono',
        'Fira Code',
        'Consolas',
        'Monaco',
        'monospace',
      ].join(', '),
    },

    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing Scale
  spacing: {
    0: '0px',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
    32: '8rem',      // 128px
    40: '10rem',     // 160px
    48: '12rem',     // 192px
    56: '14rem',     // 224px
    64: '16rem',     // 256px
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    '4xl': '2rem',    // 32px
    '5xl': '2.5rem',  // 40px
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
    none: 'none',

    // Brand Glows
    glowCyan: '0 0 20px rgba(0, 212, 255, 0.5)',
    glowPurple: '0 0 20px rgba(157, 78, 221, 0.5)',
    glowMagenta: '0 0 20px rgba(255, 0, 110, 0.5)',
    glowBrand: '0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(157, 78, 221, 0.2)',
  },

  // Z-Index Scale
  zIndex: {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Transitions
  transitions: {
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    timing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      linear: 'linear',
      bounceIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Animations
  animations: {
    gradient: 'gradient 8s linear infinite',
    gradientSlow: 'gradient 15s linear infinite',
    float: 'float 6s ease-in-out infinite',
    pulseSlow: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    shimmer: 'shimmer 2s linear infinite',
    fadeIn: 'fadeIn 0.5s ease-in',
    fadeInUp: 'fadeInUp 0.6s ease-out',
    fadeInDown: 'fadeInDown 0.6s ease-out',
    slideInLeft: 'slideInLeft 0.5s ease-out',
    slideInRight: 'slideInRight 0.5s ease-out',
    scaleIn: 'scaleIn 0.3s ease-out',
    spinSlow: 'spin 3s linear infinite',
  },

  // Gradients
  gradients: {
    brand: 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 50%, #FF006E 100%)',
    brandReverse: 'linear-gradient(135deg, #FF006E 0%, #9D4EDD 50%, #00D4FF 100%)',
    mesh: 'radial-gradient(at 0% 0%, #00D4FF 0%, transparent 50%), radial-gradient(at 100% 100%, #FF006E 0%, transparent 50%), radial-gradient(at 50% 50%, #9D4EDD 0%, transparent 50%)',
  },
} as const;

export type DesignTokens = typeof designTokens;

// Type helpers for autocomplete
export type BrandColor = keyof typeof designTokens.colors.brand;
export type NeutralColor = keyof typeof designTokens.colors.neutral;
export type SemanticColor = keyof typeof designTokens.colors.semantic;
export type FontSize = keyof typeof designTokens.typography.fontSize;
export type Spacing = keyof typeof designTokens.spacing;
export type BorderRadius = keyof typeof designTokens.borderRadius;
export type Shadow = keyof typeof designTokens.shadows;
