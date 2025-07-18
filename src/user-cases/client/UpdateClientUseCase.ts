import { IClientRepository } from "../../domain/interfaces/IClientRepository";

interface ICilentBody {
    companyName: string;
    currency: string;
    phone: number;
    panNumber: string;
}

export class UpdateClient {
    constructor(private clientRepository: IClientRepository) { }

    execute(body: ICilentBody, clientId: string) {
        const { companyName, currency, phone, panNumber } = body;
        return this.clientRepository.updateClient(
            clientId,
            companyName,
            currency,
            phone,
            panNumber
        );
    }
}
