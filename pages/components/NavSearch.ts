import { Locator, Page } from "@playwright/test";
import { sleep } from "../../util/utilities";

export class NavSearch {
	readonly page: Page;
	readonly topNavSearch: Locator;
	readonly searchInput: Locator;
	readonly messagesSearchResults: Locator;
	readonly messagesCount: Locator;

	constructor(page: Page) {
		this.page = page;
		this.topNavSearch = this.page.locator("[data-qa='top_nav_search']");
		this.searchInput = this.page.locator("[data-qa='focusable_search_input'] >> [aria-label='Search']");
		this.messagesSearchResults = this.page.locator(".p-rich_text_section");
		this.messagesCount = this.page.locator("[data-qa='tabs_item_render_count']");
	}

	async searchFor(searchString: string) {
		console.log(`Searching for ${searchString} messages...`);
		await this.topNavSearch.click();
		await this.searchInput.fill(searchString);
		await this.page.keyboard.press("Enter");

		// Noticed some latency for search results, basically, if you save a message, it takes some time for it to be displayed
		// under has:star search results. Therefore waitForSearchResults waits for up to 36 seconds, polling every 3 seconds
		// to check for message to be displayed in search results
		await this.waitForSearchResults();
	}

	async findMessageInSearchResults(message: string) {
		const allSearchResultsTextContent = await this.messagesSearchResults.allTextContents();
		console.log(`All has:star search results found: ${allSearchResultsTextContent}`);
		console.log("Has:star messages retrieved...");
		return allSearchResultsTextContent.includes(message);
	}

	/**
	 * @todo potentially refactor this later on to wait for network response to include searched for messages + verify message UI presence with visual comparison?
	 */
	async waitForSearchResults() {
		console.log("Waiting for search results...");
		let foundMessages = await this.messagesCount.first().textContent();
		for (let i = 0; i < 12; i++) {
			console.log(`Polling has:star displayed messages: ${foundMessages}`);
			if (foundMessages === "0") {
				await sleep(2000);
				await this.topNavSearch.click();
				await this.searchInput.fill("has:star");
				await this.page.keyboard.press("Enter");
				await sleep(1000);
				foundMessages = await this.messagesCount.first().textContent();
			} else {
				break;
			}
		}
	}
}
