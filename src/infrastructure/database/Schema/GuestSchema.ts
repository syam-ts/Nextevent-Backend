import { model, Schema } from "mongoose";
import { IGuest } from "../../../domain/entities/Guest";

export const GuestSchema = new Schema<IGuest>({
    name: {
        type: String,
        require: true,
    },
    profilePicture: {
        type: String,
        require: true,
        default: 'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/vynd1djnvaxvahibbbus'
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    numberOfEventsAttended: {
        type: Number,
        require: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        require: true,
    },
});


export const GuestModel = model('guest', GuestSchema);