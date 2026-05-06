import { type Page } from "@playwright/test";
import { UserData } from "../types/userData";


export class RegistrationPage {

    readonly page : Page

    constructor(page : Page) {
        this.page = page;
    }


    async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
    }

    async registerNewAccount(newUserData : UserData){
        

        await this.page.locator('[data-test="first-name"]').fill(newUserData.firstname)
        await this.page.locator('[data-test="last-name"]').fill(newUserData.lastname);
        await this.page.locator('[data-test="dob"]').fill(newUserData.dateOfBirth);
        await this.page.locator('[data-test="country"]').selectOption(newUserData.country);
        await this.page.locator('[data-test="postal_code"]').fill(newUserData.postalCode);
        await this.page.locator('[data-test="house_number"]').fill(newUserData.houseNumber);
        await this.page.locator('[data-test="street"]').fill(newUserData.street);
        await this.page.locator('[data-test="city"]').fill(newUserData.city);
        await this.page.locator('[data-test="state"]').fill(newUserData.state);
        await this.page.locator('[data-test="phone"]').fill(newUserData.phoneNumber)
        await this.page.locator('[data-test="email"]').fill(newUserData.email);

        await this.page.locator('[data-test="password"]').fill(newUserData.password)
        await this.page.locator('[data-test="password"]').blur()

        await this.page.locator('[data-test="register-submit"]').click();
    }
}