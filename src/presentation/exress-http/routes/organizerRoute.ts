import { Router } from "express"; 
import { verifyToken } from "../../middlewares/verifyToken";
import refreshToken from "../../../utils/jwt/refreshToken";  
import { OrganizerController } from "../../controllers/organizerController";

class OrganizerRoute {
    public router: Router;
    private organizerController: OrganizerController;

    constructor(userController: UserController) {
        this.router = Router();
        this.organizerController = this.organizerController();

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/refresh-token", refreshToken);
        this.router.get("/profile", verifyToken, this.organizerController.getUserProfile);
        this.router.get("/my-clients", verifyToken, this.organizerController.getMyClients); 
        this.router.post("/signup", this.organizerController.signupUser);
        this.router.post("/login", this.organizerController.loginUser);
        this.router.put("/update", verifyToken, this.organizerController.updateUser);
    }
}

export default OrganizerRoute;
