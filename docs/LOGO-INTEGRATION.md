# AiPlace Logo Integration Guide

This document provides instructions for working with the AiPlace logo and creating optimized versions for different use cases.

## Current Logo

**Location:** `/public/images/aiplace-logo.jpg`

**Features:**
- Brain icon with gradient (blue → cyan → purple → pink)
- "AiPlace" text in dark navy (#1a1a4d)
- Tagline: "Where Creativity Meets AI"
- Light background (suitable for dark themes)
- Dimensions: Approximately 1024x1024px

## Logo Usage in Components

### Header Component
- **Location:** `/src/components/layout/header.tsx`
- **Implementation:** Uses Next.js Image component for optimization
- **Size:** 180x48px (responsive, maintains aspect ratio)
- **Features:**
  - Hover animation (1.05x scale)
  - Priority loading for LCP optimization
  - Links to homepage

### Footer Component
- **Location:** `/src/components/layout/footer.tsx`
- **Implementation:** Uses Next.js Image component
- **Size:** 200x60px (responsive)
- **Features:** Clickable link to homepage

## Creating Optimized Logo Versions

### 1. PNG Version with Transparency

To create a PNG version with transparent background:

```bash
# Using ImageMagick
convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
  -fuzz 10% -transparent white \
  /Users/ai.place/WEbsite/public/images/aiplace-logo.png
```

Or use an online tool:
1. Visit [Remove.bg](https://www.remove.bg/) or similar
2. Upload `aiplace-logo.jpg`
3. Download PNG with transparent background
4. Save as `/public/images/aiplace-logo.png`

### 2. Favicon Versions

Create favicon from the brain icon:

#### Using ImageMagick:
```bash
# Create 512x512 icon (extract left portion with brain)
convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
  -crop 400x400+0+300 -resize 512x512 \
  /Users/ai.place/WEbsite/public/icon-512x512.png

# Create 192x192
convert /Users/ai.place/WEbsite/public/icon-512x512.png \
  -resize 192x192 \
  /Users/ai.place/WEbsite/public/icon-192x192.png

# Create Apple Touch Icon (180x180)
convert /Users/ai.place/WEbsite/public/icon-512x512.png \
  -resize 180x180 \
  /Users/ai.place/WEbsite/public/apple-touch-icon.png

# Create standard favicons
convert /Users/ai.place/WEbsite/public/icon-512x512.png \
  -resize 32x32 \
  /Users/ai.place/WEbsite/public/favicon-32x32.png

convert /Users/ai.place/WEbsite/public/icon-512x512.png \
  -resize 16x16 \
  /Users/ai.place/WEbsite/public/favicon-16x16.png

# Create .ico file with multiple sizes
convert /Users/ai.place/WEbsite/public/icon-512x512.png \
  -define icon:auto-resize=16,32,48 \
  /Users/ai.place/WEbsite/public/favicon.ico
```

#### Manual Method:
1. Open `aiplace-logo.jpg` in an image editor (Photoshop, GIMP, Figma)
2. Crop to just the brain icon (left portion)
3. Export at these sizes:
   - 512x512px → `icon-512x512.png`
   - 192x192px → `icon-192x192.png`
   - 180x180px → `apple-touch-icon.png`
   - 32x32px → `favicon-32x32.png`
   - 16x16px → `favicon-16x16.png`
4. Use [Favicon Generator](https://realfavicongenerator.net/) to create `favicon.ico`

### 3. Responsive Logo Sizes

Create multiple sizes for different viewports:

```bash
# Large (desktop header)
convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
  -resize 360x96 \
  /Users/ai.place/WEbsite/public/images/aiplace-logo-lg.png

# Medium (tablet)
convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
  -resize 240x64 \
  /Users/ai.place/WEbsite/public/images/aiplace-logo-md.png

# Small (mobile)
convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
  -resize 180x48 \
  /Users/ai.place/WEbsite/public/images/aiplace-logo-sm.png
```

### 4. WebP Version (Modern Format)

```bash
# Convert to WebP for better compression
convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
  -quality 90 \
  /Users/ai.place/WEbsite/public/images/aiplace-logo.webp
```

## Recommended File Structure

```
/public/
  images/
    aiplace-logo.jpg          # Original logo (current)
    aiplace-logo.png          # PNG with transparency
    aiplace-logo.webp         # WebP version (smaller)
    aiplace-logo-sm.png       # Mobile size (180x48)
    aiplace-logo-md.png       # Tablet size (240x64)
    aiplace-logo-lg.png       # Desktop size (360x96)

  # Favicons
  favicon.ico                 # Multi-size .ico
  favicon-16x16.png
  favicon-32x32.png
  apple-touch-icon.png        # 180x180
  icon-192x192.png            # PWA icon
  icon-512x512.png            # PWA icon
```

## Next.js Image Component Best Practices

The logo is already optimized using Next.js Image component:

```tsx
import Image from "next/image"

<Image
  src="/images/aiplace-logo.jpg"
  alt="AiPlace - Where Creativity Meets AI"
  width={180}
  height={48}
  className="h-12 w-auto object-contain"
  priority  // Loads immediately for header
/>
```

### Key Features:
- **Automatic optimization:** Next.js serves optimized WebP/AVIF
- **Lazy loading:** Except when `priority` is set
- **Responsive:** Automatically serves appropriate sizes
- **Cache-friendly:** Optimized images are cached

## Brand Colors

Extract from the logo for consistent theming:

```css
/* Brain gradient colors */
--brand-blue: #3b82f6;      /* Blue (top-left) */
--brand-cyan: #06b6d4;      /* Cyan (top-right) */
--brand-purple: #8b5cf6;    /* Purple (bottom-left) */
--brand-pink: #ec4899;      /* Pink (bottom-right) */

/* Text color */
--brand-navy: #1a1a4d;      /* "AiPlace" text */

/* Gradient */
background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 25%, #8b5cf6 75%, #ec4899 100%);
```

These colors are already configured in `tailwind.config.ts`:

```ts
colors: {
  brand: {
    indigo: '#6366f1',
    purple: '#8b5cf6',
    dark: '#0a0a0a',
  },
}
```

## SEO & Metadata

The logo is referenced in `layout.tsx` metadata:

```ts
openGraph: {
  images: [{ url: "/og-image.jpg", width: 1200, height: 630 }]
}
twitter: {
  images: ["/twitter-image.jpg"]
}
```

### Creating Social Media Images:

1. **Open Graph (1200x630):**
   ```bash
   convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
     -background '#0a0a0a' -gravity center \
     -extent 1200x630 \
     /Users/ai.place/WEbsite/public/og-image.jpg
   ```

2. **Twitter Card (1200x600):**
   ```bash
   convert /Users/ai.place/WEbsite/public/images/aiplace-logo.jpg \
     -background '#0a0a0a' -gravity center \
     -extent 1200x600 \
     /Users/ai.place/WEbsite/public/twitter-image.jpg
   ```

## Accessibility

Always include descriptive alt text:

```tsx
alt="AiPlace - Where Creativity Meets AI"
```

## Performance Optimization

Current optimizations in place:

1. **Next.js Image Component:** Automatic format conversion (WebP/AVIF)
2. **Priority Loading:** Header logo loads immediately
3. **Lazy Loading:** Footer logo loads when scrolled into view
4. **Responsive Sizing:** Appropriate sizes for different viewports
5. **CDN Caching:** Optimized images cached on Vercel Edge Network

## Testing Logo Integration

1. **Visual Test:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 and check:
   - Header logo displays correctly
   - Footer logo displays correctly
   - Hover animations work
   - Mobile menu shows logo properly

2. **Performance Test:**
   ```bash
   npm run build
   npm start
   ```
   Check Lighthouse scores for:
   - Largest Contentful Paint (LCP) < 2.5s
   - Image optimization score

3. **Responsive Test:**
   - Desktop: Full logo visible
   - Tablet: Logo scales appropriately
   - Mobile: Logo fits in mobile header

## Future Enhancements

Consider creating:
1. **Animated SVG version** for interactive hover effects
2. **Dark/Light mode variants** if switching from dark theme
3. **Monochrome version** for specific use cases
4. **Icon-only version** for compact displays

## Support

For logo design changes or questions:
- Contact: design@aiplace.com
- Brand Guidelines: `/docs/BRAND-GUIDELINES.md` (to be created)
