import { Router } from "express";
import UserRoute from "./userRoute";
import { UserController } from "../../controllers/userController";
import { ClientController } from "../../controllers/clientController";
import { InvoiceController } from "../../controllers/invoiceController";
import ClientRoute from "./clientRoute";
import InvoiceRoute from "./invoiceRoute";
export const indexRouter = Router();

const userController = new UserController();
const clientController = new ClientController();
const invoiceController = new InvoiceController();

const userRouter = new UserRoute(userController);
const clientRouter = new ClientRoute(clientController);
const invoiceRouter = new InvoiceRoute(invoiceController);

indexRouter.use("/user", userRouter.router);
indexRouter.use("/client", clientRouter.router);
indexRouter.use("/invoice", invoiceRouter.router);

export default indexRouter;
