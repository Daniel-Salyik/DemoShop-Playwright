import { Locator, type Page } from "@playwright/test";

export class LoginPage {

    readonly page : Page
    readonly errorMessage : Locator

    constructor(page : Page) {
        this.page = page;
        this.errorMessage = page.locator('[data-test="login-error"]');
    }

    async gotoLoginPage() {
        await this.page.goto('/auth/login');
    }

    async login(email: string, password: string){
        await this.page.locator('[data-test="email"]').fill(email)
        await this.page.locator('[data-test="password"]').fill(password)
        await this.page.locator('[data-test="login-submit"]').click();
    }
    

}
