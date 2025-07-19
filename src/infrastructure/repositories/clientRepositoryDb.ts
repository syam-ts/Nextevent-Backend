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

    async getAllInvoices(
        clientId: string,
        filter: string,
        currentPage: number
    ): Promise<any> {
        const PAGE_SIZE = 4;
        const buildQuery = (clientId: string, filter: string) => {
            const query: any = {
                "company._id": clientId,
            };

            if (filter === "paid") {
                query.paid = true;
            } else if (filter === "unpaid") {
                query.paid = false;
            }

            return query;
        };

        const query = buildQuery(clientId, filter);

        let sortCondition = {};
        if (filter === "latest") {
            sortCondition = { invoiceDate: -1 };
        }

        let SKIP = Math.floor((currentPage - 1) * PAGE_SIZE);

        const invoices = await InvoiceModel.find(query)
            .sort(sortCondition)
            .skip(SKIP)
            .limit(PAGE_SIZE)
            .lean<IInvoice[]>();

        const totalCount = await InvoiceModel.countDocuments(query);
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        if (!invoices || invoices.length === 0) {
            throw new Error("No invoices found!");
        }
        return { invoices, totalPages };
    }
}
