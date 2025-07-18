export interface IClientRepository {
    createClient: ( 
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: number
    ) => Promise<any>;
}
