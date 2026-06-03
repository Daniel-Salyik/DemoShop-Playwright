import { Locator, type Page } from "@playwright/test";

export class FavoritesPage {

    readonly page : Page;

    constructor(page : Page){
        this.page = page;
    }

    async goto(){
        this.page.goto('/account/favorites')
    }

    async deleteFromFavorites(){
        await this.page.locator('[data-test="delete"]').click()
    }

    async getFavoriteProducts() {
        const names = await this.page.locator('[data-test="product-name"]').allTextContents();
        return names;
    }
    
}