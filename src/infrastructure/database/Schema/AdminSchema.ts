import { model, Schema } from "mongoose"; 
import { WalletSchema } from "./WalletSchemat";
import { IAdmin } from "../../../domain/entities/Admin";

export const AdminSchema = new Schema<IAdmin>({
    userName: {
        type: String,
        required: true,
        default: "nexteventAdmin",
    },
    password: {
        type: String,
        required: true,
        default: "admin1234",
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
