import { Request, Response } from "express";
import { GuestRepositoryDb } from "../../infrastructure/repositories/guestRepositoryDb";
import { CreateGuest } from "../../user-cases/guest/createGuest";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import generateToken from "../../utils/jwt/generateToken";


export class GuestController {
     public guestRepo: GuestRepositoryDb;
    public createGuestUsecase: CreateGuest;
    constructor() {
        this.guestRepo = new GuestRepositoryDb()
        this.createGuestUsecase = new CreateGuest(this.guestRepo);
    }
  signupGuest = async (req: Request, res: Response): Promise<void> => {
        try {  
            const result = await this.createGuestUsecase.execute( 
                req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "new guest created", 
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    }

    //   loginGuest = async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         const organizer = await this.loginUsecase.execute(req.body);
    //         const { accessToken, refreshToken } = generateToken(
    //             organizer._id,
    //             "organizer"
    //         );
    //         res.cookie("refreshToken", refreshToken, {
    //             httpOnly: true,
    //             secure: true,
    //             sameSite: "none",
    //         });
    //         res.status(HttpStatusCode.CREATED).json({
    //             message: "Loggedin Successfull",
    //             organizer,
    //             accessToken,
    //             success: true,
    //         });
    //     } catch (error: unknown) {
    //         const err = error as { message: string };
    //         res
    //             .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    //             .json({ message: err.message, success: false });
    //     }
    // };

}