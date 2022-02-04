import { Locator, Page } from "@playwright/test";

export class LoginPage {
	readonly page: Page;
	readonly loginEmailInput: Locator;
	readonly loginPasswordInput: Locator;
	readonly signInButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.loginEmailInput = page.locator("[data-qa='login_email']");
		this.loginPasswordInput = page.locator("[data-qa='login_password']");
		this.signInButton = page.locator("#signin_btn");
	}

	async goto(workspaceUrl: string) {
		await this.page.goto(workspaceUrl);
	}

	async inputLoginEmail(loginEmail: string) {
		await this.loginEmailInput.fill(loginEmail);
	}

	async inputLoginPassword(loginPassword: string) {
		await this.loginPasswordInput.fill(loginPassword);
	}

	async clickSignInButton() {
		await this.signInButton.click();
	}

	async logIn(loginEmail: string, loginPassword: string) {
		await this.inputLoginEmail(loginEmail);
		await this.inputLoginPassword(loginPassword);
		await this.clickSignInButton();
	}
}
