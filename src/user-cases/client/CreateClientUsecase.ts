import { IClientRepository } from "../../domain/interfaces/IClientRepository";

interface ICilentBody {
    clientName: string;
    companyName: string;
    currency: string;
    email: string;
    phone: number;
    panNumber: number;
}

export class createClient {
    constructor(private clientRepository: IClientRepository) { }

    execute(body: ICilentBody) {
        const { clientName, companyName, currency, email, phone, panNumber } = body;
        return this.clientRepository.createClient(
            clientName,
            companyName,
            currency,
            email,
            phone,
            panNumber
        );
    }
}
