import { Router } from "express";
import { EventController } from "../../controllers/eventController";
import { verifyToken } from "../../middlewares/verifyToken";

class EventRoute {
    public router: Router;
    private eventController: EventController;

    constructor() {
        this.router = Router();
        this.eventController = new EventController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/new", verifyToken, this.eventController.createEvent);
        this.router.get('/my-events', verifyToken, this.eventController.getMyEvents);
    }
}

export default EventRoute;
