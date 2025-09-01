import { Router } from "express";
import refreshToken from "../../../lib/jwt/refreshToken";
import { verifyToken } from "../../middlewares/verifyToken";
import { AdminController } from "../../controllers/adminController";

class AdminRoute {

  public router: Router;
  private adminController: AdminController;

  constructor() {
    this.router = Router();
    this.adminController = new AdminController();

    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get('/refresh-token', refreshToken);
    this.router.post('/login', this.adminController.loginAdmin);
    this.router.get("/all-organizers", verifyToken, this.adminController.getAllOrganizers);
    this.router.get("/all-guests", verifyToken, this.adminController.getAllGuests);
    this.router.get("/all-events", verifyToken, this.adminController.getAllEvents);
    this.router.patch('/organizer/block/:organizerId', verifyToken, this.adminController.blockOrganizer);
    this.router.patch('/organizer/unblock/:organizerId', verifyToken, this.adminController.unBlockOrganizer);
  }
}

export default AdminRoute;
