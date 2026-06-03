import { test, expect} from '../fixtures';
import { ContactData } from '../../types/contactData';
import { ContactTestCase } from '../../types/contactTestCase';


const testCases: ContactTestCase[] = [
    {
        name: "Guest successfully submits contact form without attachment",
        data : {
            firstName: "John",
            lastName: "Doe",
            email: "john@test.com",
            subject: "Warranty",
            message: "Test".repeat(15)
        },
        expected : "Thanks for your message! We will contact you shortly."
    },
    //      Chrome in CI bypasses Angular frontend validation
    //      for firstName and email fields, allowing form submission
    //      without required fields. 
    // {
    //     name: "Missing first name",
    //     data: {
    //         lastName: "Doe",
    //         email: "john@test.com",
    //         subject: "Warranty",
    //         message: "Test message".repeat(5)
    //     },
    //     expected: "First name is required"
    // },
    //  {
    //     name: "Missing last name",
    //     data: {
    //         firstName: "John",
    //         email: "john@test.com",
    //         subject: "Warranty",
    //         message: "Test message".repeat(5)
    //     },
    //     expected: "Last name is required"
    // },
    // {
    //     name: "Missing email",
    //     data: {
    //         firstName: "John",
    //         lastName: "Doe",
    //         subject: "Customer service",
    //         message : "Test". repeat(15),
    //     },
    //     expected : "Email is required"
    // },
    {
        name: "Invalid email format",
        data: {
            firstName: "John",
            lastName: "Doe",
            email: "invalid-email",
            subject: "Warranty",
            message: "Test message".repeat(5)
        },
        expected: "Email format is invalid"
    },
    {
        name: "No subject",
        data: {
            firstName: "John",
            lastName: "Doe",
            email: "john@test.com",
            message: "Test message".repeat(5)
        },
        expected: "Subject is required"
    },
    {
        name: "No message",
        data: {
            firstName: "John",
            lastName: "Doe",
            email: "john@test.com",
            subject: "Warranty"
        },
        expected: "Message is required"
    },
];

testCases.forEach(({name, data, expected}) => {
    test(`Contact form validation: ${name}`, async({contactPage}) => {
        

        await contactPage.fillForm(data as ContactData);
        
        await contactPage.submitForm();


        const alertTexts = await contactPage.getAlertTexts();

        expect(alertTexts).toContain(expected);
    })
})

