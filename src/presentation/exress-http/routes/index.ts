import { Router } from "express";
import userRouter from "./userRoute";

export const indexRouter = Router();

indexRouter.use("/user", userRouter);
