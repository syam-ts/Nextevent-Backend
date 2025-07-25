import { Router } from "express"; 
import { verifyToken } from "../../middlewares/verifyToken";
import refreshToken from "../../../utils/jwt/refreshToken";  
import { OrganizerController } from "../../controllers/organizerController";

class OrganizerRoute {
    public router: Router;
    private organizerController: OrganizerController;

    constructor()  {
        this.router = Router();
        this.organizerController = new OrganizerController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // this.router.get("/refresh-token", refreshToken);
        this.router.post('/signup', this.organizerController.signupOrganizer);
        this.router.post('/login', this.organizerController.loginOrganizer);
        this.router.put('/update',verifyToken, this.organizerController.updateOrganizer);

    }
}

export default OrganizerRoute;
