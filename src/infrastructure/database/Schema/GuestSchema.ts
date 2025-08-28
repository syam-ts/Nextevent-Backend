import { model, Schema } from "mongoose";
import { IGuest } from "../../../domain/entities/Guest";
import { WalletSchema } from "./WalletSchemat";

export const GuestSchema = new Schema<IGuest>({
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
        default: 'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/vynd1djnvaxvahibbbus'
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    numberOfEventsAttended: {
        type: Number,
        required: true,
        default: 0,
    },
    wallet: WalletSchema,
    createdAt: {
        type: Date,
        required: true,
    },
});


export const GuestModel = model('guest', GuestSchema);