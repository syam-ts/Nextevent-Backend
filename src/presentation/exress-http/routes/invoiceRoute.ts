import { Router } from "express";
import { InvoiceController } from "../../controllers/invoiceController";
import { verifyToken } from "../../middlewares/verifyToken";

class InvoiceRoute {

    public router: Router;
    private invoiceController: InvoiceController;

    constructor(invoiceController: InvoiceController) {
        this.router = Router();
        this.invoiceController = invoiceController;

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            "/create",
            verifyToken,
            this.invoiceController.createInvoice
        );
        this.router.patch(
            "/paid/:invoiceId",
            verifyToken,
            this.invoiceController.confirmInvoicePayment
        );
        this.router.get(
            "/view/:invoiceId",
            verifyToken,
            this.invoiceController.getInvoice
        );
    }
}


export default InvoiceRoute;