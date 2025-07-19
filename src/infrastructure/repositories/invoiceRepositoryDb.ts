import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";
import { InvoiceModel } from "../database/Schema/invoiceSchema";

export class InvoiceRepositoryDb implements IInvoiceRepository {
    async createInvoice(
        companyName: string,
        companyId: string,
        invoiceNumber: number,
        invoiceDate: string,
        dueDate: string,
        items: [string],
        notes: string,
        patmentGateway: string
    ) {
        const newInvoice = await new InvoiceModel({
            company: {
                _id: companyId,
                name: companyName,
            },
            invoiceNumber,
            invoiceDate,
            dueDate,
            items,
            notes,
            patmentGateway,
            paid: false,
        }).save();

        if (!newInvoice) throw new Error("Ivoice creation Failed!");
        return newInvoice;
    }
}
