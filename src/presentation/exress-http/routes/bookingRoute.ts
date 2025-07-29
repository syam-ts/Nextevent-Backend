import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken";
import { BookingController } from "../../controllers/bookingController";

class BookingRoute {
    public router: Router;
    private bookingController: BookingController;

    constructor() {
        this.router = Router();
        this.bookingController = new BookingController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/payment", verifyToken, this.bookingController.bookingPayment);
        this.router.post('/confirm', verifyToken, this.bookingController.newBooking)
        this.router.delete(
            "/cancel/:bookingId",
            verifyToken,
            this.bookingController.cancelBooking
        );
    }
}

export default BookingRoute;
