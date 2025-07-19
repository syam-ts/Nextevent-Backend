import { Router } from "express";
import { UserController } from "../../controllers/userController";
import verifyToken from "../../middlewares/auth";

const userRouter = Router();

const userController = new UserController();

const { signupUser, loginUser,getUserProfile, updateUser } = userController;

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.get('/profile', verifyToken, getUserProfile);
userRouter.put('/update', verifyToken, updateUser);

export default userRouter;
