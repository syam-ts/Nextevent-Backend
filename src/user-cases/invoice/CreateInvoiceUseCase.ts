import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";

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
    patmentGateway: string;
}

export class CreateInvoice {
    constructor(private invoiceRepository: IInvoiceRepository) { }

    execute(body: IInvoice) {
        //generate invoice number
        const invoiceNumber: number = generateInvoiceNumber();

        const { companyName, companyId, dueDate, items, notes, patmentGateway } =
            body;

        return this.invoiceRepository.createInvoice(
            companyName,
            companyId,
            invoiceNumber,
            dueDate,
            items,
            notes,
            patmentGateway
        );
    }
}
