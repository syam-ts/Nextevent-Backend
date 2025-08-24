import { Response, Request } from "express";
import { CreateNewOrganizer } from "../../user-cases/organizer/createNewOrganizer";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { LoginOrganizer } from "../../user-cases/organizer/loginOrganizer";
import generateToken from "../../utils/jwt/generateToken";
import { UpdateOrganizer } from "../../user-cases/organizer/updateOrganizer";
import { OrganizerRepositoryDb } from "../../infrastructure/repositories/organizerRepositoryDb";
import { GetHomeStats } from "../../user-cases/organizer/getHomeStats";

export class OrganizerController {
    
    public organizerRepo: OrganizerRepositoryDb;
    public signupUsecase: CreateNewOrganizer;
    public loginUsecase: LoginOrganizer;
    public updateUsecase: UpdateOrganizer;
    public getHomeStatsUsecase: GetHomeStats;

    constructor() {
        this.organizerRepo = new OrganizerRepositoryDb();
        this.signupUsecase = new CreateNewOrganizer(this.organizerRepo);
        this.loginUsecase = new LoginOrganizer(this.organizerRepo);
        this.updateUsecase = new UpdateOrganizer(this.organizerRepo);
        this.getHomeStatsUsecase = new GetHomeStats(this.organizerRepo)
    }

    signupOrganizer = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.signupUsecase.execute(req.body);

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: "new organization created", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    loginOrganizer = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.loginUsecase.execute(req.body);
            const { accessToken, refreshToken } = generateToken(
                result.organizer._id,
                "organizer"
            ); 
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(HttpStatusCode.CREATED).json({
                message: "Loggedin Successfull",
                organizer: result.organizer,
                notifications: result.notifications,
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

    updateOrganizer = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("organizer id is missing");
            const organizer = await this.updateUsecase.execute(
                req.user._id,
                req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "Organizer updated Successfull",
                organizer,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };
 
    getHomeStats = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("organizer id is missing");
            const result = await this.getHomeStatsUsecase.execute(
                req.user._id, 
            );

            res.status(HttpStatusCode.OK).json({
                message: "Stats loaded Successfull",
                result,
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
