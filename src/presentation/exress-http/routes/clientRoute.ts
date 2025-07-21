import { Router } from "express";
import { ClientController } from "../../controllers/clientController";
import { verifyToken } from "../../middlewares/verifyToken";

class ClientRoute {
    public router: Router;
    private clientController: ClientController;

    constructor(clientController: ClientController) {
        this.router = Router();
        this.clientController = clientController;

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/add", verifyToken, this.clientController.createClient);
        this.router.put(
            "/update/:clientId",
            verifyToken,
            this.clientController.updateClient
        );
        this.router.get(
            "/all-invoices/:clientId",
            verifyToken,
            this.clientController.getAllInvoices
        );
    }
}

export default ClientRoute;
