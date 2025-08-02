import { Request, Response } from "express";
import { EventRepositorDb } from "../../infrastructure/repositories/eventRepositoryDb";
import { CreateEvent } from "../../user-cases/event/createEvent";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { GetMyEvents } from "../../user-cases/event/getMyEvent";
import { GetAllEvents } from "../../user-cases/event/getAllEvents";
import { ViewEvent } from "../../user-cases/event/viewEvent";
import { LatestEvent } from "../../user-cases/event/latestEvent";

export class EventController {
    public eventRepo: EventRepositorDb;
    public createEventUsecase: CreateEvent;
    public getMyEventsUsecase: GetMyEvents;
    public getAllEventsUsecase: GetAllEvents;
    public viewEventUsecase: ViewEvent;
    public getLatestEventsUsecase: LatestEvent;

    constructor() {
        this.eventRepo = new EventRepositorDb();
        this.createEventUsecase = new CreateEvent(this.eventRepo);
        this.getMyEventsUsecase = new GetMyEvents(this.eventRepo);
        this.getAllEventsUsecase = new GetAllEvents(this.eventRepo);
        this.viewEventUsecase = new ViewEvent(this.eventRepo);
        this.getLatestEventsUsecase = new LatestEvent(this.eventRepo);
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

    getAllEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("organizer id is missing");

            if (!req.query) throw new Error("query params are empty");
            const { currentPage, filter } = req.query as {
                currentPage: string;
                filter: string;
            };

            const events = await this.getAllEventsUsecase.execute(
                req.user._id,
                parseInt(currentPage),
                filter
            );

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

    viewEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            const event = await this.viewEventUsecase.execute(req.params.eventId);

            res.status(HttpStatusCode.CREATED).json({
                message: "event loaded successfully",
                event,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    getLatestEvents = async (req: Request, res: Response): Promise<void> => {
        try {
            const events = await this.getLatestEventsUsecase.execute();

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
