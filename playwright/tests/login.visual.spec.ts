import { test, expect } from '@playwright/test';
import { debounceDom } from '../helpers/common';

test('Signal Platform - Login Page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')
    await debounceDom(page)
    await expect(page).toHaveScreenshot();
});
