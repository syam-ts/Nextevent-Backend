import { Request, Response } from "express";
import { EventRepositorDb } from "../../infrastructure/repositories/eventRepositoryDb";
import { CreateEvent } from "../../user-cases/event/createEvent";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { GetMyEvents } from "../../user-cases/event/getMyEvent";

export class EventController {
    
    public eventRepo: EventRepositorDb;
    public createEventUsecase: CreateEvent;
    public getMyEventsUsecase: GetMyEvents;

    constructor() {

        this.eventRepo = new EventRepositorDb();
        this.createEventUsecase = new CreateEvent(this.eventRepo);
        this.getMyEventsUsecase = new GetMyEvents(this.eventRepo);
    }
    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("organizer id is missing");
            const organizer = await this.createEventUsecase.execute(
                req.user._id,
                req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "New event created",
                organizer,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    getMyEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("organizer id is missing");
            const events = await this.getMyEventsUsecase.execute(req.user._id);

            res.status(HttpStatusCode.CREATED).json({
                message: "events loaded successfully",
                events,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };
}
