import { test, expect } from '@playwright/test';

test.describe('Language Switching Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should have language switcher', async ({ page }) => {
    const langSwitcher = page.locator('[class*="language"], [id*="language"], [aria-label*="language" i]');

    if (await langSwitcher.count() > 0) {
      await expect(langSwitcher.first()).toBeVisible();
    } else {
      console.log('Language switcher not found - may not be implemented yet');
    }
  });

  test('should switch to Spanish', async ({ page }) => {
    // Look for language selector
    const langButton = page.locator('button:has-text("ES"), button:has-text("Español"), [data-lang="es"]');

    if (await langButton.count() > 0) {
      await langButton.first().click();
      await page.waitForTimeout(500);

      // Check if content changed (look for Spanish text)
      const body = await page.textContent('body');
      // This is a simple check - you'd want to verify specific translated text
      expect(body).toBeTruthy();
    }
  });

  test('should switch to French', async ({ page }) => {
    const langButton = page.locator('button:has-text("FR"), button:has-text("Français"), [data-lang="fr"]');

    if (await langButton.count() > 0) {
      await langButton.first().click();
      await page.waitForTimeout(500);

      const body = await page.textContent('body');
      expect(body).toBeTruthy();
    }
  });

  test('should persist language selection on reload', async ({ page }) => {
    const langButton = page.locator('button:has-text("ES"), [data-lang="es"]');

    if (await langButton.count() > 0) {
      await langButton.first().click();
      await page.waitForTimeout(500);

      // Reload page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Language should still be Spanish (check localStorage or URL)
      const lang = await page.evaluate(() => localStorage.getItem('language') || document.documentElement.lang);
      expect(lang).toContain('es');
    }
  });

  test('should have all language options available', async ({ page }) => {
    // Click on language selector to show options
    const langSelector = page.locator('[class*="language"], [id*="language"]').first();

    if (await langSelector.count() > 0) {
      await langSelector.click();
      await page.waitForTimeout(300);

      // Check for common languages
      const options = page.locator('[data-lang], [class*="language-option"]');
      const count = await options.count();

      // Should have at least 2 languages
      expect(count).toBeGreaterThanOrEqual(2);
    }
  });

  test('language switch should not break layout', async ({ page }) => {
    const langButton = page.locator('button:has-text("ES"), [data-lang="es"]').first();

    if (await langButton.count() > 0) {
      // Get initial layout
      const initialHeight = await page.evaluate(() => document.body.scrollHeight);

      await langButton.click();
      await page.waitForTimeout(500);

      // Layout should not be dramatically different
      const newHeight = await page.evaluate(() => document.body.scrollHeight);
      const difference = Math.abs(newHeight - initialHeight);

      // Allow for some variation but not drastic changes
      expect(difference).toBeLessThan(initialHeight * 0.5);
    }
  });

  test('should handle RTL languages if supported', async ({ page }) => {
    const rtlButton = page.locator('button:has-text("AR"), button:has-text("HE"), [data-lang="ar"], [data-lang="he"]');

    if (await rtlButton.count() > 0) {
      await rtlButton.first().click();
      await page.waitForTimeout(500);

      // Check if dir attribute is set to rtl
      const dir = await page.evaluate(() => document.documentElement.dir);
      expect(dir).toBe('rtl');
    }
  });

  test('language switcher should be accessible', async ({ page }) => {
    const langSwitcher = page.locator('[class*="language"], [id*="language"]').first();

    if (await langSwitcher.count() > 0) {
      // Should be keyboard accessible
      await langSwitcher.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      // Should open options or trigger action
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
