import { IClientRepository } from "../../domain/interfaces/IClientRepository";

export class GetAllInvoices {
    constructor(private clientRepository: IClientRepository) { }

    execute(clientId: string,filter: string, currentPage: number) {
        return this.clientRepository.getAllInvoices(clientId, filter, currentPage);
    }
}
