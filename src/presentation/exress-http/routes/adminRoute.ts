import { Router } from "express";
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
    this.router.get("/all-organizers", this.adminController.getAllOrganizers);
    this.router.get("/all-guests", this.adminController.getAllGuests);
    this.router.get("/all-events", this.adminController.getAllEvents);
  }
}

export default AdminRoute;
