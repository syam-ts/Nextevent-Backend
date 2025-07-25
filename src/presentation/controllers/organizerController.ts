import { Response, Request } from "express";
import { OrganizationRepositoryDb } from "../../infrastructure/repositories/organizationRepositoryDb";
import { CreateNewOrganizer } from "../../user-cases/organizer/createNewOrganizer";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { LoginOrganizer } from "../../user-cases/organizer/loginOrganizer";
import generateToken from "../../utils/jwt/generateToken";

export class OrganizerController {

    public organizerRepo: OrganizationRepositoryDb;
    public signupUsecase: CreateNewOrganizer;
    public loginUsecase: LoginOrganizer;

    constructor() {
        this.organizerRepo = new OrganizationRepositoryDb()
        this.signupUsecase = new CreateNewOrganizer(this.organizerRepo);
        this.loginUsecase = new LoginOrganizer(this.organizerRepo);
    }

   signupUser= async(req: Request, res: Response):Promise<void> => {
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
    }

     loginUser = async(req: Request, res: Response): Promise<void> => {
        try { 
            const organizer = await this.loginUsecase.execute(req.body);
            console.log('RESULT: ', organizer)
              const { accessToken, refreshToken } = generateToken(organizer._id);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(HttpStatusCode.OK).json({
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
    }
}
