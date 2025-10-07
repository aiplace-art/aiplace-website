import { test, expect } from '@playwright/test';

test.describe('Hero Section Enhanced Design Tests', () => {
  test('Desktop viewport (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'tests/visual/screenshots/hero-desktop-1920x1080.png',
      fullPage: false
    });

    // Verify hero section is visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('Tablet viewport (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'tests/visual/screenshots/hero-tablet-768x1024.png',
      fullPage: false
    });

    // Verify hero section is visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('Mobile viewport (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    // Take screenshot
    await page.screenshot({
      path: 'tests/visual/screenshots/hero-mobile-375x667.png',
      fullPage: false
    });

    // Verify hero section is visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('Interactive elements and animations', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Wait for initial animations
    await page.waitForTimeout(2000);

    // Test CTA button hover
    const ctaButton = page.getByRole('button').first();
    await ctaButton.hover();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: 'tests/visual/screenshots/hero-button-hover.png',
      fullPage: false
    });

    // Test stat card hover
    const statCards = page.locator('.stat-card');
    if (await statCards.count() > 0) {
      await statCards.first().hover();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: 'tests/visual/screenshots/hero-stat-hover.png',
        fullPage: false
      });
    }
  });

  test('Verify gradient orbs are present', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check for gradient orbs
    const orbs = await page.locator('.animate-float-organic-1, .animate-float-organic-2, .animate-float-organic-3, .animate-float-organic-4, .animate-float-organic-5').count();
    expect(orbs).toBe(5);
  });

  test('Verify logo breathing animation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check for logo with breathing animation
    const logo = page.locator('.animate-logo-breathe');
    await expect(logo).toBeVisible();
  });

  test('Verify shimmer button effect', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check for shimmer button
    const shimmerButton = page.locator('.btn-shimmer');
    await expect(shimmerButton).toBeVisible();
  });
});
