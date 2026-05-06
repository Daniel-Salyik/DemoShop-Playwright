import { test, page } from '../fixtures'
import { expect } from '@playwright/test';
import { generateUserData } from '../../utils/generateUserData';
import { UserData } from '../../types/userData';
import { LoginPage } from '../../pages/login.page';

test('user can register new account with valid credentials', async({registrationPage}) => {

    const newAccountData : UserData = generateUserData();

    await registrationPage.registerNewAccount(newAccountData);

    // after registration browser navigates to login page, missing confirmation message for the user

    const loginPage = new LoginPage(registrationPage.page);

    await expect(loginPage.page.locator('[data-test="login-submit"]')).toBeVisible();
    await expect(loginPage.page).toHaveURL(/auth\/login/);

})