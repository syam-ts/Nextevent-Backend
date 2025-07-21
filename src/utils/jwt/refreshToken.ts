import jwt, { JwtPayload } from "jsonwebtoken"; 
import { Request, Response } from "express";
import generateToken from "./generateToken";

interface User {
    userId: string 
};

const refresh_secret =  process.env.REFRESH_TOKEN_SECRET as string;

const refreshToken = (req: Request, res: Response): void => {
    const refreshToken = req.cookies.refresh_Token;

    if (!refreshToken) {
        res.status(401).json({ message: "No refresh token" });
        return;
    }

    jwt.verify(
        refreshToken,
        refresh_secret,
        (err: jwt.VerifyErrors | null, decoded: any | JwtPayload | undefined) => {
            if (err || !decoded) {
                res.status(403).json({ message: "Invalid or expired refresh token" });
                return;
            }

            console.log('REFRESH DECODED JWT: ',decoded)

            const { accessToken } = generateToken(decoded.userId);
            res.json({ accessToken });
        }
    );
};

export default refreshToken;