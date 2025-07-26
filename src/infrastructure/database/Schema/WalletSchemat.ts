import { Schema } from "mongoose";
import { ITransaction, IWallet } from "../../../domain/entities/Wallet";

const TransactionSchema = new Schema<ITransaction>({
    type: {
        type: String,
        require: true,
        enum: ["credit", "debit"],
    },
    amount: {
        type: Number,
        require: true,
    },
    fromName: {
        type: String,
        require: true,
    },
    fromId: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
});

export const WalletSchema = new Schema<IWallet>({
    balance: {
        type: Number,
        require: false,
    },
    transactions: [TransactionSchema],
});
