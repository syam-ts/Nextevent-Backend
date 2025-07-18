import { IClientRepository } from "../../domain/interfaces/IClientRepository";

interface ICilentBody { 
    companyName: string;
    currency: string;
    email: string;
    phone: number;
    panNumber: string;
}

export class createClient {
    constructor(private clientRepository: IClientRepository) { }

    execute(body: ICilentBody) {
        const { companyName, currency, email, phone, panNumber } = body;
        return this.clientRepository.createClient( 
            companyName,
            currency,
            email,
            phone,
            panNumber
        );
    }
}
