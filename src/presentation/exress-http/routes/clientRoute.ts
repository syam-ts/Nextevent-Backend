import { Router } from "express";
import { ClientController } from "../../controllers/clientController"; 
import { verifyToken } from "../../middlewares/verifyToken";

const clientRouter = Router();
const clientController = new ClientController();
const { createClient, updateClient , getAllInvoices} = clientController;

clientRouter.post("/add", verifyToken, createClient);
clientRouter.put("/update/:clientId", verifyToken, updateClient);
clientRouter.get('/all-invoices/:clientId', verifyToken, getAllInvoices);

export default clientRouter;
