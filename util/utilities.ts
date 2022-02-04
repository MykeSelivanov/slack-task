import { expect } from "@playwright/test";

/**
 * Freezes the execution thread by provided time parameter
 * @param time - milliseconds 
 */
export function sleep(time: number) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time);
	});
}

/**
 * Screenshot comparison method
 * Takes the screenshot and compares to the 'golden'(expected) file pixel by pixel
 * @param filepath - filepath to the golden file that execution screenshot will be compared to
 * @param thresholdNumber - value from 0.1 to 1 - threshold for how much difference can be allowed between 2 files (smaller is more sensitive)
 */
export async function screenshotComparison(page, filepath: string, thresholdNumber: number) {
    expect(
        await page.screenshot({
            fullPage: true, 
        })).toMatchSnapshot(filepath, { threshold: thresholdNumber });
}
