import { Schema } from "mongoose";
import { ITransaction, IWallet } from "../../../domain/entities/Wallet";

const TransactionSchema = new Schema<ITransaction>({
    type: {
        type: String,
        required: false,
        enum: ["credit", "debit"],
    },
    amount: {
        type: Number,
        required: false,
    },
    fromName: {
        type: String,
        required: false,
    },
    fromId: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
    },
});

export const WalletSchema = new Schema<IWallet>({
    balance: {
        type: Number,
        require: true,
        default: 0,
    },
    transactions: [TransactionSchema],
});
