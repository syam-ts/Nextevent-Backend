import { Router } from "express";
import { ClientController } from "../../controllers/clientController";
import verifyToken from "../../middlewares/auth";

const clientRouter = Router();

const clientController = new ClientController();
const { createClient, updateClient } = clientController;

clientRouter.post("/add", verifyToken, createClient);
clientRouter.put("/update/:clientId", verifyToken, updateClient);

export default clientRouter;
