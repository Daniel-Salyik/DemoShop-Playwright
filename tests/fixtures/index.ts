import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ContactPage } from '../../pages/contact.page';
import { RegistrationPage } from '../../pages/registration.page';
import { LoginPage } from '../../pages/login.page';

type Fixtures = {
    homePage : HomePage,
    contactPage : ContactPage,
    registrationPage : RegistrationPage,
    loginPage : LoginPage
}

export const test = base.extend<Fixtures>({
    homePage : async({page}, use) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await use(homePage);

    },
    contactPage : async({browser}, use) => {

        const context = await browser.newContext();
        const page = await context.newPage();
        const contactPage = new ContactPage(page);

        await contactPage.goto();
        await use(contactPage);
        await context.close(); 
    },
    registrationPage : async({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const registrationPage = new RegistrationPage(page);

        await registrationPage.goto();
        await use(registrationPage);
        await context.close();
    },
    loginPage : async ({browser}, use)=> {
        const context = await browser.newContext();
        const page = await context.newPage();
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await use(loginPage);
        await context.close();
    }
});