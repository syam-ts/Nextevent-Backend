import { IClientRepository } from "../../domain/interfaces/IClientRepository";
import { ClientModel } from "../database/Schema/clientSchema";

export class ClientRepositoryDb implements IClientRepository {
    async createClient(
        userId: string,
        companyName: string,
        currency: string,
        email: string,
        phone: number,
        panNumber: string
    ): Promise<any> {
        const newClient = await new ClientModel({
            userId,
            companyName,
            currency,
            email,
            phone,
            panNumber,
        }).save();

        if (!newClient) throw new Error("Client creation failed");

        return;
    }

    async updateClient(
        clientId: string,
        companyName: string,
        currency: string,
        phone: number,
        panNumber: string
    ): Promise<any> {
        const updateClient = await ClientModel.findByIdAndUpdate(clientId, {
            companyName,
            currency,
            phone,
            panNumber,
        });

        if (!updateClient) throw new Error("Client updation failed!");
        return;
    }
}
