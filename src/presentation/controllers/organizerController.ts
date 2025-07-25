 
import { Response } from "express";
import { HttpStatusCode } from "/helper/constants/statusCodes";

  

export class OrganizerController {
    async signupUser(req: Request, res: Response): Promise<void> {
        try {
            // const result = await signupOrganizerUsecase.execute(req.body);

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: "new user created", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            // const organizer = await loginOrganizerrUsecase.execute(req.body);
            //   const { accessToken, refreshToken } = generateToken(organizer._id);

            // res.cookie("refreshToken", refreshToken, {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: "none",
            // });

            // res.status(HttpStatusCode.OK).json({
            //     message: "Loggedin Successfull",
            //     organizer,
            //     accessToken,
            //     success: true,
            // });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    }
 
}
