import { Router } from "express";
import { UserController } from "../../controllers/userController";
import verifyToken from "../../middlewares/auth";

const userRouter = Router();

const userController = new UserController();

const { signupUser, loginUser, updateUser } = userController;

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.get('/home', verifyToken, (req: any, res: any) => {
    const user =req.user;
    res.json({message: 'done', user})
})
userRouter.put('/update', verifyToken, updateUser);

export default userRouter;
