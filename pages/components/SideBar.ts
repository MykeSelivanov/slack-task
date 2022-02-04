import { Locator, Page } from "@playwright/test";
import { Channel as CHANNEL_TEST_DATA } from "../../test-data/test-workspace-data";

export class SideBar {
	readonly page: Page;
	testChannel: Locator;

	constructor(page: Page) {
		this.page = page;
	}

	async openChannel(channelName: string) {
		this.testChannel = this.page.locator(`[data-qa='channel_sidebar_name_${channelName}']`);
		await this.testChannel.click();
		console.log(`Channel ${channelName} opened...`);
	}

	async openSavedItemsList() {
		await this.openChannel(CHANNEL_TEST_DATA.SAVED_ITEMS_SELECTOR_PART);
		await this.page.waitForSelector("[data-qa='saved_item_message']");
	}
}
