import { faker, Faker } from "@faker-js/faker";
import { UserData } from "../types/userData";

export function generateUserData():UserData {

    const randomUserData = { 
        firstname : faker.person.firstName(),
        lastname : faker.person.lastName(),
        dateOfBirth : faker.date.birthdate().toISOString().split('T')[0],
        country: faker.location.countryCode('alpha-2'),
        postalCode: faker.location.zipCode('####'),
        houseNumber: faker.location.buildingNumber(),
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        phoneNumber : faker.string.numeric({length: {min: 7, max: 11}}),
        email : faker.internet.email(),
        password: faker.internet.password({length : 8, pattern : /[a-zA-Z0-9@#$]/, prefix: 'Aa1@'})
    }

    return randomUserData;
}