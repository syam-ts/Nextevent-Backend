import { Request, Response } from "express";
import { CreateUser } from "../../user-cases/user/CreatUserUsecase";
import { UserRepositoryDb } from "../../infrastructure/repositories/userRepositoryDb";
import { generateToken } from "../../utils/jwt/generateToken";
import { LoginUser } from "../../user-cases/user/loginUserUsecase";
import { UpdateUser } from "../../user-cases/user/UpdateUserUsecase";
import { GetUserProfile } from "../../user-cases/user/GetUserProfileUseCase";
import { GetMyClients } from "../../user-cases/user/GetMyClientsUseCase";
import { GetSingleClient } from "../../user-cases/user/GetSingleClientUseCase";

const userRepository = new UserRepositoryDb();
const signupUserUsecase = new CreateUser(userRepository);
const loginUserUsecase = new LoginUser(userRepository);
const getUserProfileUsecase = new GetUserProfile(userRepository);
const updateUserUsecase = new UpdateUser(userRepository);
const getMyClientUsecase = new GetMyClients(userRepository);
const getSingleClientUsecase = new GetSingleClient(userRepository);

export class UserController {
    async signupUser(req: Request, res: Response): Promise<void> {
        try {
            const result = await signupUserUsecase.execute(req.body);

            res.status(201).json({ message: "new user created", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await loginUserUsecase.execute(req.body);
            const token = generateToken(user._id.toString());
            res.cookie("token", token);

            res
                .status(200)
                .json({ message: "Loggedin Successfull",user, token, success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }

    async getUserProfile(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.user;
            const user = await getUserProfileUsecase.execute(userId);

            res
                .status(200)
                .json({ message: "User load successfully", user, success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }

    async updateUser(req: any, res: Response): Promise<void> {
        try {
            const result = await updateUserUsecase.execute(req.body, req.user.userId);

            res.status(201).json({ message: "User updated ", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }

    async getMyClients(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.user;
            const clients = await getMyClientUsecase.execute(userId);

            res
                .status(200)
                .json({ message: "Clients loaded", clients, success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }

    async getSingleClient(req: any, res: Response): Promise<void> {
        try {
            const { clientId } = req.params;
            const client = await getSingleClientUsecase.execute(clientId);

            res
                .status(200)
                .json({ message: "Clients loaded", client, success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }
}
