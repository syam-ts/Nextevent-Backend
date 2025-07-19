import { IInvoice } from "../../domain/entities/Invoice";
import { IClientRepository } from "../../domain/interfaces/IClientRepository";
import { ClientModel } from "../database/Schema/clientSchema";
import { InvoiceModel } from "../database/Schema/invoiceSchema";

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

    async getAllInvoices(clientId: string): Promise<IInvoice[]> {
        const invoices = await InvoiceModel.find({ "company._id": clientId }).lean<
            IInvoice[]
        >();

        if (!invoices) throw new Error("no invoices found!");
        return invoices;
    }
}
