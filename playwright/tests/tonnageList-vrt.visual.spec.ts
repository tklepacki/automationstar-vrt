import { test as base } from "@playwright/test";
import { PlaywrightVisualRegressionTracker } from "@visual-regression-tracker/agent-playwright"
import { debounceDom } from '../helpers/common';

type TestFixtures = {
    vrt: PlaywrightVisualRegressionTracker;
};
const test = base.extend<{}, TestFixtures>({
    vrt: [
        async ({ browserName }, use) => {
            await use(new PlaywrightVisualRegressionTracker(browserName));
        },
        { scope: "worker" },
    ],
});
test.beforeAll(async ({ vrt }) => {
    await vrt.start();
});
test.afterAll(async ({ vrt }) => {
    await vrt.stop();
});

test('Signal Platform - Navigation Bar', async ({ page, vrt }, testInfo) => {
    await page.goto('https://unstable.dev.signalocean.com/Account/Login');
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
    await vrt.trackElementHandle(page.locator('div[class*="SideNavCollapse_sideBar_"]'), testInfo.title);
})