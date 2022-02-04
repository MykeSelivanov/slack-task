import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Channel } from "../pages/components/Channel";
import { PiedPiperWorkspaceCredentials as WORKSPACE_TEST_DATA } from "../test-data/test-workspace-data";

async function globalTearDown(config: FullConfig) {
	console.log("Executing GlobalTeardown...");
	const browser = await chromium.launch();
	const page = await browser.newPage();

	let loginPage = new LoginPage(page);
	await loginPage.goto(WORKSPACE_TEST_DATA.WORKSPACE_URL);
	await loginPage.logIn(WORKSPACE_TEST_DATA.WORKSPACE_EMAIL,WORKSPACE_TEST_DATA.WORKSPACE_PWD);
	await loginPage.goto(WORKSPACE_TEST_DATA.WORKSPACE_URL);

	let channel = new Channel(page);
	await channel.deleteLatestMessage();
	console.log("Test data clean up finished!");

	await browser.close();
	console.log("GlobalTearDown finished!");
}

export default globalTearDown;
