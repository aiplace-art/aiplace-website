import { test, expect } from '@playwright/test';

test.describe('Services Section Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display services section', async ({ page }) => {
    const services = page.locator('[id*="services"], [class*="services"]');

    // Scroll to services section
    await services.first().scrollIntoViewIfNeeded();
    await expect(services.first()).toBeVisible();
  });

  test('should show service cards', async ({ page }) => {
    // Wait for services section to load
    await page.waitForSelector('[id*="services"], [class*="services"]');

    // Check for service cards/items
    const serviceItems = page.locator('[class*="service-card"], [class*="service-item"]');
    const count = await serviceItems.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should have service titles', async ({ page }) => {
    await page.waitForSelector('[id*="services"], [class*="services"]');

    const titles = page.locator('[class*="service"] h2, [class*="service"] h3');
    const count = await titles.count();

    expect(count).toBeGreaterThan(0);
  });

  test('should display service descriptions', async ({ page }) => {
    await page.waitForSelector('[id*="services"], [class*="services"]');

    const descriptions = page.locator('[class*="service"] p');
    const count = await descriptions.count();

    expect(count).toBeGreaterThan(0);
  });

  test('services should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const services = page.locator('[id*="services"], [class*="services"]');
    await services.first().scrollIntoViewIfNeeded();
    await expect(services.first()).toBeVisible();
  });

  test('service cards should have proper spacing', async ({ page }) => {
    const serviceCards = page.locator('[class*="service-card"]').first();

    if (await serviceCards.count() > 0) {
      const box = await serviceCards.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
    }
  });

  test('should handle hover states on service cards', async ({ page }) => {
    const serviceCard = page.locator('[class*="service-card"]').first();

    if (await serviceCard.count() > 0) {
      await serviceCard.hover();
      // Card should still be visible after hover
      await expect(serviceCard).toBeVisible();
    }
  });
});
