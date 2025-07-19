import { Router } from "express";
import { UserController } from "../../controllers/userController";
import verifyToken from "../../middlewares/auth";

const userRouter = Router();
const userController = new UserController();

const {
    signupUser,
    loginUser,
    getUserProfile,
    updateUser,
    getMyClients,
    getSingleClient,
} = userController;

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", verifyToken, getUserProfile);
userRouter.get("/my-clients", verifyToken, getMyClients);
userRouter.get("/client/:clientId", verifyToken, getSingleClient);
userRouter.put("/update", verifyToken, updateUser);

export default userRouter;
