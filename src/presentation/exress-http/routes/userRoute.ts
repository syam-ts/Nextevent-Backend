import { Router } from "express";
import { UserController } from "../../controllers/userController";

const userRouter = Router();

const userController = new UserController();

const { signupUser } = userController;

userRouter.post("/signup", signupUser);

export default userRouter;
