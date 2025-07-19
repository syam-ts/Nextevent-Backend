import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";
import { generateInvoiceTotal } from "../../utils/invoice/invoiceTotal";
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
    ): Promise<void> {
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
        return;
    }

    async confirmInvoicePayment(invoiceId: string): Promise<void> {
        const updateInvoiceAsPaid = await InvoiceModel.findByIdAndUpdate(
            invoiceId,
            {
                $set: { paid: true },
            }
        );

        if (!updateInvoiceAsPaid) throw new Error("Updating invoice payment failed");
        return;
    }
}
