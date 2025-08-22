import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { StatusMessage } from "../../helper/constants/statusMessage";
require("dotenv").config();

type DecodedUser = {
    _id: string | undefined;
    role: "organizer" | "guest";
}

const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];  
    
    const token = authHeader?.split(" ")[1];  
    
    if (!token) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: StatusMessage[HttpStatusCode.UNAUTHORIZED],
        });
        return;
    }
    
    try {
        const decoded = jwt.verify(token, access_secret) as DecodedUser;
        // console.log("THE DECODED JWT : ", decoded);
        
        req.user = { _id: decoded._id, role: decoded.role };

        return next();
    } catch (error) {
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: error,
        });
        return;
    }
};

export { verifyToken };
