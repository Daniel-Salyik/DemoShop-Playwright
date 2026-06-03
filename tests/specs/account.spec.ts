import { selectProductByName } from '../../utils/productUtil';
import { test, expect} from '../fixtures';
import env from '../../utils/env';
import { AccountPage } from '../../pages/account.page';
import { HomePage } from '../../pages/home.page';
import { ProductPage } from '../../pages/productPage';
import { FavoritesPage } from '../../pages/favoritesPage';

test.describe('favorites', () => {

    test('user can add product to favorites', async({loginPage}) => {


        await loginPage.login(env.REGISTERED_EMAIL_FOR_USER1, env.PASSWORD_FOR_USER1);

        const accountPage = new AccountPage(loginPage.page);

        await expect(loginPage.page).toHaveURL(/account/);

        await accountPage.page.locator('[data-test="nav-home"]').click();

        const homePage = new HomePage(accountPage.page);

        homePage.waitForProductsToLoad();

        await selectProductByName(homePage.page, "Bolt Cutters");

        const productPage = new ProductPage(homePage.page);

        await productPage.page.locator('[data-test="add-to-favorites"]').waitFor({ state: 'visible' });

        await productPage.addToFavorites();

        const message = await productPage.getToastMessage();

        expect(message).toMatch(/Product added to your favorites|Product already in your favorites list/);

    })
    test('user cannot add product to favorites without unauthorization', async({homePage}) => {

        await homePage.waitForProductsToLoad();

        await selectProductByName(homePage.page, "Bolt Cutters");

        const productPage = new ProductPage(homePage.page);

        await productPage.page.locator('[data-test="add-to-favorites"]').waitFor({ state: 'visible' });

        await productPage.addToFavorites();

        const message = await productPage.getToastMessage();

        expect(message).toContain("Unauthorized")
    })
})