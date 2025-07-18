import { Request, Response } from "express";
import { CreateUser } from "../../application/user-cases/user/CreatUserUsecase";
import { UserRepositoryDb } from "../../infrastructure/repositories/userRepositoryDb";

const userRepository = new UserRepositoryDb();
const signupUserUsecase = new CreateUser(userRepository);

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
}
