import { model, Schema } from "mongoose";

const clientSchema = new Schema({
    clientName: {
        type: String,
        require: true,
    },
    companyName: {
        type: String,
        require: true,
    },
    currency: {
        type: String,
        require: true,
        default: "INR",
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    panNumber: {
        type: Number,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now(),
    },
});

export const ClientModel = model("client", clientSchema);
