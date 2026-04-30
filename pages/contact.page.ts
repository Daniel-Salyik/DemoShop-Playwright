import {Locator, type Page} from "playwright/test"
import { ContactData } from "../types/contactData";



export class ContactPage{

    readonly page : Page;
    readonly firstName : Locator;
    readonly lastName : Locator;
    readonly emailAdd : Locator;
    readonly subject : Locator;
    readonly message : Locator;
    readonly attachment : Locator;
    readonly sendBtn : Locator;
    readonly alert : Locator;

    constructor(page : Page){
        this.page = page;
        this.firstName = page.locator('[id="first_name"]');
        this.lastName = page.locator('[id="last_name"]');
        this.emailAdd = page.locator('[id="email"]');
        this.subject = page.locator('[id="subject"]');
        this.message = page.locator('[id="message"]');
        this.attachment = page.locator('[id="attachment"]')
        this.sendBtn = page.locator('[data-test="contact-submit"]');
        this.alert = page.getByRole("alert");
    }

    async goto() {
    await this.page.goto("https://practicesoftwaretesting.com/contact");
    }

  async fillForm(formData: Partial<ContactData>) {

    if (formData.firstName !== undefined) await this.firstName.fill(formData.firstName);
    if (formData.lastName !== undefined) await this.lastName.fill(formData.lastName);
    if (formData.email !== undefined) await this.emailAdd.fill(formData.email);
    if (formData.subject !== undefined) await this.subject.selectOption(formData.subject);
    if (formData.message !== undefined) await this.message.fill(formData.message);
}
    async submitForm(){
        await this.sendBtn.click();
        
        await this.alert.first().waitFor({ state: 'visible' });
        
    }
    async getAlertTexts(): Promise<string[]>{

        await this.alert.first().waitFor({ state: 'visible' });
        

        // using trim function on the text to avoid any possible white spaces in the text
        const alertText = (await this.alert.allTextContents()).map(text => text.trim());

        return alertText;
        
    }



}