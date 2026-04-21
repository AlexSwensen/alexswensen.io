import { test, expect, type Page } from '@playwright/test';

/**
 * Helper to get the current theme class applied to the <html> element.
 * next-themes applies 'light' or 'dark' as a class on the root element.
 */
async function getHtmlClass(page: Page) {
  return page.evaluate(() => document.documentElement.className);
}

test.describe('Theme Switching', () => {
  test('should apply a theme class to the html element on home page', async ({ page }) => {
    await page.goto('/');
    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toMatch(/light|dark/);
  });

  test('should switch to light theme via the theme toggle', async ({ page }) => {
    await page.goto('/');
    // Open theme toggle dropdown
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.getByRole('menuitem', { name: /light/i }).click();
    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toContain('light');
  });

  test('should switch to dark theme via the theme toggle', async ({ page }) => {
    await page.goto('/');
    // Open theme toggle dropdown
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.getByRole('menuitem', { name: /dark/i }).click();
    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toContain('dark');
  });

  test('should persist theme when navigating to blog page', async ({ page }) => {
    await page.goto('/');
    // Set light theme
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.getByRole('menuitem', { name: /light/i }).click();

    // Navigate to blog
    await page.getByRole('link', { name: 'Blog' }).first().click();
    await expect(page).toHaveURL('/blog');

    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toContain('light');
  });

  test('should persist theme when navigating to a blog post', async ({ page }) => {
    await page.goto('/');
    // Set dark theme
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.getByRole('menuitem', { name: /dark/i }).click();

    // Navigate to a blog post
    await page.goto('/blog/2025-02-20_new-new-website');
    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toContain('dark');
  });

  test('should apply theme on blog post page (light)', async ({ page }) => {
    // Set cookie for light theme before navigation
    await page.goto('/blog/2025-02-20_new-new-website');
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.getByRole('menuitem', { name: /light/i }).click();

    // Reload to confirm theme persists
    await page.reload();
    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toContain('light');
  });

  test('should apply theme on blog post page (dark)', async ({ page }) => {
    await page.goto('/blog/2025-02-20_new-new-website');
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.getByRole('menuitem', { name: /dark/i }).click();

    // Reload to confirm theme persists
    await page.reload();
    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toContain('dark');
  });

  test('should apply theme on resume page', async ({ page }) => {
    await page.goto('/resume');
    await page.getByRole('button', { name: /toggle theme/i }).click();
    await page.getByRole('menuitem', { name: /light/i }).click();
    const htmlClass = await getHtmlClass(page);
    expect(htmlClass).toContain('light');
  });

  test('should default to dark theme on initial load', async ({ browser }) => {
    // Use a fresh browser context so no stored theme preference exists
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    // The ThemeProvider defaults to 'dark'
    const htmlClass = await getHtmlClass(page);
    // Default theme is dark per ThemeProvider config
    expect(htmlClass).toMatch(/dark/);
    await context.close();
  });
});
