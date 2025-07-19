import { Request, Response } from "express";
import { CreateUser } from "../../user-cases/user/CreatUserUsecase";
import { UserRepositoryDb } from "../../infrastructure/repositories/userRepositoryDb";
import { generateToken } from "../../utils/jwt/generateToken";
import { LoginUser } from "../../user-cases/user/loginUserUsecase";
import { UpdateUser } from "../../user-cases/user/UpdateUserUsecase";
import { GetUserProfile } from "../../user-cases/user/GetUserProfileUseCase";

const userRepository = new UserRepositoryDb();
const signupUserUsecase = new CreateUser(userRepository);
const loginUserUsecase = new LoginUser(userRepository);
const getUserProfileUsecase = new GetUserProfile(userRepository);
const updateUserUsecase = new UpdateUser(userRepository);

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
            const result = await loginUserUsecase.execute(req.body);
            const token = generateToken(result);
            res.cookie("token", token);

            res
                .status(200)
                .json({ message: "Loggedin Successfull", token, success: true });
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
}
