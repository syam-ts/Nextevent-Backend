import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";

export class GetInvoice {
    constructor(private invoiceRepository: IInvoiceRepository) { }

    execute(invoiceId: string) {
        return this.invoiceRepository.getInvoice(invoiceId);
    }
}
