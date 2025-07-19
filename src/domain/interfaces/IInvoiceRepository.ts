export interface IInvoiceRepository {
    createInvoice: (
        companyName: string,
        companyId: string,
        invoiceNumber: number,
        invoiceDate: string,
        dueDate: string,
        items: [string],
        notes: string,
        patmentGateway: string, 
    ) => Promise<any>;
}
