import { Router } from "express";
import { AdminController } from "../../controllers/adminController";
import { verifyToken } from "../../middlewares/verifyToken";

class AdminRoute {

  public router: Router;
  private adminController: AdminController;

  constructor() {
    this.router = Router();
    this.adminController = new AdminController();

    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post('/login', verifyToken, this.adminController.loginAdmin);
    this.router.get("/all-organizers", verifyToken, this.adminController.getAllOrganizers);
    this.router.get("/all-guests", verifyToken, this.adminController.getAllGuests);
    this.router.get("/all-events", verifyToken, this.adminController.getAllEvents);
  }
}

export default AdminRoute;
