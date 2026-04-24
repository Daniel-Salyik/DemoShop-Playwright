import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ContactPage } from '../../pages/contact.page';

type Fixtures = {
    homePage : HomePage,
    contactPage : ContactPage
}

export const test = base.extend<Fixtures>({
    homePage : async({page}, use) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await use(homePage);

    },
    contactPage : async({browser}, use) => {

        const context = await browser.newContext({serviceWorkers: 'block'});
        const page = await context.newPage();
        const contactPage = new ContactPage(page);

        await contactPage.goto();
        await use(contactPage)
        await context.close();
        
    }
});