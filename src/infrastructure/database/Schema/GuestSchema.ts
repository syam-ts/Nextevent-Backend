import { model, Schema } from "mongoose";
import { IGuest } from "../../../domain/entities/Guest";

export const GuestSchema = new Schema<IGuest>({
    name: {
        type: String,
        require: true,
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