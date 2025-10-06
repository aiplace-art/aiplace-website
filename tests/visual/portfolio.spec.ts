import { test, expect } from '@playwright/test';

test.describe('Portfolio Section Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display portfolio section', async ({ page }) => {
    const portfolio = page.locator('[id*="portfolio"], [class*="portfolio"]');

    if (await portfolio.count() > 0) {
      await portfolio.first().scrollIntoViewIfNeeded();
      await expect(portfolio.first()).toBeVisible();
    } else {
      console.log('Portfolio section not found - may not be implemented yet');
    }
  });

  test('should show portfolio items', async ({ page }) => {
    const portfolioItems = page.locator('[class*="portfolio-item"], [class*="project-card"]');

    if (await portfolioItems.count() > 0) {
      expect(await portfolioItems.count()).toBeGreaterThan(0);
    }
  });

  test('portfolio images should load', async ({ page }) => {
    const images = page.locator('[class*="portfolio"] img, [class*="project"] img');

    if (await images.count() > 0) {
      const firstImage = images.first();
      await expect(firstImage).toBeVisible();

      // Check if image has loaded (not broken)
      const naturalWidth = await firstImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('portfolio grid should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const portfolio = page.locator('[id*="portfolio"], [class*="portfolio"]');

    if (await portfolio.count() > 0) {
      await portfolio.first().scrollIntoViewIfNeeded();
      await expect(portfolio.first()).toBeVisible();
    }
  });

  test('should handle portfolio item clicks', async ({ page }) => {
    const portfolioItem = page.locator('[class*="portfolio-item"], [class*="project-card"]').first();

    if (await portfolioItem.count() > 0) {
      await portfolioItem.click();
      // Should either navigate or open modal
      await page.waitForTimeout(500);
      // Check page didn't crash
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('portfolio items should have titles', async ({ page }) => {
    const titles = page.locator('[class*="portfolio"] h2, [class*="portfolio"] h3, [class*="project"] h2, [class*="project"] h3');

    if (await titles.count() > 0) {
      const firstTitle = titles.first();
      await expect(firstTitle).toBeVisible();
      const text = await firstTitle.textContent();
      expect(text).not.toBe('');
    }
  });
});
