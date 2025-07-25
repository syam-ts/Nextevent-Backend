import { Router } from "express";
import UserRoute from "./organizerRoute"; 
import OrganizerRoute from "./organizerRoute";
export const indexRouter = Router();

const organizationRoute = new OrganizerRoute();

indexRouter.use('/organizer', organizationRoute.router); 
 

export default indexRouter;
