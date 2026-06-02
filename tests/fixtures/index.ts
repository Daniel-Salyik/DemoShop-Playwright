import { test as base, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ContactPage } from '../../pages/contact.page';
import { RegistrationPage } from '../../pages/registration.page';
import { LoginPage } from '../../pages/login.page';
import { AccountPage } from '../../pages/account.page';
import env from '../../utils/env';

type Fixtures = {
    homePage : HomePage,
    contactPage : ContactPage,
    registrationPage : RegistrationPage,
    loginPage : LoginPage
    accountPage : AccountPage
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

        const accountPage = new AccountPage(page);
        
        await use(accountPage);

    }
});