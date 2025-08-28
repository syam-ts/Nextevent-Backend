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
        this.router.get('/all', verifyToken, this.eventController.getAllEvents)
        this.router.get('/view/:eventId', this.eventController.viewEvent);
        this.router.get('/latest', verifyToken, this.eventController.getLatestEvents)
    }
}

export default EventRoute;
