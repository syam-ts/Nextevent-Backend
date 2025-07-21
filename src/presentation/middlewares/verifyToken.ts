import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { StatusMessage } from "../../helper/constants/statusMessage";

interface DecodedUser {
    userId: string;
}

const access_secret = process.env.accessToken_SECRET as string

const verifyToken = (req: any, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: StatusMessage[HttpStatusCode.UNAUTHORIZED],
        });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            access_secret
        ) as DecodedUser;
        console.log('THE DECODED JWT : ',decoded)

        req.user = decoded;

        return next();
    } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: error,
        });
        return;
    }
};

export { verifyToken };
