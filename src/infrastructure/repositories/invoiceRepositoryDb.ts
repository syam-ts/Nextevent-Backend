import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";
import { InvoiceModel } from "../database/Schema/invoiceSchema";

export class InvoiceRepositoryDb implements IInvoiceRepository {
    async createInvoice(
        companyName: string,
        companyId: string,
        invoiceNumber: number,
        dueDate: string,
        items: [{ details: string; quantity: number; rate: number; total: number }],
        notes: string,
        patmentGateway: string
    ) {
        const sumTotal = generateInvoiceTotal(items);

        const newInvoice = await new InvoiceModel({
            company: {
                _id: companyId,
                name: companyName,
            },
            invoiceNumber,
            invoiceDate: Date.now(),
            dueDate,
            items,
            total: sumTotal,
            notes,
            patmentGateway,
            paid: false,
        }).save();

        if (!newInvoice) throw new Error("Ivoice creation Failed!");
        return newInvoice;
    }
}
