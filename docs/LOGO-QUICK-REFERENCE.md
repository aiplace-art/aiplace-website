# AiPlace Logo Integration - Quick Reference

## Logo Location
```
/public/images/aiplace-logo.jpg
```

## Usage in Components

### Header Component
```tsx
import Image from "next/image"
import Link from "next/link"

<Link href="/">
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Image
      src="/images/aiplace-logo.jpg"
      alt="AiPlace - Where Creativity Meets AI"
      width={180}
      height={48}
      className="h-12 w-auto object-contain"
      priority
    />
  </motion.div>
</Link>
```

### Footer Component
```tsx
import Image from "next/image"
import Link from "next/link"

<Link href="/">
  <Image
    src="/images/aiplace-logo.jpg"
    alt="AiPlace - Where Creativity Meets AI"
    width={200}
    height={60}
    className="h-14 w-auto object-contain"
  />
</Link>
```

## Brand Colors

```css
/* Extract from logo gradient */
--brand-blue: #3b82f6;
--brand-cyan: #06b6d4;
--brand-purple: #8b5cf6;
--brand-pink: #ec4899;
--brand-navy: #1a1a4d;

/* Already in tailwind.config.ts */
colors: {
  brand: {
    indigo: '#6366f1',
    purple: '#8b5cf6',
    dark: '#0a0a0a',
  },
}
```

## Next Steps

1. **Create favicon** (see `/docs/LOGO-INTEGRATION.md`)
2. **Generate WebP version** for better performance
3. **Create responsive sizes** (sm, md, lg)
4. **Generate social media images** (OG, Twitter)

## Files

- **Integration Guide:** `/docs/LOGO-INTEGRATION.md`
- **Summary:** `/docs/LOGO-INTEGRATION-SUMMARY.md`
- **This File:** `/docs/LOGO-QUICK-REFERENCE.md`

## Testing

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Check:
# - Logo in header (top-left)
# - Logo in footer (brand section)
# - Hover animation on header logo
# - Links to homepage when clicked
# - Responsive on mobile/tablet/desktop
```

## Logo Specifications

- **Format:** JPEG (will create PNG, WebP versions)
- **Size:** 1024x1024px (original)
- **Header Display:** 180x48px
- **Footer Display:** 200x60px
- **File Size:** 38KB

## Common Tasks

### Update logo alt text
```tsx
alt="AiPlace - Where Creativity Meets AI"
```

### Change logo size
```tsx
// Header
width={180} height={48} className="h-12"

// Footer
width={200} height={60} className="h-14"
```

### Disable header logo animation
```tsx
// Remove motion.div wrapper
<Link href="/">
  <Image src="/images/aiplace-logo.jpg" ... />
</Link>
```

### Use PNG version (once created)
```tsx
src="/images/aiplace-logo.png"
```

## Support

Need help? Check the full documentation:
- `/docs/LOGO-INTEGRATION.md` - Complete guide with all instructions
- `/docs/LOGO-INTEGRATION-SUMMARY.md` - Implementation summary
