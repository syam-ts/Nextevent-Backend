import { Router } from "express";
import userRouter from "./userRoute";
import clientRouter from "./clientRoute";
import invoiceRouter from "./invoiceRoute";
export const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/client", clientRouter);
indexRouter.use('/invoice', invoiceRouter)
