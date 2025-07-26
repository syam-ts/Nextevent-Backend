export interface ITransaction {
    type: "credit" | "debit";
    amount: number;
    fromName: string;
    fromId: string;
    createdAt: Date;
}

export interface IWallet {
    balance: number;
    transactions: ITransaction[];
}
