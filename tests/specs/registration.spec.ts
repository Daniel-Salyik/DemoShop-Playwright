import { test } from '../fixtures'
import { expect } from '@playwright/test';
import { generateUserData } from '../../utils/generateUserData';
import { UserData } from '../../types/userData';
import { LoginPage } from '../../pages/login.page';
import  env  from '../../utils/env';


test('user can register new account with valid credentials', async({registrationPage}) => {

    const newAccountData : UserData = generateUserData();

    await registrationPage.registerNewAccount(newAccountData);

    // after registration browser navigates to login page, missing confirmation message for the user

    const loginPage = new LoginPage(registrationPage.page);

    await expect(loginPage.page.locator('[data-test="login-submit"]')).toBeVisible();
    await expect(loginPage.page).toHaveURL(/auth\/login/);

})

test('user cannot register with  already registered email', async({registrationPage})=>{

        const email = env.REGISTERED_EMAIL_FOR_USER1;
        const password = env.PASSWORD_FOR_USER1;
        
        const userData : UserData = generateUserData();
        userData.email = email;

        await registrationPage.registerNewAccount(userData);

        const alert = await registrationPage.getAlertMessage('.help-block');

        expect(alert).toContain("this email address already exists")

    })