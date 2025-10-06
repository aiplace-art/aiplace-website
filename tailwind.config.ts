import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo-based brand colors - AI gradient spectrum
        brand: {
          pink: {
            50: '#FFF0F9',
            100: '#FFE1F3',
            200: '#FFC2E7',
            300: '#FF94D6',
            400: '#FF5BBF',
            500: '#FF1493', // Primary pink
            600: '#E6007A',
            700: '#C2005E',
            800: '#99004A',
            900: '#70003A',
            950: '#470024',
          },
          purple: {
            50: '#F5F0FF',
            100: '#EBE1FF',
            200: '#D6C2FF',
            300: '#BA94FF',
            400: '#9B5BFF',
            500: '#9B4DFF', // Primary purple
            600: '#7A1FFF',
            700: '#6200E6',
            800: '#4D00B8',
            900: '#380085',
            950: '#240054',
          },
          blue: {
            50: '#EFF8FF',
            100: '#DFF0FF',
            200: '#B8E3FF',
            300: '#7ACFFF',
            400: '#4DB8FF',
            500: '#4D9FFF', // Primary blue
            600: '#0080FF',
            700: '#0066CC',
            800: '#0052A3',
            900: '#003D7A',
            950: '#00294D',
          },
          cyan: {
            50: '#EBFFFE',
            100: '#D6FFFD',
            200: '#ADFFF9',
            300: '#75FFF5',
            400: '#2EFFF0',
            500: '#00D4FF', // Primary cyan
            600: '#00B3E6',
            700: '#0091BF',
            800: '#007399',
            900: '#005470',
            950: '#003647',
          },
        },
        // Neutral palette - Navy inspired
        navy: {
          50: '#F8F9FB',
          100: '#F1F3F7',
          200: '#E4E8EF',
          300: '#CDD4E0',
          400: '#A6B1C5',
          500: '#7A8699',
          600: '#5A6475',
          700: '#3F4855',
          800: '#293340',
          900: '#0A1628', // Primary navy (logo text)
          950: '#050B14',
        },
        // Semantic colors using CSS variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // Premium gradient system
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF1493 0%, #9B4DFF 33%, #4D9FFF 66%, #00D4FF 100%)',
        'gradient-brand-hover': 'linear-gradient(135deg, #E6007A 0%, #7A1FFF 33%, #0080FF 66%, #00B3E6 100%)',
        'gradient-pink-purple': 'linear-gradient(135deg, #FF1493 0%, #9B4DFF 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #9B4DFF 0%, #4D9FFF 100%)',
        'gradient-blue-cyan': 'linear-gradient(135deg, #4D9FFF 0%, #00D4FF 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Professional typography scale
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '-0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '-0.01em' }],
        'base': ['1rem', { lineHeight: '1.625rem', letterSpacing: '-0.011em' }],
        'lg': ['1.125rem', { lineHeight: '1.875rem', letterSpacing: '-0.012em' }],
        'xl': ['1.25rem', { lineHeight: '2rem', letterSpacing: '-0.014em' }],
        '2xl': ['1.5rem', { lineHeight: '2.25rem', letterSpacing: '-0.016em' }],
        '3xl': ['1.875rem', { lineHeight: '2.5rem', letterSpacing: '-0.018em' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.022em' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.024em' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem', letterSpacing: '-0.026em' }],
        '8xl': ['6rem', { lineHeight: '6rem', letterSpacing: '-0.028em' }],
        '9xl': ['8rem', { lineHeight: '8rem', letterSpacing: '-0.03em' }],
      },
      // Consistent spacing system (8px grid)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      // Elegant shadow system
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(10, 22, 40, 0.02)',
        'sm': '0 2px 4px -1px rgba(10, 22, 40, 0.06), 0 1px 2px 0 rgba(10, 22, 40, 0.04)',
        'DEFAULT': '0 4px 6px -1px rgba(10, 22, 40, 0.08), 0 2px 4px -1px rgba(10, 22, 40, 0.04)',
        'md': '0 8px 12px -2px rgba(10, 22, 40, 0.10), 0 4px 6px -1px rgba(10, 22, 40, 0.05)',
        'lg': '0 12px 24px -4px rgba(10, 22, 40, 0.12), 0 6px 12px -2px rgba(10, 22, 40, 0.06)',
        'xl': '0 20px 32px -8px rgba(10, 22, 40, 0.14), 0 8px 16px -4px rgba(10, 22, 40, 0.08)',
        '2xl': '0 32px 64px -12px rgba(10, 22, 40, 0.18), 0 12px 24px -4px rgba(10, 22, 40, 0.10)',
        'inner': 'inset 0 2px 4px 0 rgba(10, 22, 40, 0.05)',
        'glow-pink': '0 0 24px rgba(255, 20, 147, 0.3), 0 0 48px rgba(255, 20, 147, 0.15)',
        'glow-purple': '0 0 24px rgba(155, 77, 255, 0.3), 0 0 48px rgba(155, 77, 255, 0.15)',
        'glow-blue': '0 0 24px rgba(77, 159, 255, 0.3), 0 0 48px rgba(77, 159, 255, 0.15)',
        'glow-brand': '0 0 32px rgba(155, 77, 255, 0.4), 0 0 64px rgba(77, 159, 255, 0.2)',
      },
      // Smooth border radius system
      borderRadius: {
        'none': '0',
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'full': '9999px',
      },
      // Premium animations
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-down': 'fade-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in': 'slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', boxShadow: '0 0 24px rgba(155, 77, 255, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 48px rgba(155, 77, 255, 0.5)' },
        },
      },
      // Transition system
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
