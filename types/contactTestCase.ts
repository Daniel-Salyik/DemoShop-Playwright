import { ContactData } from '../types/contactData';

export type ContactTestCase = {
    name: string;
    data: Partial<ContactData>;
    expected: string;
};