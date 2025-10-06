# Navigation Component Usage Guide

## Overview

The Navigation component is a modern, responsive navigation bar with advanced features including:

- **Sticky Header**: Automatically transforms from transparent to solid with blur effect on scroll
- **Dark/Light Mode Toggle**: Seamless theme switching with animated icon transitions
- **Gradient Underlines**: Animated gradient underlines on active and hover states
- **Smooth Scroll**: Smooth scrolling to page sections with offset for fixed header
- **Mobile Menu**: Smooth slide-in animation with Framer Motion
- **Active Section Detection**: Automatically highlights the current section based on scroll position
- **Responsive Design**: Optimized for all screen sizes

## Installation & Setup

### 1. Install Dependencies

The navigation component requires the following packages (already installed):

```bash
npm install next-themes framer-motion lucide-react
```

### 2. Wrap Your App with ThemeProvider

Update your root layout file (`app/layout.tsx`):

```tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 3. Add the Navigation Component

```tsx
import { Navigation } from "@/components/navigation"

export default function Page() {
  return (
    <>
      <Navigation />
      {/* Your page content */}
    </>
  )
}
```

## Features Breakdown

### 1. Sticky Header with Blur Effect

The header automatically changes appearance on scroll:

- **Default**: Transparent background
- **Scrolled**: White/dark background with blur effect and shadow
- **Transition**: Smooth 500ms transition

### 2. Logo Configuration

Update the logo path in the component:

```tsx
<Image
  src="/images/logo.png"  // Change this to your logo path
  alt="AiPlace - Where Creativity Meets AI"
  width={180}
  height={48}
  // ...
/>
```

### 3. Navigation Items

Configure navigation items by editing the `navItems` array:

```tsx
const navItems = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]
```

**Note**: Use `#section-id` for smooth scrolling to sections, or `/path` for regular links.

### 4. Smooth Scroll Configuration

The component automatically handles smooth scrolling with a 100px offset for the fixed header. Ensure your page sections have matching IDs:

```tsx
<section id="services">
  {/* Services content */}
</section>

<section id="portfolio">
  {/* Portfolio content */}
</section>
```

### 5. Dark Mode Toggle

The theme toggle automatically:
- Detects system preferences
- Persists user choice
- Animates icon transitions
- Updates all themed components

### 6. Active Section Detection

The navigation automatically highlights the active section based on scroll position. It checks which section is currently in the viewport (within 100px of the top).

### 7. Mobile Menu

The mobile menu includes:
- Smooth slide-in animation from the right
- Staggered item animations
- Backdrop overlay with blur
- Auto-close on link click or overlay click

## Customization

### Colors & Styling

The component uses Tailwind classes with your brand colors:

```tsx
// Gradient underline
bg-gradient-brand  // Your brand gradient

// CTA button
bg-gradient-brand hover:bg-gradient-brand-hover

// Dark mode support
dark:bg-navy-900  // Dark background
dark:text-navy-100  // Dark text
```

### Animation Timing

Adjust animation durations by modifying the Framer Motion transitions:

```tsx
transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
```

### Scroll Offset

Change the scroll offset (default 100px) in two places:

```tsx
// Line ~50 - Active section detection
if (top <= 100 && bottom >= 100)

// Line ~60 - Smooth scroll
const offset = 100
```

## Accessibility

The navigation includes:

- Proper ARIA labels (`aria-label`)
- Semantic HTML (`<nav>`, `<header>`)
- Keyboard navigation support
- Screen reader friendly
- Focus states on all interactive elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- Uses CSS backdrop-filter (with fallbacks)

## Performance

- Optimized scroll listener with cleanup
- Lazy animation initialization
- Hydration-safe theme detection
- Efficient re-renders with React state

## Troubleshooting

### Theme not persisting

Make sure ThemeProvider is in your root layout with proper attributes:

```tsx
<ThemeProvider attribute="class" enableSystem>
```

### Smooth scroll not working

Verify your section IDs match the href values (without the `#`):

```tsx
{ label: "Services", href: "#services" }  // Links to <section id="services">
```

### Logo not showing

Check the logo path exists:

```bash
ls -la /Users/ai.place/WEbsite/public/images/logo.png
```

## Examples

### Basic Usage

```tsx
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <section id="services">...</section>
      <section id="portfolio">...</section>
      <section id="contact">...</section>
    </main>
  )
}
```

### With Custom Theme

```tsx
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Navigation />
      {/* content */}
    </ThemeProvider>
  )
}
```

## Component Structure

```
Navigation
├── Header (Sticky container)
│   ├── Logo (Left)
│   ├── Nav Links (Center - Desktop only)
│   │   └── Gradient underlines on hover/active
│   └── Right Section
│       ├── Theme Toggle
│       ├── CTA Button (Desktop)
│       └── Mobile Menu Button
│
└── Mobile Menu (Slide-in overlay)
    ├── Nav Links
    ├── CTA Button
    └── Footer
```

## Dependencies

- `next`: ^14.1.0
- `react`: ^18.2.0
- `next-themes`: ^0.4.6
- `framer-motion`: ^11.0.3
- `lucide-react`: ^0.344.0
- `tailwindcss`: ^3.4.1

## File Locations

- Component: `/src/components/navigation.tsx`
- Theme Provider: `/src/components/theme-provider.tsx`
- Exported from: `/src/components/index.ts`
- Documentation: `/src/docs/navigation-usage.md`

## Support

For issues or questions, refer to:
- [Framer Motion Docs](https://www.framer.com/motion/)
- [next-themes Docs](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
