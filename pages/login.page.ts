import { type Page } from "@playwright/test";

export class LoginPage {

    readonly page : Page

    constructor(page : Page) {
        this.page = page;
    }

    async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }
}