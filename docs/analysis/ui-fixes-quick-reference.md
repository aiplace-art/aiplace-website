# UI Structure Fixes - Quick Reference Guide

**Priority:** Critical & High Issues Only
**Estimated Time:** 2 weeks

---

## CRITICAL FIXES (Do First)

### 1. Standardize Vertical Spacing
**Problem:** Sections use different padding values
**Solution:** Apply consistent spacing

```tsx
// Apply to ALL sections:
className="py-16 md:py-20 lg:py-24"

// Files to update:
✓ hero.tsx (line 104)
✓ services-grid.tsx (line 74)
✓ portfolio-grid.tsx (line 142)
✓ contact-section.tsx (line 10)
✓ cta-section.tsx (line 10)
✓ page.tsx (line 73, 80, 87)
```

### 2. Unify Container Padding
**Problem:** Horizontal padding varies across sections
**Solution:** Use same padding everywhere

```tsx
// Apply to ALL containers:
className="px-6 sm:px-12 lg:px-16"

// Files to update:
✓ hero.tsx (line 128)
✓ services-grid.tsx (line 78)
✓ portfolio-grid.tsx (line 143)
✓ contact-section.tsx (line 13)
✓ cta-section.tsx (line 13)
✓ page.tsx (line 74, 81, 88)
```

### 3. Fix Hero Logo Centering
**File:** `hero.tsx` (line 136-154)

```tsx
// Replace logo container:
<div className="flex justify-center items-center mb-6">
  <div className="relative max-w-[800px] w-full">
    <div className="absolute inset-0 bg-gradient-brand blur-3xl opacity-30 animate-pulse-glow" />
    <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-400/20 via-brand-purple-400/20 to-brand-blue-400/20 blur-2xl animate-pulse" />
    <Image
      src="/images/logo.png"
      alt="AiPlace - Where Creativity Meets AI"
      width={800}
      height={200}
      priority
      className="relative w-full h-auto max-h-48 object-contain mx-auto drop-shadow-2xl"
    />
  </div>
</div>
```

### 4. Fix Portfolio Card Heights
**File:** `portfolio-grid.tsx` (line 187)

```tsx
// Update card structure:
<motion.div className="h-full flex">
  <Card className="h-full flex flex-col overflow-hidden border-white/10 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/20 bg-gray-900">
    <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => handleOpenModal(item)}>
      {/* Image content */}
    </div>
    <CardContent className="flex-1 p-6 space-y-4 flex flex-col">
      {/* Content that grows to fill space */}
    </CardContent>
  </Card>
</motion.div>
```

### 5. Fix Services Grid Gap
**File:** `services-grid.tsx` (line 92)

```tsx
// Change from:
gap-8 lg:gap-10 xl:gap-12

// To:
gap-6 lg:gap-8 xl:gap-10
```

### 6. Fix Footer Grid
**File:** `footer.tsx` (line 86)

```tsx
// Change from:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-16">
  <div className="lg:col-span-2">

// To:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
  <div className="lg:col-span-2">
```

---

## HIGH PRIORITY FIXES (Do Second)

### 7. Standardize Typography Scale

```tsx
// H1 (Hero only)
className="text-4xl md:text-5xl lg:text-6xl"

// H2 (Section headers)
className="text-3xl md:text-4xl lg:text-5xl"

// H3 (Subsections)
className="text-2xl md:text-3xl lg:text-4xl"

// Body Large
className="text-lg md:text-xl"

// Body Standard
className="text-base"
```

**Files to update:**
- hero.tsx (line 168)
- services-grid.tsx (line 81) - Reduce from text-6xl
- portfolio-grid.tsx (line 146) - Keep current
- contact-section.tsx (line 16)
- cta-section.tsx (line 16)

### 8. Standardize Button Sizes

```tsx
// Primary CTA (large)
className="h-14 px-8 text-lg"

// Secondary/Standard
className="h-12 px-6 text-base"

// Small
className="h-10 px-4 text-sm"
```

**Files to update:**
- hero.tsx (line 195-201, 211-217)
- contact-section.tsx (line 35-41, 42-47)

### 9. Unify Border Radius

```tsx
// Cards
rounded-2xl  // 16px

// Buttons & Inputs
rounded-xl   // 12px

// Pills & Badges
rounded-full
```

**Files to update:**
- service-card.tsx (line 82)
- portfolio-grid.tsx (line 187)
- contact-section.tsx (line 27)

### 10. Fix Stats Sections

```tsx
// Hero stats - Change to grid
<div className="grid grid-cols-3 gap-8 md:gap-12 pt-10 border-t border-brand-purple-200/40 mt-10 w-full max-w-4xl">

// CTA stats - Already grid, update gap
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">

// Testimonial stats - Update gap
<div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
```

