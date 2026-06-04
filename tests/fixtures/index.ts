import { test as base, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ContactPage } from '../../pages/contact.page';
import { RegistrationPage } from '../../pages/registration.page';
import { LoginPage } from '../../pages/login.page';
import { AccountPage } from '../../pages/account.page';
import env from '../../utils/env';
import { FavoritesPage } from '../../pages/favoritesPage';
import { ProductPage } from '../../pages/productPage';
import { ProfilePage } from '../../pages/profile.page';

type Fixtures = {
    homePage : HomePage,
    contactPage : ContactPage,
    registrationPage : RegistrationPage,
    loginPage : LoginPage
    accountPage : AccountPage
    favoritesPage : FavoritesPage
    productPage : ProductPage
    profilePage : ProfilePage
}

export { expect };

export const test = base.extend<Fixtures>({
    homePage : async({page}, use) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await use(homePage);

    },
    contactPage : async({page}, use) => {

        const contactPage = new ContactPage(page);

        await contactPage.goto();
        await use(contactPage);
        
    },
    registrationPage : async({page}, use) => {
        
        const registrationPage = new RegistrationPage(page);

        await registrationPage.goto();
        await use(registrationPage);
    },
    loginPage : async({page}, use)=> {
        
        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();
        await use(loginPage);
        
    },
    accountPage : async({page}, use) => {

        const loginPage = new LoginPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.login(env.REGISTERED_EMAIL_FOR_USER1, env.PASSWORD_FOR_USER1);
    

        const token = await page.evaluate(() => localStorage.getItem('token'));

        const accountPage = new AccountPage(page);
        await accountPage.goto();
        
        await use(accountPage);

    },
    favoritesPage : async({page}, use) => {
        const favoritesPage = new FavoritesPage(page);

        await use(favoritesPage)
    },
    productPage : async({page}, use) => {
        const productPage = new ProductPage(page);

        await use(productPage);
    },
    profilePage : async({page}, use) => {
        const profilePage = new ProfilePage(page);

        await use(profilePage);

    }

});