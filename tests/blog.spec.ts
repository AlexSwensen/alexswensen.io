import { test, expect } from '@playwright/test';

test.describe('Blog Listing Page', () => {
  test('should load and display blog posts', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/Blog.*Alexander Swensen/);
    await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible();
    const articles = page.locator('article');
    await expect(articles.first()).toBeVisible();
  });

  test('should display post titles, dates, and tags', async ({ page }) => {
    await page.goto('/blog');
    const firstArticle = page.locator('article').first();
    await expect(firstArticle.locator('h2')).toBeVisible();
    await expect(firstArticle.locator('time')).toBeVisible();
  });

  test('should navigate to a blog post when clicking an article', async ({ page }) => {
    await page.goto('/blog');
    const firstArticleLink = page.locator('article a').first();
    const href = await firstArticleLink.getAttribute('href');
    await firstArticleLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator('article')).toBeVisible();
  });
});

test.describe('Blog Post Pages', () => {
  const knownSlugs = [
    '2025-02-20_new-new-website',
    'writing-e2e-tests-with-protractor',
    '2024-04-15_github-actions-scripts',
  ];

  for (const slug of knownSlugs) {
    test(`should load post: ${slug}`, async ({ page }) => {
      await page.goto(`/blog/${slug}`);
      await expect(page.locator('article')).toBeVisible();
      await expect(page.locator('article h1')).toBeVisible();
    });
  }

  test('should display post title and date', async ({ page }) => {
    await page.goto(`/blog/${knownSlugs[0]}`);
    await expect(page.locator('article h1')).toBeVisible();
    await expect(page.locator('article time')).toBeVisible();
  });

  test('should display post tags', async ({ page }) => {
    await page.goto(`/blog/${knownSlugs[0]}`);
    const tagsContainer = page.locator('article header div').filter({ has: page.locator('span') });
    await expect(tagsContainer.first()).toBeVisible();
  });

  test('should return 404 for non-existent slug', async ({ page }) => {
    const response = await page.goto('/blog/this-post-does-not-exist');
    expect(response?.status()).toBe(404);
  });

  test('should have a link back to blog listing', async ({ page }) => {
    await page.goto(`/blog/${knownSlugs[0]}`);
    const blogLink = page.getByRole('link', { name: 'Blog' });
    await expect(blogLink).toBeVisible();
    await blogLink.click();
    await expect(page).toHaveURL('/blog');
  });
});
