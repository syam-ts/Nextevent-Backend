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
        type: Date,
        require: true,
    },
    dueDate: {
        type: Date,
        require: true,
    },
    items: [ItemSchema],
    total: {
        type: Number,
        require: true,
    },
    notes: {
        type: String,
        require: true,
    },
    paymentGateway: {
        type: String,
        require: true, 
    },
    paid: {
        type: Boolean,
        require: true
    }
});

export const InvoiceModel = model("invoice", invoiceSchema);
