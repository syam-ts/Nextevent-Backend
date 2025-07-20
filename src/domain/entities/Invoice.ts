interface IInvoiceItems {
    details: string;
    quantity: number;
    rate: number;
    total: number;
}

interface ICompany {
    _id: string;
    name: string;
}

export interface IInvoice {
    company: ICompany;
    invoiceNumber: number;
    invoiceDate: string;
    dueDate: string;
    items: [IInvoiceItems];
    total: number;
    notes: string;
    paymentGateway: string;
    paid: boolean;
}
