export interface IInvoiceRepository {
    createInvoice: (
        companyName: string,
        companyId: string,
        invoiceNumber: number,
        dueDate: string,
        items: [
            {
                details: string;
                quantity: number;
                rate: number;
                total: number;
            }
        ],
        notes: string,
        patmentGateway: string
    ) => Promise<any>;
}
