import { IClientRepository } from "../../domain/interfaces/IClientRepository";
import { ClientModel } from "../database/Schema/clientSchema";

export class ClientRepositoryDb implements IClientRepository {
    async createClient(
        clientName: string,
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: number
    ): Promise<any> {
        const newClient = await new ClientModel({
            clientName,
            companyName,
            currency,
            email,
            phone,
            panNumber,
        }).save();

        if (!newClient) throw new Error("Client creation failed");

        return;
    }
}
