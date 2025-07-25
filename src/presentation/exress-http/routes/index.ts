import { Router } from "express"; 
import OrganizerRoute from "./organizerRoute"; 
import EventRoute from "./eventRoute";
export const indexRouter = Router();

const organizationRoute = new OrganizerRoute();
const eventRoute = new EventRoute();

indexRouter.use('/organizer', organizationRoute.router); 
indexRouter.use('/event', eventRoute.router);

export default indexRouter;
