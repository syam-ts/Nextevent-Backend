import { Router } from "express";
import { InvoiceController } from "../../controllers/invoiceController";
import verifyToken from "../../middlewares/auth";

const invoiceRouter = Router();
const invoiceController = new InvoiceController();
const { createInvoice, confirmInvoicePayment } = invoiceController;

invoiceRouter.post("/create", verifyToken, createInvoice);
invoiceRouter.patch("/paid/:invoiceId", verifyToken, confirmInvoicePayment);

export default invoiceRouter;
