import { expect, type Locator, type Page } from '@playwright/test';
import { SortOptions } from '../types/sortOptions';
import { Brands } from '../types/brands';
import { MainCategory, HandtoolSubCategory, PowerToolsSubCategory, OtherSubCategory } from '../types/productCategories';
import { Product } from '../types/product';



export class HomePage{

    readonly page : Page
    readonly sortOption : Locator;
    readonly searchField : Locator;
    readonly searchBtn : Locator;
    readonly resetBtn : Locator;
    readonly noResultsMessage : Locator;
    readonly category : Locator;
    readonly brand : Locator;
    readonly sustainability : Locator;
    readonly badgeLocator: Locator


    constructor(page : Page){
        this.page = page;
        this.sortOption = page.locator('[data-test="sort"]');
        this.searchField = page.locator('#search-query');
        this.searchBtn = page.locator('[data-test="search-submit"]');
        this.resetBtn = page.locator('[data-test="search-reset"]');
        this.noResultsMessage = page.locator('[data-test="no-results"]')
        this.category = page.getByRole('heading', { name: 'By category:' });
        this.brand = page.getByRole('heading', { name: 'By brand:' });
        this.sustainability = page.getByRole('heading', { name: 'Sustainability:' });
        this.badgeLocator = page.locator(('[data-test="co2-rating-badge"].active'));
    }

     async goto() {
    await this.page.goto("https://practicesoftwaretesting.com/");
    }

    async sortProducts(option : SortOptions){
        await this.sortOption.selectOption(option);
        await this.page.waitForLoadState('networkidle');
    }
    async selectProductByCategory(category: MainCategory | HandtoolSubCategory | PowerToolsSubCategory | OtherSubCategory) {
    await this.page.locator('#filters').getByText(category, { exact: true }).click();
    await this.page.waitForLoadState('networkidle');
}
    async selectBrand(brand : Brands){
         await this.brand.getByText(brand).click();
    }
    async searchProducts(text : string) {
        await this.searchField.fill(text);
        await this.searchBtn.click();  
    }
    async getNoResultsMessage() {
        return this.noResultsMessage.textContent();
}
    async resetSearchResult(){
        await this.resetBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getProducts() {
        const products : Product[] = [];

        const productCards = await this.page.locator(".container .card").all();

        for(const card of productCards) {
            const productName = await card.locator('[data-test="product-name"]').textContent();
            const priceText = await card.locator('[data-test="product-price"]').textContent();
           
            const price = parseFloat(priceText?.replace('$', '') || '0');

            const badgeRating = await this.badgeLocator.count() > 0 ? await this.badgeLocator.textContent() : ""

            const isEco = await card.locator('[data-test="eco-badge"]').isVisible();


            products.push({
                name : productName || "",
                price : price,
                co2Rating : badgeRating || "" ,
                isEcofriendly : isEco

            });
        }

        return products;
    }
    






    

}