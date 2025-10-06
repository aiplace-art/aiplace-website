# AiPlace Design System - Installation Guide

## Prerequisites

- Node.js 18+ 
- npm 9+

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd /Users/ai.place/WEbsite
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript 5.3
- Tailwind CSS 3.4
- Framer Motion 11
- Lucide React
- All shadcn/ui dependencies

### 3. Verify Installation
```bash
npm run type-check
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Demo Page
Navigate to: http://localhost:3000

You should see the complete AiPlace design system demo!

## What You'll See

The demo page includes:

1. **Header** - Sticky navigation with logo and menu
2. **Hero Section** - Animated gradient background with CTAs
3. **Services Grid** - 4 service cards with hover effects
4. **Portfolio Grid** - Filterable project showcase
5. **Process Timeline** - 5-step visualization
6. **Testimonials** - Auto-rotating carousel
7. **Contact Form** - Multi-step form
8. **UI Showcase** - All button/input/card variants
9. **Footer** - Links, newsletter, social media

## File Structure Verification

Run this to verify all files are in place:

```bash
ls -la src/components/ui/
ls -la src/components/sections/
ls -la src/components/layout/
ls -la src/components/forms/
```

Expected output:
- ui/: 6 files
- sections/: 6 files
- layout/: 2 files
- forms/: 1 file

## Build for Production

```bash
npm run build
npm start
```

## Common Issues & Solutions

### Issue: Module not found errors
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 in use
**Solution**:
```bash
npm run dev -- -p 3001
```

### Issue: TypeScript errors
**Solution**:
```bash
npm run type-check
```

### Issue: Tailwind styles not loading
**Solution**: Check that `globals.css` is imported in `app/layout.tsx`

## Next Steps

1. ✅ View the demo at http://localhost:3000
2. ✅ Read `/docs/DESIGN-SYSTEM.md` for component API
3. ✅ Check `/docs/COMPONENT-SUMMARY.md` for overview
4. ✅ Explore `/src/components/demo.tsx` for usage examples
5. ✅ Start building your pages!

## Component Usage Quick Reference

```tsx
// UI Components
import { Button, Input, Card, Badge } from "@/components/ui"

// Layout
import { Header, Footer } from "@/components/layout"

// Sections
import { 
  Hero, 
  ServicesGrid, 
  PortfolioGrid, 
  ProcessTimeline, 
  TestimonialCarousel 
} from "@/components/sections"

// Forms
import { ContactForm } from "@/components/forms"
```

## Success Checklist

- [ ] Dependencies installed
- [ ] Dev server running
- [ ] Demo page loads at localhost:3000
- [ ] All components visible
- [ ] Animations working
- [ ] No console errors

If all checked, you're ready to develop! 🚀

---

For detailed documentation, see `/docs/DESIGN-SYSTEM.md`
