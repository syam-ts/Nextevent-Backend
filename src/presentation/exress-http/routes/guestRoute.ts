import { Router } from "express";
import { EventController } from "../../controllers/eventController";
import { verifyToken } from "../../middlewares/verifyToken";
import { GuestController } from "../../controllers/guestController";

class GuestRoute {
    public router: Router;
    private guestController: GuestController;

    constructor() {
        this.router = Router();
        this.guestController = new GuestController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/signup", this.guestController.signupGuest);
        this.router.post("/login", this.guestController.loginGuest);
        this.router.put("/update", verifyToken, this.guestController.updateGuest);
    }
}

export default GuestRoute;
