import { defineConfig } from 'cypress'

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: true,
    html: true,
    reportTitle: "Cypress Test Report",
    json: true,
    inlineAssets: true,
  },
  e2e: {
    setupNodeEvents(on, config) {

      on('before:browser:launch', (browser, launchOptions) => {
        const width = 1600;
        const height = 900;

        if (browser.name === 'electron') {
          launchOptions.preferences.width = width;
          launchOptions.preferences.height = height;
        } else if (browser.family === 'chromium') {
          launchOptions.args.push(`--window-size=${width},${height}`);
        }

        return launchOptions;
      });

      return config;
    },
    baseUrl: "https://unstable.dev.signalocean.com",
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    viewportWidth: 1600,
    viewportHeight: 900,
  },

})