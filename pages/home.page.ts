import { type Locator, type Page } from '@playwright/test';
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
    readonly brand : Locator;
    readonly sustainability : Locator;
    readonly minSlider: Locator;
    readonly maxSlider: Locator;


    constructor(page : Page){
        this.page = page;
        this.sortOption = page.locator('[data-test="sort"]');
        this.searchField = page.locator('#search-query');
        this.searchBtn = page.locator('[data-test="search-submit"]');
        this.resetBtn = page.locator('[data-test="search-reset"]');
        this.noResultsMessage = page.locator('[data-test="no-results"]')
        this.brand = page.getByRole('heading', { name: 'By brand:' });
        this.sustainability = page.getByRole('heading', { name: 'Sustainability:' });
        this.minSlider = page.getByRole('slider', { name: 'ngx-slider', exact: true });
        this.maxSlider = page.getByRole('slider', { name: 'ngx-slider-max' });
    }

     async goto() {
    await this.page.goto('/');
    }

    async sortProducts(option : SortOptions){
        await this.sortOption.selectOption(option);

        await this.page.waitForResponse((response) => response.url().includes('sort') && response.status() === 200);

        await this.waitForProductsToLoad();

    }
    async selectProductByCategory(category: MainCategory | HandtoolSubCategory | PowerToolsSubCategory | OtherSubCategory) {
        await this.page.locator('#filters').getByText(category, { exact: true }).click();

        await this.page.waitForResponse((response) => response.url().includes('/products') && response.status() === 200);

        await this.waitForProductsToLoad();


    }
    async selectBrand(brand : Brands){
         await this.brand.getByText(brand).click();

         await this.waitForProductsToLoad();


    }
    async searchProducts(text : string) {
        await this.searchField.fill(text);

        
        await this.searchBtn.click(); 
        
        await this.page.waitForResponse((response) => response.url().includes('/search') && response.status() === 200);

        await this.waitForProductsToLoad();

    }

    async getNoResultsMessage() {
        return await this.noResultsMessage.textContent();
    }

    async resetSearchResult(){
        await this.resetBtn.click();

        await this.page.waitForResponse((response) => response.url().includes('/products') && response.status() === 200);

        await this.waitForProductsToLoad();
        

    }
    async setPriceRange(minValue: number, maxValue: number) {
        await this.setSliderValue(this.minSlider, minValue);
        await this.setSliderValue(this.maxSlider, maxValue);
}

    private async setSliderValue(handle: Locator, targetValue: number) {
        await handle.focus();
        
        let currentValue = parseInt(await handle.getAttribute('aria-valuenow') || '0');
        
        while (currentValue !== targetValue) {
            if (currentValue < targetValue) {
                await handle.press('ArrowRight');
                currentValue++;
            } else {
                await handle.press('ArrowLeft');
                currentValue--;
            }
        }
}

    async getProducts() {
        const products : Product[] = [];
        
        const cardLocator = this.page.locator('.container .card').filter({ has: this.page.locator('[data-test="product-name"]') });

        const count = await cardLocator.count();


        for(let i = 0; i < count; i++) {
            const card = cardLocator.nth(i);
            const productName = await card.locator('[data-test="product-name"]').textContent();
            const priceText = await card.locator('[data-test="product-price"]').textContent();
           
            const price = parseFloat(priceText?.replace('$', '') || '0');

            const badgeLocator = card.locator('[data-test="co2-rating-badge"].active');
            const badgeRating = await badgeLocator.count() > 0 
                ? await badgeLocator.textContent() : ""

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

    private async waitForProductsToLoad(){

        await Promise.race([
            this.page.locator('.container .card')
                .filter({ has: this.page.locator('[data-test="product-name"]') })
                .first()
                .waitFor({ state: 'visible' }),
            this.noResultsMessage.waitFor({ state: 'visible' })
        ]);

    }
    






    

}