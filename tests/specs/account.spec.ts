import { selectProductByName } from '../../utils/productUtil';
import { test, expect} from '../fixtures';
import env from '../../utils/env';
import { AccountPage } from '../../pages/account.page';
import { HomePage } from '../../pages/home.page';
import { ProductPage } from '../../pages/productPage';
import { ProfilePage } from '../../pages/profile.page';
import { generateUserData } from '../../utils/generateUserData';

test.describe('favorites', () => {

    test('user can add product to favorites', async({loginPage}) => {


        // skip in CI due to CAPTCHA blocking registration
        test.skip(!!process.env.CI, "CAPTCHA blocks registration in CI")


        await loginPage.login(env.REGISTERED_EMAIL_FOR_USER1, env.PASSWORD_FOR_USER1);

        const accountPage = new AccountPage(loginPage.page);

        await expect(loginPage.page).toHaveURL('/account');

        const homePage = new HomePage(accountPage.page);

        homePage.goto();

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

test.describe('profile', ()=> {
    test('user can update profile information', async({loginPage})=> {

        // skip in CI due to CAPTCHA blocking registration
        test.skip(!!process.env.CI, "CAPTCHA blocks registration in CI")

        const updateData  = generateUserData();

        await loginPage.login(env.REGISTERED_EMAIL_FOR_USER1, env.PASSWORD_FOR_USER1);

        await expect(loginPage.page).toHaveURL('/auth\/login');

        const accountPage = new AccountPage(loginPage.page);

        await accountPage.page.locator('[data-test="nav-profile"]').click()

        const profilePage = new ProfilePage(accountPage.page)

        await profilePage.page.waitForResponse(response => response.url().includes('/users/me') && response.status() === 200);

        await profilePage.updateProfile(updateData);

        await expect(profilePage.page.locator('.alert-success')).toHaveText('Your profile is successfully updated!', { timeout: 4000 });

    })
})