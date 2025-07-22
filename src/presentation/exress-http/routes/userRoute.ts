import { Router } from "express";
import { UserController } from "../../controllers/userController";
import { verifyToken } from "../../middlewares/verifyToken";
import refreshToken from "../../../utils/jwt/refreshToken";

class UserRoute {
    public router: Router;
    private userController: UserController;

    constructor(userController: UserController) {
        this.router = Router();
        this.userController = userController;

        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/refresh-token", refreshToken);
        this.router.get("/profile", verifyToken, this.userController.getUserProfile);
        this.router.get("/my-clients", verifyToken, this.userController.getMyClients); 
        this.router.post("/signup", this.userController.signupUser);
        this.router.post("/login", this.userController.loginUser);
        this.router.put("/update", verifyToken, this.userController.updateUser);
    }
}

export default UserRoute;
