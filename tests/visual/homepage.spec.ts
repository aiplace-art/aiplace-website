import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/AiPlace|Home/i);
  });

  test('should display header with logo', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check for logo or site name
    const logo = page.locator('header img, header [class*="logo"]');
    await expect(logo.first()).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check for common navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('[class*="hero"], main > section:first-child');
    await expect(hero.first()).toBeVisible();
  });

  test('should have footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check if content is still accessible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });

  test('should load without 404 errors', async ({ page }) => {
    const failed: string[] = [];

    page.on('response', response => {
      if (response.status() === 404) {
        failed.push(response.url());
      }
    });

    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    expect(failed).toHaveLength(0);
  });
});
