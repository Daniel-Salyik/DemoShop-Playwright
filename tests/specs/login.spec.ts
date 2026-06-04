import { test, expect } from '../fixtures'
import env from '../../utils/env';


test(`user can login with valid credentials`, async({loginPage, page}) => {
    
    await loginPage.login(env.REGISTERED_EMAIL_FOR_USER1, env.PASSWORD_FOR_USER1);

    await expect(page).toHaveURL('/auth\/\login');
    
    
})

test(`user cannot loggin with invalid credentials`, async({loginPage}) => {
    
    await loginPage.login("invalid@test.com", "invalid1030");


    await expect(loginPage.errorMessage).toContainText("Invalid");

})