import mongoose, { model, Schema } from "mongoose";

const ItemSchema = {
    details: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    rate: {
        type: Number,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
};

const ICompany = {
    _id: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
};

const invoiceSchema = new Schema({
    company: ICompany,
    invoiceNumber: {
        type: Number,
        require: true,
    },
    invoiceDate: {
        type: String,
        require: true,
    },
    items: [ItemSchema],
    notes: {
        type: String,
        require: true,
    },
    patmentGateway: {
        type: Date,
        require: true,
        default: Date.now(),
    },
});

export const InvoiceModel = model("invoice", invoiceSchema);
