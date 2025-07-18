import jwt from "jsonwebtoken";
require("dotenv").config();

const token_secret = process.env.JWT_SECRET as string;

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, token_secret, {
        expiresIn: "7d",
    });
};
