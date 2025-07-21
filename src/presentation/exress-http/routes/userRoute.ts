import { Router } from "express";
import { UserController } from "../../controllers/userController"; 
import { verifyToken } from "../../middlewares/verifyToken";
import refreshToken from "../../../utils/jwt/refreshToken";

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

userRouter.get('/refresh-token', refreshToken);
userRouter.get("/profile", verifyToken, getUserProfile);
userRouter.get("/my-clients", verifyToken, getMyClients);
userRouter.get("/client/:clientId", verifyToken, getSingleClient);
userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", verifyToken, updateUser);

export default userRouter;
