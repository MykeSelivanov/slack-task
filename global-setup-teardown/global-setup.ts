import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { PiedPiperWorkspaceCredentials as WORKSPACE_TEST_DATA } from "../test-data/test-workspace-data";

async function globalSetup(config: FullConfig) {
	console.log("Executing GlobalSetup...");
	const browser = await chromium.launch();
	const page = await browser.newPage();

	let loginPage = new LoginPage(page);
	await loginPage.goto(WORKSPACE_TEST_DATA.WORKSPACE_URL);
	await loginPage.logIn(WORKSPACE_TEST_DATA.WORKSPACE_EMAIL,WORKSPACE_TEST_DATA.WORKSPACE_PWD);

	await page.context().storageState({ path: "storageState.json" });
	await browser.close();
	console.log("GlobalSetup finished!");
}

export default globalSetup;
