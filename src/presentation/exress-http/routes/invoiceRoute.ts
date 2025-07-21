import { Router } from "express";
import { InvoiceController } from "../../controllers/invoiceController";
import verifyToken from "../../middlewares/verifyToken";

const invoiceRouter = Router();
const invoiceController = new InvoiceController();
const { createInvoice, confirmInvoicePayment, getInvoice } = invoiceController;

invoiceRouter.post("/create", verifyToken, createInvoice);
invoiceRouter.patch("/paid/:invoiceId", verifyToken, confirmInvoicePayment);
invoiceRouter.get('/view/:invoiceId', verifyToken, getInvoice);

export default invoiceRouter;
