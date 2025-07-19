import { IInvoiceRepository } from "../../domain/interfaces/IInvoiceRepository";

export class ConfirmInvoicePayment {
    constructor(private invoiceRepository: IInvoiceRepository) { }

    execute(invoiceId: string) {
        return this.invoiceRepository.confirmInvoicePayment(invoiceId);
    }
}
