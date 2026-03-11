import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';
import { ContactData } from '../types/contactData';


test('Guest submits contact form without attachment', async({page}) => {
    const contact = new ContactPage(page);

    const data: ContactData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        subject: "Warranty",
        message: "Test".repeat(15)
    }
    await contact.goto();
    await contact.fillForm(data);
    await contact.submitForm();

    const alertText = await contact.getAlertText();

    await expect(alertText).toContain("Thanks for your message");

})