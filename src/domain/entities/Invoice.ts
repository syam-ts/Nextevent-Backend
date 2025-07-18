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

export interface IInvoice {
    companyName: string;
    invoiceId: string;
    invoiceDate: string;
    dueDate: string;
    items: [IInvoiceItems];
    notes: string;
    patmentGateway: string;
}
