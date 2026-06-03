import { Page } from "@playwright/test";

export async function selectProductByName(page: Page, name: string) {
    await page.locator('[data-test="product-name"]')
        .filter({ hasText: name })
        .click();
}