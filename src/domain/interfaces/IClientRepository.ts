import { IInvoice } from "../entities/Invoice";

export interface IClientRepository {
    createClient: ( 
        userId: string,
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: string
    ) => Promise<any>,

    updateClient: ( 
        clientId: string,
        companyName: string,
        currency: string, 
        phone: number,
        panNumber: string
    ) => Promise<any>;

    getAllInvoices: (clientId: string, filter: string, currentPage: number) => Promise<any>
}
