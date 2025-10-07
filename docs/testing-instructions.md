# TESTING INSTRUCTIONS - EN/RU SYMMETRY

## QUICK START

1. Start development server:
```bash
npm run dev
```

2. Open browser: `http://localhost:3000`

3. Test both languages side-by-side

---

## MANUAL TESTING PROCEDURE

### Step 1: Test English Version

1. Open `http://localhost:3000`
2. Make sure language is set to **EN**
3. Take screenshots of:
   - Hero section (full width)
   - Services section (scroll down)
   - Portfolio section
   - Footer

4. Note down measurements:
   - Button widths
   - Card heights
   - Text wrapping behavior

### Step 2: Test Russian Version

1. Click language switcher to **RU**
2. Take screenshots of same sections
3. Compare with EN screenshots:
   - Buttons should be SAME WIDTH
   - Cards should be SAME HEIGHT
   - Text should wrap CONSISTENTLY

### Step 3: Responsive Testing

Resize browser to test breakpoints:

**Desktop** (1920px):
- All buttons aligned
- No text overflow
- Cards same height

**Tablet** (768px):
- Layout adjusts properly
- Text remains readable
- Buttons don't break

**Mobile** (375px):
- Buttons stack vertically
- Stats labels don't overflow
- Cards maintain structure

---

## AUTOMATED VISUAL TESTING (Optional)

If you want to use Playwright for automated testing:

```bash
# Install Playwright (if not already installed)
npm install -D @playwright/test

# Create test file
# tests/visual-symmetry.spec.ts
```

```typescript
import { test, expect } from '@playwright/test';

test.describe('EN/RU Symmetry Tests', () => {
  test('Hero buttons have same width', async ({ page }) => {
    // Test English
    await page.goto('http://localhost:3000');
    const enButton = await page.locator('button:has-text("Get Started")');
    const enWidth = await enButton.boundingBox();

    // Switch to Russian
    await page.click('[aria-label*="language"]'); // Adjust selector
    await page.waitForTimeout(500);

    // Test Russian
    const ruButton = await page.locator('button:has-text("Начать работу")');
    const ruWidth = await ruButton.boundingBox();

    // Compare widths (should be within 5px due to rounding)
    expect(Math.abs(enWidth!.width - ruWidth!.width)).toBeLessThan(5);
  });

  test('Service cards have same height', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('[data-testid="service-card"]');

    // Get all card heights in EN
    const enCards = await page.locator('[data-testid="service-card"]').all();
    const enHeights = await Promise.all(
      enCards.map(card => card.boundingBox().then(box => box!.height))
    );

    // Switch to RU
    await page.click('[aria-label*="language"]');
    await page.waitForTimeout(500);

    // Get all card heights in RU
    const ruCards = await page.locator('[data-testid="service-card"]').all();
    const ruHeights = await Promise.all(
      ruCards.map(card => card.boundingBox().then(box => box!.height))
    );

    // Compare heights
    enHeights.forEach((enHeight, i) => {
      expect(Math.abs(enHeight - ruHeights[i])).toBeLessThan(10);
    });
  });
});
```

---

## VISUAL CHECKLIST

### Hero Section ✓
- [ ] "Get Started" button width: ~180px (both languages)
- [ ] "Learn More" button width: ~180px (both languages)
- [ ] Stats labels height: ~40px (2.5rem)
- [ ] Stats labels don't wrap differently

### Services Section ✓
- [ ] All 6 service cards same height
- [ ] Titles max 2 lines
- [ ] Subtitles max 1 line
- [ ] Descriptions max 3 lines
- [ ] "Learn More" buttons full width

### Portfolio Section ✓
- [ ] Filter buttons min 140px wide
- [ ] "Quick View" button ~160px wide
- [ ] "Case Study" button ~140px wide
- [ ] "View All Projects" button ~240px wide
- [ ] Long text truncates with ellipsis

### About Page ✓
- [ ] Values card titles ~3.5rem height
- [ ] Descriptions max 4 lines
- [ ] CTA buttons ~180px wide each
- [ ] Buttons aligned horizontally

### Contact Page ⚠️
- [ ] **NOT TESTED** - Requires i18n integration first
- [ ] Form labels in English only (needs fix)
- [ ] Buttons in English only (needs fix)

---

## COMPARISON SCREENSHOTS

Take screenshots at these exact scroll positions:

### Desktop (1920x1080)
1. **Scroll 0%**: Hero section
2. **Scroll 25%**: Services section
3. **Scroll 50%**: Portfolio section
4. **Scroll 100%**: Footer

### Tablet (768x1024)
1. Same scroll positions
2. Note any layout changes

### Mobile (375x812)
1. Same scroll positions
2. Verify button stacking

---

## REPORTING ISSUES

If you find symmetry issues, report with:

1. **Page/Section**: e.g., "Services Page - Card 3"
2. **Language**: EN or RU
3. **Breakpoint**: Desktop/Tablet/Mobile
4. **Issue**: e.g., "Button 20px wider in RU"
5. **Screenshot**: Attach comparison image
6. **Expected**: What should happen
7. **Actual**: What actually happens

Example:
```
Page: Hero Section
Language: RU
Breakpoint: Desktop (1920px)
Issue: "Премиальная поддержка" label wraps to 3 lines
Expected: Max 2 lines with ellipsis
Actual: 3 lines, breaks layout
Screenshot: attached
```

---

## SIGN-OFF

After testing, fill out:

### Tester Information
- Name: _______________
- Date: _______________
- Browser: _______________
- OS: _______________

### Results
- [ ] All critical issues fixed
- [ ] Hero section symmetrical
- [ ] Services section symmetrical
- [ ] Portfolio section symmetrical
- [ ] About section symmetrical
- [ ] Contact form (pending i18n)

### Notes:
_____________________________________________
_____________________________________________
_____________________________________________

**Approved for Production**: [ ] YES  [ ] NO

Signature: _________________ Date: _________

---

## QUICK REFERENCE: Expected Measurements

| Element | Min Width | Max Lines | Min Height |
|---------|-----------|-----------|------------|
| CTA Button (large) | 180px | 1 | 48px |
| Filter Button | 140px | 1 | 40px |
| Action Button | 160px | 1 | 40px |
| Service Card Title | - | 2 | 4rem |
| Service Card Desc | - | 3 | 4.5rem |
| Stats Label | - | 2 | 2.5rem |
| Values Card Title | - | 2 | 3.5rem |
| Values Card Desc | - | 4 | - |

---

**Document Version**: 1.0
**Last Updated**: 2025-10-07
**Next Review**: After Contact Form i18n integration
