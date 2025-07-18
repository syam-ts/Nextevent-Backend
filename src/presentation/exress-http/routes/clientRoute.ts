import { Router } from "express";
import { ClientController } from "../../controllers/clientController";
import verifyToken from "../../middlewares/auth";

const clientRouter = Router();

const clientController = new ClientController();
const { createClient } = clientController;

clientRouter.post("/add", verifyToken, createClient);


export default clientRouter;