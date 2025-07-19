import { Router } from "express";
import { InvoiceController } from "../../controllers/invoiceController";
import verifyToken from "../../middlewares/auth";

const invoiceRouter = Router();

const invoiceController = new InvoiceController();
const { createInvoice } = invoiceController;

invoiceRouter.post("/create", verifyToken, createInvoice);

export default invoiceRouter;
