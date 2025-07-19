interface IInvoiceItems {
    details: string;
    quantity: number;
    rate: number;
    total: number;
}

// interface IPaymentGateway {
//     cards: ["VISA", "MASTER CARD", "RUPAY", "AMEX"];
//     netBanking: [
//         "SBI",
//         "HDFC",
//         "FEDERAL BANK",
//         "INDUSIND ",
//         "KODAK",
//         "IDFC",
//         "AXIS"
//     ];
//     upi: ["google pay", "paytm", "phone pay", "cred"];
// }

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
    patmentGateway: string;
    paid: boolean;
}
