import { type Page } from "@playwright/test";
import { UserData } from "../types/userData";


export class ProfilePage {
    readonly page : Page
    
    constructor(page : Page) {
        this.page = page;
    }

    async goto(){
        await this.page.goto('/account/profile');
    }
    async updateProfile(newData : UserData){


        await this.page.locator('[data-test="first-name"]').clear();
        await this.page.locator('[data-test="first-name"]').fill(newData.firstname);

        await this.page.locator('[data-test="last-name"]').clear();
        await this.page.locator('[data-test="last-name"]').fill(newData.lastname);

        await this.page.locator('[data-test="phone"]').clear();
        await this.page.locator('[data-test="phone"]').fill(newData.phoneNumber);

        await this.page.locator('[data-test="update-profile-submit"]').click();

    }


    
}