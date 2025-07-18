export interface IClientRepository {
    createClient: (
        clientName: string,
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: number
    ) => Promise<any>;
}
