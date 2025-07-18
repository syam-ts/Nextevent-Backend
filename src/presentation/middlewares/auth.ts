import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
require("dotenv").config();

const token_secret = process.env.JWT_SECRET as string;

const verifyToken = (req: any, res: Response, next: NextFunction): any => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer "))
        return res
            .status(401)
            .json({ message: "Access Denied: Token missing", success: false });

    const token: string = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, token_secret);
        //  console.log("THE DECODED DATA: ", decoded);
        req.user = decoded;
        next();
    } catch (err: any) {
        return res.status(500).json({ message: "Invaid Token" });
    }
};

export default verifyToken;
