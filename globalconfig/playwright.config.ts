import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
	testDir: "../test",
	globalSetup: require.resolve("../global-setup-teardown/global-setup.ts"),
	globalTeardown: require.resolve("../global-setup-teardown/global-teardown.ts"),
	reporter: [["list"], ["json", { outputFile: "test-results.json" }]], // list report in CLI + local test-results.json report file
	expect: { timeout: 10 * 1000 },
	timeout: 60 * 1000,
	use: {
		headless: false,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		launchOptions: { slowMo: 50 },
		actionTimeout: 10 * 1000,
		navigationTimeout: 50 * 1000,
		// Points all tests to load signed-in state from "storageState.json"
		storageState: "storageState.json",
	},
};
export default config;
