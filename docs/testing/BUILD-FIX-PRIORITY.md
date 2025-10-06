# 🚨 BUILD FIX PRIORITY - AiPlace Website

**Status:** ❌ BUILD CURRENTLY FAILING
**Date:** 2025-10-06
**Critical Issues:** 4

---

## ⚡ FIX THESE NOW (In Order)

### 1️⃣ CSS Border Issue (HIGHEST PRIORITY)
**File:** `/src/styles/globals.css` Line 38
**Current:** `@apply border-border;`
**Fix:** `border-color: hsl(var(--border));`

```diff
@layer base {
  * {
-   @apply border-border;
+   border-color: hsl(var(--border));
    @apply border-border;
  }
}
```

**Why:** Blocking entire build - Tailwind doesn't recognize `border-border` class

---

### 2️⃣ Service Page Metadata (CRITICAL)
**Files:**
- `/src/app/services/business-planning/page.tsx`
- `/src/app/services/tokenomics/page.tsx`

**Current:**
```typescript
"use client"
export const metadata: Metadata = { ... }  // ❌ ERROR
```

**Fix Option A - Remove Client Directive (BEST):**
```typescript
// Remove "use client" if no client-side hooks used
export const metadata: Metadata = { ... }  // ✅ OK
```

**Fix Option B - Move to Layout:**
```typescript
// In layout.tsx (server component)
export const metadata: Metadata = { ... }

// In page.tsx (keep client if needed)
"use client"
export default function Page() { ... }
```

---

### 3️⃣ Generate Prisma Client
**Command:**
```bash
npm run db:generate
# OR
npx prisma generate
```

**Why:** Backend API handlers need Prisma types

---

### 4️⃣ Verify Build
```bash
npm run build
```

**Expected Output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Creating an optimized production build
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size
┌ ○ /                                    ...
└ ○ /services/...                        ...
```

---

## 🔧 Quick Fix Script

Save this as `fix-build.sh` and run:

```bash
#!/bin/bash

echo "🔧 Fixing AiPlace build issues..."

# Fix 1: CSS Border Issue
sed -i '' 's/@apply border-border;/border-color: hsl(var(--border));/' src/styles/globals.css
echo "✅ Fixed CSS border issue"

# Fix 2: Remove metadata from business-planning
sed -i '' '/^export const metadata/,/^}/d' src/app/services/business-planning/page.tsx
echo "✅ Fixed business-planning metadata"

# Fix 3: Remove metadata from tokenomics
sed -i '' '/^export const metadata/,/^}/d' src/app/services/tokenomics/page.tsx
echo "✅ Fixed tokenomics metadata"

# Fix 4: Generate Prisma
npm run db:generate
echo "✅ Generated Prisma client"

# Test build
echo "🧪 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ BUILD SUCCESSFUL!"
else
    echo "❌ Build still failing. Check errors above."
fi
```

---

## 📋 Manual Fix Steps

### Step 1: Fix CSS (2 minutes)
1. Open `/src/styles/globals.css`
2. Find line 38: `@apply border-border;`
3. Replace with: `border-color: hsl(var(--border));`
4. Save file

### Step 2: Fix Service Pages (5 minutes)
1. Open `/src/app/services/business-planning/page.tsx`
2. Remove the metadata export (lines 28-46)
3. Repeat for `/src/app/services/tokenomics/page.tsx`
4. Save both files

### Step 3: Generate Prisma (1 minute)
```bash
npm run db:generate
```

### Step 4: Test Build (2 minutes)
```bash
npm run build
```

**Total Time:** ~10 minutes

---

## ✅ Verification Checklist

- [ ] No console errors during build
- [ ] Build completes successfully
- [ ] Can run `npm run dev` without errors
- [ ] Homepage loads at http://localhost:3000
- [ ] No TypeScript errors
- [ ] No CSS errors

---

## 🆘 If Build Still Fails

### Check Node Version
```bash
node --version  # Should be >= 18.0.0
```

### Clear Cache and Reinstall
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Check for Additional Errors
```bash
npm run lint
npm run type-check
```

---

## 📞 Need Help?

Check full test report: `/docs/testing/qa-test-report.md`

**Common Issues:**
- Module not found → Run `npm install`
- Prisma errors → Run `npm run db:generate`
- TypeScript errors → Check `tsconfig.json`
- CSS errors → Clear `.next` folder

---

**Last Updated:** 2025-10-06
**Priority:** P0 - BLOCKING
**Estimated Fix Time:** 10 minutes
