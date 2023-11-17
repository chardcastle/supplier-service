import { defineConfig } from 'cypress';

export default defineConfig({
    target: "es2015",
    module: "es2015", // or "esnext"
    e2e: {
        supportFile: false,
        specPattern: './e2e/**/*.cy.js',
        baseUrl: 'http://react-app:3000?C',
        retries: {
            runMode: 3,
        },
        viewportHeight: 1080,
        viewportWidth: 1920,
        video: true,
        videosFolder: 'e2e/videos',
        screenshotOnRunFailure: false
    },
});
