import { test } from '../fixtures/homePage'
import { expect } from '@playwright/test';

import { Brands } from '../../types/brands';
import { Product } from '../../types/product';
import { SortOptions } from '../../types/sortOptions';
import { MainCategory, HandtoolSubCategory } from '../../types/productCategories';
import { HomePage } from '../../pages/home.page';


test(`user can sort products by name ascending`, async ({homePage}) => {


    await homePage.sortProducts(SortOptions.NameAscending);

    const sortedProductsAsc = await homePage.getProducts();

    const ascNames = sortedProductsAsc.map(product => product.name);

    for (let i = 0; i < ascNames.length - 1; i++) {
        expect(ascNames[i].localeCompare(ascNames[i + 1])).toBeLessThanOrEqual(0);
    }
})

test(`user can sort products by name descending`, async({homePage}) => {
    

    await homePage.sortProducts(SortOptions.NameDescending);

    const sortedProductsDesc = await homePage.getProducts();

    const descNames = sortedProductsDesc.map(product => product.name);
    //console.log(descNames)

    for (let i = 0; i < descNames.length - 1; i++) {
        expect(descNames[i].localeCompare(descNames[i + 1])).toBeGreaterThanOrEqual(0);
    }
})
test(`user can sort products by price ascending`, async({homePage}) => {
    

    await homePage.sortProducts(SortOptions.PriceAscending);

    const sortedProductsAsc = await homePage.getProducts();

    const productPrices = sortedProductsAsc.map(product => product.price);
    

    for (let i = 0; i < productPrices.length - 1; i++) {
        expect(productPrices[i]).toBeLessThanOrEqual(productPrices[i+1]);
    }
})
test(`user can sort products by price descending`, async({homePage}) => {
    
    await homePage.sortProducts(SortOptions.PriceDescending);

    const sortedProductsDesc = await homePage.getProducts();

    const productPrices = sortedProductsDesc.map(product => product.price);
    
    for (let i = 0; i < productPrices.length - 1; i++) {
        expect(productPrices[i]).toBeGreaterThanOrEqual(productPrices[i+1]);
    }
})

test(`user can sort products by co2 rating ascending`, async({homePage}) => {

    await homePage.sortProducts(SortOptions.Co2Ascending);

    const co2RatingAsc = (await homePage.getProducts()).map(product => product.co2Rating);

    for (let i = 0; i < co2RatingAsc.length-1; i++) {
        expect(co2RatingAsc[i].localeCompare(co2RatingAsc[i+1])).toBeLessThanOrEqual(0)
        
    }

})

test(`user can sort products by co2 rating descending`, async({homePage}) => {

    await homePage.sortProducts(SortOptions.Co2Descending)

    const co2RatingDesc = (await homePage.getProducts()).map(product => product.co2Rating);
    
    for (let i = 0; i < co2RatingDesc.length - 1; i++) {
        expect(co2RatingDesc[i].localeCompare(co2RatingDesc[i + 1])).toBeGreaterThanOrEqual(0);       
    }
})

test('user gets no results for unmatched search term', async({homePage}) => {
    await homePage.searchProducts('xyzabc123');
    
    await expect(homePage.noResultsMessage).toBeVisible();

    const emptyProducts = await homePage.getProducts();
    expect(emptyProducts.length).toBe(0);
    
    
    await homePage.resetSearchResult();
    const products = await homePage.getProducts();
    expect(products.length).toBeGreaterThan(0);
})
test('user gets results for matched search term', async({homePage}) => {

    await homePage.searchProducts("hammer");

    const products = await homePage.getProducts();
    expect(products.length).toBeGreaterThan(0);
    
})
test('user can filter by category', async({ homePage }) => {
    await homePage.selectProductByCategory(MainCategory.Power_Tools);
    
    const products = await homePage.getProducts();
    
    if(products.length > 0) {
        expect(products.length).toBeGreaterThan(0);
    } else {
        await expect(homePage.noResultsMessage).toBeVisible();
    }
})

test('user can filter products by price range', async({ homePage }) => {
    const minPrice = 30;
    const maxPrice = 85;
    
    await homePage.setPriceRange(minPrice, maxPrice);
    await homePage.page.waitForLoadState('networkidle');
    
    
    await homePage.sortProducts(SortOptions.PriceAscending);
    const ascProducts = await homePage.getProducts();
    const ascPrices = ascProducts.map(p => p.price);
    expect(ascPrices.length).toBeGreaterThan(0);
    expect(ascPrices[0]).toBeGreaterThanOrEqual(minPrice);
    
    
    await homePage.sortProducts(SortOptions.PriceDescending);
    const descProducts = await homePage.getProducts();
    const descPrices = descProducts.map(p => p.price);
    expect(descPrices[0]).toBeLessThanOrEqual(maxPrice);
})