---

## SPACING CHEAT SHEET

### Vertical Rhythm (8px Grid)
```tsx
// Section spacing
py-16 md:py-20 lg:py-24     // Standard

// Content spacing
space-y-4   // Tight (16px)
space-y-6   // Standard (24px)
space-y-8   // Loose (32px)
space-y-12  // Extra loose (48px)

// Margins
mb-4   // Small gap (16px)
mb-6   // Standard gap (24px)
mb-8   // Large gap (32px)
mb-12  // Extra large (48px)
mb-16  // Section gap (64px)
```

### Horizontal Spacing
```tsx
// Container padding
px-6 sm:px-12 lg:px-16      // Standard

// Grid gaps
gap-6 lg:gap-8 xl:gap-10    // Standard
gap-8                        // Fixed medium

// Element spacing
space-x-4   // Tight (16px)
space-x-6   // Standard (24px)
space-x-8   // Loose (32px)
```

### Component Spacing
```tsx
// Card padding
p-6 md:p-8                  // Standard
p-8 md:p-10 lg:p-12        // Large

// Button padding
px-6 py-3                   // Standard
px-8 py-4                   // Large

// Form fields
px-4 py-3                   // Standard input
```

---

## FILE-BY-FILE CHECKLIST

### `/components/sections/hero.tsx`
- [ ] Line 104: Change to `py-16 md:py-20`
- [ ] Line 128: Verify `px-6 sm:px-12 lg:px-16`
- [ ] Line 136-154: Fix logo centering
- [ ] Line 168: Update heading size
- [ ] Line 195, 211: Standardize button sizes
- [ ] Line 222: Fix stats grid

### `/components/sections/services-grid.tsx`
- [ ] Line 74: Add `py-16 md:py-20`
- [ ] Line 78: Verify `px-6 sm:px-12 lg:px-16`
- [ ] Line 81: Reduce heading from `text-6xl`
- [ ] Line 92: Change gap to `gap-6 lg:gap-8 xl:gap-10`

### `/components/sections/portfolio-grid.tsx`
- [ ] Line 142: Add `py-16 md:py-20`
- [ ] Line 155: Fix filter button gaps
- [ ] Line 174: Update grid gap to `gap-8`
- [ ] Line 187: Fix card heights with flex

### `/components/sections/contact-section.tsx`
- [ ] Line 10: Change to `py-16 md:py-20`
- [ ] Line 13: Change to `px-6 sm:px-12 lg:px-16`
- [ ] Line 27: Verify `rounded-2xl`
- [ ] Line 35-47: Standardize button sizes

### `/components/sections/cta-section.tsx`
- [ ] Line 10: Change to `py-16 md:py-20`
- [ ] Line 13: Change to `px-6 sm:px-12 lg:px-16`
- [ ] Line 24: Update grid gap to `gap-8`

### `/components/layout/footer.tsx`
- [ ] Line 86: Change to `lg:grid-cols-5 gap-12 lg:gap-16`

### `/components/layout/header.tsx`
- [ ] Line 36: Verify `h-24` matches scroll offset

### `/components/forms/contact-form.tsx`
- [ ] Line 244, 279: Standardize grid gaps to `gap-4`
- [ ] Line 548: Change to `gap-4`

### `/app/page.tsx`
- [ ] Line 73: Add `py-16 md:py-20`
- [ ] Line 74, 81, 88: Change to `px-6 sm:px-12 lg:px-16`
- [ ] Line 80: Add `py-16 md:py-20`
- [ ] Line 87: Add `py-16 md:py-20`

---

## TESTING CHECKLIST

After applying fixes, test at these breakpoints:
- [ ] 375px (Mobile)
- [ ] 768px (Tablet)
- [ ] 1024px (Laptop)
- [ ] 1440px (Desktop)

Verify:
- [ ] All sections align vertically
- [ ] Consistent spacing between sections
- [ ] Cards have equal heights in rows
- [ ] Logo is perfectly centered
- [ ] Buttons align on baseline
- [ ] Text is readable at all sizes

---

## QUICK WINS (< 30 min)

1. Search & Replace in all files:
   - Find: `py-12 md:py-16` → Replace: `py-16 md:py-20`
   - Find: `px-4 sm:px-6 lg:px-8` → Replace: `px-6 sm:px-12 lg:px-16`
   - Find: `px-4 md:px-8 lg:px-12` → Replace: `px-6 sm:px-12 lg:px-16`

2. Update all section wrappers in `page.tsx` to use consistent padding

3. Fix services heading size (one line change)

4. Update footer grid (one line change)

---

**Estimated Total Time:** 8-12 hours for all critical & high priority fixes
