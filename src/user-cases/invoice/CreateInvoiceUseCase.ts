import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";

interface IInvoice {
    companyName: string;
    companyId: string;
    invoiceDate: string;
    dueDate: string;
    items: [string];
    notes: string;
    patmentGateway: string;
}

export class CreateInvoice {
    constructor(private invoiceRepository: IInvoiceRepository) { }

    execute(body: IInvoice) {
        //generate invoice number
        const invoiceNumber: number = generateInvoiceNumber();

        const {
            companyName,
            companyId,
            invoiceDate,
            dueDate,
            items,
            notes,
            patmentGateway,
        } = body;

        return this.invoiceRepository.createInvoice(
            companyName,
            companyId,
            invoiceNumber,
            invoiceDate,
            dueDate,
            items,
            notes,
            patmentGateway
        );
    }
}
