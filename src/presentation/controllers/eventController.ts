import { Request, Response } from "express";
import { EventRepositorDb } from "../../infrastructure/repositories/eventRepositoryDb";
import { CreateEvent } from "../../user-cases/event/createEvent";
import { HttpStatusCode } from "../../helper/constants/statusCodes";


export class EventController {
    public eventRepo: EventRepositorDb;
    public createEventUsecase: CreateEvent;
    constructor() {
       this.eventRepo = new EventRepositorDb();
       this.createEventUsecase = new CreateEvent(this.eventRepo)
    }
  createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("organizer id is missing");
            const organizer = await this.createEventUsecase.execute(
                req.user._id,
                req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "Organizer updated Successfull",
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

}