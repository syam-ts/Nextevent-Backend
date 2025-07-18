export interface User {
    _id: string;
    fullName: string; //getting as first and lastname from api then join
    email: string;
    mobile: number;
    password: string;
    gender: string;
    country: string;
    state: string;
    language: string;
    //client: Clients
    //totalInvoices: number
}
