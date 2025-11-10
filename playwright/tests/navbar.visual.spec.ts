import { test, expect } from '@playwright/test';
import { debounceDom } from '../helpers/common';

test('Signal Platform - Navigation Bar', async ({ page }) => {
    await page.goto('/');
    await page.fill("#enterEmailFormEmail", "user1@stresstest.com");
    await page.click("#enterEmailFormSubmit");
    await page.fill("#password", "Qweasd12@");
    await page.click("#submitLogin");
    await page.getByRole("button", { name: "Accept" }).click();
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForSelector('div[class*="SideNavCollapse_sideBar_"]')
    await debounceDom(page)
    await page.getByText('Favourites').click();
    await page.waitForLoadState('networkidle')
    await page.waitForLoadState('domcontentloaded')
    await debounceDom(page)
    await expect(page.locator('div[class*="SideNavCollapse_sideBar_"]')).toHaveScreenshot({ mask: [page.locator('.tw-flex-shrink-0'), page.locator('img.tw-h-4.tw-w-4')] });
})

