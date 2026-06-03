import { selectProductByName } from '../../utils/productUtil';
import { test, expect} from '../fixtures';

test.describe('favorites', () => {

    test('user can add product to favorites', async({page, accountPage, homePage, productPage, favoritesPage}) => {


        await page.goto("");
        await page.locator('[data-test="nav-categories"]').click();
        await page.getByText('Hand Tools').click();

        await homePage.waitForProductsToLoad();

        await selectProductByName(page,"Bolt Cutters");

        await productPage.addToFavorites();
        // await expect(page.locator('.toast-container')).toContainText('Product added to your favorites');


        // await expect(page.locator('[data-test="product-name"]')).toContainText("Bolt Cutters");



    })
})