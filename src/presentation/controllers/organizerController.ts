import { Response, Request } from "express";
import { OrganizationRepositoryDb } from "../../infrastructure/repositories/organizationRepositoryDb";
import { CreateNewOrganizer } from "../../user-cases/organizer/createNewOrganizer";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { LoginOrganizer } from "../../user-cases/organizer/loginOrganizer";
import generateToken from "../../utils/jwt/generateToken";
import { UpdateOrganizer } from "../../user-cases/organizer/updateOrganizer";

export class OrganizerController {
    public organizerRepo: OrganizationRepositoryDb;
    public signupUsecase: CreateNewOrganizer;
    public loginUsecase: LoginOrganizer;
    public updateUsecase: UpdateOrganizer;

    constructor() {
        this.organizerRepo = new OrganizationRepositoryDb();
        this.signupUsecase = new CreateNewOrganizer(this.organizerRepo);
        this.loginUsecase = new LoginOrganizer(this.organizerRepo);
        this.updateUsecase = new UpdateOrganizer(this.organizerRepo);
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
            const organizer = await this.loginUsecase.execute(req.body);
            const { accessToken, refreshToken } = generateToken(
                organizer._id,
                "organizer"
            );
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(HttpStatusCode.CREATED).json({
                message: "Loggedin Successfull",
                organizer,
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
            console.log('USER: ', req.user)
            const organizer = await this.updateUsecase.execute(req.user._id,req.body);

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
}
