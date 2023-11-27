import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents() {},
        specPattern: './e2e/**/*.cy.ts',
        baseUrl: 'http://localhost:3000',
        retries: {
            runMode: 1,
        },
        viewportHeight: 1080,
        viewportWidth: 1920,
        video: true,
        videosFolder: './e2e/videos',
        screenshotOnRunFailure: false
    }
});
