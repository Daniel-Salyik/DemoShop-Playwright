import {Locator, type Page} from "playwright/test"
import { ContactData } from "../data/formData";



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
        this.firstName = page.getByLabel("First name");
        this.lastName = page.getByLabel("Last name");
        this.emailAdd = page.getByLabel("Email address");
        this.subject = page.locator("#subject");
        this.message = page.getByLabel("Message *")
        this.attachment = page.getByLabel("Attachment")
        this.sendBtn = page.locator('[data-test="contact-submit"]');
        this.alert = page.getByRole("alert");
    }

    async goto() {
    await this.page.goto("https://practicesoftwaretesting.com/contact");
    }

    async fillForm(formData : ContactData){
        await this.firstName.fill(formData.firstName);
        await this.lastName.fill(formData.lastName);
        await this.emailAdd.fill(formData.email);
        await this.subject.selectOption(formData.selectOption);
        await this.message.fill(formData.message);
    }
    async submitForm(){
        this.sendBtn.click();
    }
    async getAlertText(): Promise<string>{
        let alertText = await this.alert.innerText();
        if(alertText !== null) {
            return alertText;
        } else{
            throw new Error("Something went wrong!");
        }
    }



}