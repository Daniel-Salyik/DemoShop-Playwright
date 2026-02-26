import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';
import { ContactData } from '../data/formData';


test('Fill out contact form', async({page}) => {
    const contact = new ContactPage(page);

    const data = 
})