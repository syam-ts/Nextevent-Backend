import { Router } from "express";
import userRouter from "./userRoute";
import clientRouter from "./clientRoute";

export const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/client", clientRouter);
