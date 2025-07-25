import { Request, Response } from "express";
import { GuestRepositoryDb } from "../../infrastructure/repositories/guestRepositoryDb";
import { CreateGuest } from "../../user-cases/guest/createGuest";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import generateToken from "../../utils/jwt/generateToken";
import { LoginGuest } from "../../user-cases/guest/loginGuest";
import { UpdateGuest } from "../../user-cases/guest/updateGuest";

export class GuestController {
    public guestRepo: GuestRepositoryDb;
    public createGuestUsecase: CreateGuest;
    public loginGuestUsecase: LoginGuest;
    private updateGuestUsecase: UpdateGuest;

    constructor() {
        this.guestRepo = new GuestRepositoryDb();
        this.createGuestUsecase = new CreateGuest(this.guestRepo);
        this.loginGuestUsecase = new LoginGuest(this.guestRepo);
        this.updateGuestUsecase = new UpdateGuest(this.guestRepo);

    }
    signupGuest = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.createGuestUsecase.execute(req.body);

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
    };

    loginGuest = async (req: Request, res: Response): Promise<void> => {
        try {
            const guest = await this.loginGuestUsecase.execute(req.body);
            const { accessToken, refreshToken } = generateToken(guest._id, "guest");
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(HttpStatusCode.OK).json({
                message: "Loggedin Successfull",
                guest,
                accessToken,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    updateGuest = async (req: Request, res: Response): Promise<void> => {
        try {
               if (!req.user?._id) throw new Error("organizer id is missing");
            const guest = await this.updateGuestUsecase.execute(req.user._id,req.body); 
             
            res.status(HttpStatusCode.CREATED).json({
                message: "Guest updated Successfully",
                guest, 
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };
}
