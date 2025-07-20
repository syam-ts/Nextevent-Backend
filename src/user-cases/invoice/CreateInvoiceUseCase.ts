import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";
import { generateInvoiceNumber } from "../../utils/invoice/invoiceNumber";

interface IInvoice {
    companyName: string;
    companyId: string;
    dueDate: string;
    items: [
        {
            details: string;
            quantity: number;
            rate: number;
            total: number;
        }
    ];
    notes: string;
    paymentGateway: string;
}

export class CreateInvoice {
    constructor(private invoiceRepository: IInvoiceRepository) { }

    execute(body: IInvoice) {
        //generate invoice number
        const invoiceNumber: number = generateInvoiceNumber();

        const { companyName, companyId, dueDate, items, notes, paymentGateway } =
            body;

        return this.invoiceRepository.createInvoice(
            companyName,
            companyId,
            invoiceNumber,
            dueDate,
            items,
            notes,
            paymentGateway
        );
    }
}
