import { model, Schema } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        require: false,
    },
    email: {
        type: String,
        require: false,
    },
    mobile: {
        type: Number,
        require: false,
    },
    password: {
        type: String,
        require: false,
    },
    gender: {
        type: String,
        require: false,
        enum: ["male", "female"],
    },
    country: {
        type: String,
        require: false,
    },
    state: {
        type: String,
        require: false,
    },
    language: {
        type: String,
        require: false,
    },
});

export const UserModel = model("user", userSchema);
