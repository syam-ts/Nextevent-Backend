export interface IClientRepository {
    createClient: ( 
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
}
