import { expect, type Locator, type Page } from '@playwright/test';
import { SortOptions } from '../types/sortOptions';
import { Brands } from '../types/brands';
import { MainCategory, HandtoolSubCategory } from '../types/productCategories';
import { Product } from '../types/product';



export class HomePage{

    readonly page : Page
    readonly sortOption : Locator;
    readonly searchField : Locator;
    readonly searchBtn : Locator;
    readonly category : Locator;
    readonly brand : Locator;
    readonly sustainability : Locator


    constructor(page : Page){
        this.page = page;
        this.sortOption = page.locator('[data-test="sort"]')
        this.searchField = page.locator('[data-test="search-query"]')
        this.searchBtn = page.locator('[data-test="search-submit"]')
        this.category = page.getByRole('heading', { name: 'By category:' })
        this.brand = page.getByRole('heading', { name: 'By brand:' })
        this.sustainability = page.getByRole('heading', { name: 'Sustainability:' })
    }

     async goto() {
    await this.page.goto("https://practicesoftwaretesting.com/");
    }

    async sortProducts(option : SortOptions){
        await this.sortOption.selectOption(option);
    }
    async selectProductByCategory(category : MainCategory | HandtoolSubCategory){
        await this.page.locator('#filters').getByText(category).click();
        await this.page.waitForLoadState('networkidle');
        
    }
    async selectBrand(brand : Brands){
         await this.brand.getByText(brand).click();
    }

    async getProducts() {
        const products : Product[] = [];

        const productCards = await this.page.locator(".container .card").all();

        for(const card of productCards) {
            const productName = await card.locator('[data-test="product-name"]').textContent();
            const priceText = await card.locator('[data-test="product-price"]').textContent();
            const price = parseFloat(priceText?.replace('$', '') || '0');

            const badge = await card.locator('[data-test="co2-rating-badge"].active').textContent();

            const isEco = await card.locator('[data-test="eco-badge"]').isVisible();


            products.push({
                name : productName || "",
                price : price,
                co2Rating : badge || "" ,
                isEcofriendly : isEco

            });
        }

        return products;
    }
    






    

}