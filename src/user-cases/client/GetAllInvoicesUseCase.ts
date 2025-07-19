import { IClientRepository } from "../../domain/interfaces/IClientRepository";

export class GetAllInvoices {
    constructor(private clientRepository: IClientRepository) { }

    execute(clientId: string) {
        return this.clientRepository.getAllInvoices(clientId);
    }
}
