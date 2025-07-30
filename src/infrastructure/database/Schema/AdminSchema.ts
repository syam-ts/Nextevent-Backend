import { model, Schema } from "mongoose";
import { IAdmin } from "../../../domain/entities/Admin";
import { WalletSchema } from "./WalletSchemat";

export const AdminSchema = new Schema<IAdmin>({
    userName: {
        type: String,
        required: true,
        default: "nexteventAdmin",
    },
    password: {
        type: String,
        required: true,
        default: "admin123",
    },

    isAuthurized: {
        type: Boolean,
        required: true,
        default: true,
    },
    wallet: WalletSchema,

    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

export const AdminModel = model("admin", AdminSchema);
