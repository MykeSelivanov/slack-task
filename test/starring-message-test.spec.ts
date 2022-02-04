import { test, expect } from "@playwright/test";
import { SideBar } from "../pages/components/SideBar";
import { Channel } from "../pages/components/Channel";
import { LoginPage } from "../pages/LoginPage";
import { NavSearch } from "../pages/components/NavSearch";
import {
	PiedPiperWorkspaceCredentials as WORKSPACE_TEST_DATA,
	Channel as CHANNEL_TEST_DATA,
    Message as MESSAGE_TEST_DATA,
    SearchString as SEARCH_STRING_TEST_DATA
} from "../test-data/test-workspace-data";

test.describe.serial("Starring message test", () => {
	// Declare vairables
	let channel;
	let sideBar;
    let navSearch;
	let loginPage;

	test.beforeEach(async ({ page }, testInfo) => {
		console.log(`Test ${testInfo.title} started...`);
		loginPage = new LoginPage(page);
		sideBar = new SideBar(page);
		channel = new Channel(page);
        navSearch = new NavSearch(page);
	});

	test.afterEach(async ({ page }, testInfo) => {
		console.log(`Test ${testInfo.title} => ${testInfo.status}!`);
	});

	test(`Verify starring a message`, async ({ page }) => {
        let channelName;

		await loginPage.goto(WORKSPACE_TEST_DATA.WORKSPACE_URL);
		await page.waitForNavigation({ waitUntil: "load" });

		await sideBar.openChannel(CHANNEL_TEST_DATA.GENERAL);

        // Verify general channel was opened
		channelName = await channel.getCurrentChannelName();
		await expect(channelName).toEqual(CHANNEL_TEST_DATA.GENERAL);

        // Post message and verify it is displayed in channel
        await channel.postMessage(MESSAGE_TEST_DATA.TEST_MESSAGE);
        const latestMessage = await channel.getLatestMessageInChannel();
        await expect(latestMessage).toEqual(MESSAGE_TEST_DATA.TEST_MESSAGE);

        // Save message 
        await channel.addLatestMessageToSavedItems();

        // Open Saved Items list and verify message is displayed
        await sideBar.openSavedItemsList();
        channelName = await channel.getCurrentChannelName();
        await expect(channelName).toEqual(CHANNEL_TEST_DATA.SAVED_ITEMS_CHANNEL_NAME);
        const savedItemsContainSavedMessage = await channel.findMessageInSavedItems(MESSAGE_TEST_DATA.TEST_MESSAGE);
        await expect(savedItemsContainSavedMessage).toBe(true);

        // Verify message is displayed in search results for 'has:star'
        await navSearch.searchFor(SEARCH_STRING_TEST_DATA.HAS_STAR);
        const searchResultsContainSavedMessage = await navSearch.findMessageInSearchResults(MESSAGE_TEST_DATA.TEST_MESSAGE);
        await expect(searchResultsContainSavedMessage).toBe(true);      
	});
});
