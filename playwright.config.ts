import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './playwright/tests',  
  timeout: 90000,
  snapshotPathTemplate: "playwright/tests/__screenshots__/{arg}.snap.png",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 0 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://unstable.dev.signalocean.com',
  },
  projects: [
    {
      name: "chromium",
      use: { viewport: { width: 1920, height: 1080 } },
    },
  ],
});
