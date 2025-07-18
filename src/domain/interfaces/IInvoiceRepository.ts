export interface IInvoiceRepository {
    createInvoice: (
        companyName: string,
        invoiceId: string,
        invoiceDate: string,
        dueDate: string,
        items: [string],
        notes: string,
        patmentGateway: string, 
    ) => Promise<any>;
}
