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
    contactPage : async({page}, use) => {
        const contactPage = new ContactPage(page);

        await contactPage.goto();
        await use(contactPage)
    }
});