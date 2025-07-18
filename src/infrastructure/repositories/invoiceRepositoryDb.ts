import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";
import { InvoiceModel } from "../database/Schema/invoiceSchema";

export class InvoiceRepositoryDb implements IInvoiceRepository {
    async createInvoice(
        companyName: string,
        invoiceId: string,
        invoiceDate: string,
        dueDate: string,
        items: [string],
        notes: string,
        patmentGateway: string
    ) {
        const newInvoice = await new InvoiceModel({
            companyName,
            invoiceId,
            invoiceDate,
            dueDate,
            items,
            notes,
            patmentGateway,
        }).save();

        if (!newInvoice) throw new Error("Ivoice creation Failed!");
        return newInvoice;
    }
}
