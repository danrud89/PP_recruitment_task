import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e_scripts",
	timeout: 30 * 1000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 1,
	workers: process.env.CI ? 4 : 1,
	reporter: [["html", { outputFolder: "playwright-report" }]],
	use: {
		baseURL: "http://localhost:8080", 
		trace: "on-first-retry", 
		headless: true,
		viewport: { width: 1920, height: 1080 },
		actionTimeout: 15000,
		ignoreHTTPSErrors: true,
		video: "off",
		screenshot: "only-on-failure",
		launchOptions: {
			args: ["--disable-web-security"],
		},
	},

	projects: [
		{
			name: "Chromium",
			use: { browserName: "chromium" },
		},
	],
});
