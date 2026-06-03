import { Locator, type Page } from "@playwright/test";

export class ProductPage {

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async addToFavorites(){

        const token = await this.page.evaluate(() => localStorage.getItem('token'));
console.log(token);
        await this.page.locator('[data-test="add-to-favorites"]').click();
    }
    async addToCart(){
        await this.page.locator('[data-test="add-to-cart"]').click();
    }
    
}