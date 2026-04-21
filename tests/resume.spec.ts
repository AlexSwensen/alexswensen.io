import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  test('should load and display the resume', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display Work Experience section', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.getByRole('heading', { name: /work experience/i })).toBeVisible();
  });

  test('should display Education section', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.getByRole('heading', { name: /education/i })).toBeVisible();
  });

  test('should display Contact Information section', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.getByRole('heading', { name: /contact information/i })).toBeVisible();
  });

  test('should display Skills section', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.getByRole('heading', { name: /skills/i })).toBeVisible();
  });

  test('should display Certifications section', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.getByRole('heading', { name: /certifications/i })).toBeVisible();
  });

  test('should display Languages section', async ({ page }) => {
    await page.goto('/resume');
    await expect(page.getByRole('heading', { name: /languages/i })).toBeVisible();
  });

  test('should have working header navigation', async ({ page }) => {
    await page.goto('/resume');
    await page.getByRole('link', { name: 'Blog' }).first().click();
    await expect(page).toHaveURL('/blog');
  });
});
