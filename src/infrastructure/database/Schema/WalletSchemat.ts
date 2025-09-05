import { Schema } from "mongoose";
import { ITransaction, IWallet } from "../../../domain/entities/Wallet";

const TransactionSchema = new Schema<ITransaction>({
    type: {
        type: String,
        required: true,
        enum: ["credit", "debit"],
    },
    amount: {
        type: Number,
        required: true,
    },
    fromName: {
        type: String,
        required: true,
    },
    fromId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

export const WalletSchema = new Schema<IWallet>({
    balance: {
        type: Number,
        require: false,
    },
    transactions: [TransactionSchema],
});
