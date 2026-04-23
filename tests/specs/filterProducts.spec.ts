import { test } from '../fixtures/homePage'
import { expect } from '@playwright/test';

import { Brands } from '../../types/brands';
import { Product } from '../../types/product';
import { SortOptions } from '../../types/sortOptions';
import { MainCategory, HandtoolSubCategory } from '../../types/productCategories';


test(`user can sort products by name ascendind`, async ({homePage}) => {


    await homePage.sortProducts(SortOptions.NameAscending);

    const sortedProductsAsc = await homePage.getProducts();

    const ascNames = sortedProductsAsc.map(product => product.name);

    for (let i = 0; i < ascNames.length - 1; i++) {
        expect(ascNames[i].localeCompare(ascNames[i + 1])).toBeLessThanOrEqual(0);
    }
})

test(`user can sort products by name descending`, async({homePage}) => {
    

    await homePage.sortProducts(SortOptions.NameDescending)

    const sortedProductsDesc = await homePage.getProducts();

    const descNames = sortedProductsDesc.map(product => product.name);
    //console.log(descNames)

    for (let i = 0; i < descNames.length - 1; i++) {
        expect(descNames[i].localeCompare(descNames[i + 1])).toBeGreaterThanOrEqual(0);
    }
})

test(`user can filter products by search name`, async({homePage},) => {
    await homePage.searchProduct("")
})