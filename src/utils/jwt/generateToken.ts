import jwt from "jsonwebtoken";
require("dotenv").config();

const access_Token_Secret = process.env.ACCESS_TOKEN as string;
const refresh_Token_Secret = process.env.REFRESH_TOKEN as string;

export const generateToken = (userId: string) => {
    const access_Token = jwt.sign({ userId }, access_Token_Secret, {
        expiresIn: "1m",
    });

    const refresh_Token = jwt.sign({ userId }, refresh_Token_Secret, {
        expiresIn: "7d",
    });

    return { access_Token, refresh_Token };
};
