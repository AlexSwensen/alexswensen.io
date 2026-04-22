import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and display the hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Alexander Swensen/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display the header with navigation links', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByRole('link', { name: 'AlexSwensen.io' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Resume' })).toBeVisible();
  });

  test('should display the footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should display the Skills section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/skills/i).first()).toBeVisible();
  });

  test('should display the contact CTA section', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('heading', { name: /let.s work together/i })).toBeVisible();
  });

  test('should navigate to blog when clicking Blog link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Blog' }).first().click();
    await expect(page).toHaveURL('/blog');
  });

  test('should navigate to resume when clicking Resume link', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Resume' }).first().click();
    await expect(page).toHaveURL('/resume');
  });
});
