import { IClientRepository } from "../../domain/interfaces/IClientRepository";

interface ICilentBody { 
    companyName: string;
    currency: string;
    email: string;
    phone: number;
    panNumber: string;
}

export class CreateClient {
    constructor(private clientRepository: IClientRepository) { }

    execute(body: ICilentBody, userId: string) {
        const { companyName, currency, email, phone, panNumber } = body;
        return this.clientRepository.createClient( 
            userId,
            companyName,
            currency,
            email,
            phone,
            panNumber
        );
    }
}
