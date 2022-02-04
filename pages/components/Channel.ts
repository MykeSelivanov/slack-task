import { Locator, Page } from "@playwright/test";

export class Channel {
	readonly page: Page;
	readonly channelName: Locator;
	readonly messageInput: Locator;
	readonly sendButton: Locator;
	readonly message: Locator;
	readonly addToSavedItems: Locator;
	readonly moreActions: Locator;
	readonly savedItemsMessages: Locator;
	readonly deleteMessageButton: Locator;
	readonly deleteConfirmButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.channelName = page.locator("[data-qa='channel_name']");
		this.messageInput = page.locator("[data-qa='message_input'] >> [aria-label='Message to general']");
		this.sendButton = page.locator("[data-qa='texty_send_button']");
		this.message = page.locator("[data-qa='message_content']");
		this.addToSavedItems = page.locator("[aria-label='Add to saved items']");
		this.moreActions = page.locator("[data-qa='more_message_actions']");
		this.savedItemsMessages = page.locator(".p-rich_text_section");
		this.deleteMessageButton = page.locator("[data-qa='delete_message']");
		this.deleteConfirmButton = page.locator("[data-qa='dialog_go']");
	}

	async getCurrentChannelName() {
		const channelName = await this.channelName.textContent();
		return channelName;
	}

	async postMessage(message: string) {
		await this.messageInput.fill(message);
		await this.sendButton.click();
		console.log("Message posted...");
	}

	async getLatestMessageInChannel() {
		const latestMessageTextContent = await this.message.last().textContent();
		// Cut the author + time part from the textContent, spliting the string on ' AM' or ' PM'
		const splitTextContent = latestMessageTextContent.includes(" AM")
			? latestMessageTextContent.split(" AM")
			: latestMessageTextContent.split(" PM");
		const latestMessage = splitTextContent.length === 2 ? splitTextContent[1] : splitTextContent[0];
		return latestMessage;
	}

	async addLatestMessageToSavedItems() {
		const latestMessage = this.message.last();

		await Promise.all([
			latestMessage.hover(),
			this.page.waitForSelector("[aria-label='Add to saved items']", { state: "visible" }),
		]);

		await this.addToSavedItems.click();
		console.log("Message saved...");
	}

	async deleteLatestMessage() {
		const latestMessage = this.message.last();

		await Promise.all([
			latestMessage.hover(),
			this.page.waitForSelector("[data-qa='more_message_actions']", { state: "visible" }),
		]);

		await this.moreActions.click();
		await this.deleteMessageButton.click();
		await this.deleteConfirmButton.click();
	}

	async findMessageInSavedItems(message: string) {
		const allSavedMessagesTextContent = await this.savedItemsMessages.allTextContents();
		console.log(`All messages in saved items found: ${allSavedMessagesTextContent}`);
		return allSavedMessagesTextContent.includes(message);
	}
}
