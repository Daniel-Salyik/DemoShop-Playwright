import { Locator, type Page } from "@playwright/test";

export class ProductPage {

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async addToFavorites(){
         await this.page.locator('[data-test="add-to-favorites"]').click();
    }


    async addToCart(){
        await this.page.locator('[data-test="add-to-cart"]').click();
    }

    async getToastMessage(): Promise<string> {
        const toast = this.page.locator('#toast-container');
        await toast.waitFor({ state: 'visible' });
        const message = await toast.textContent() ?? '';
        return message;
    }
    
}