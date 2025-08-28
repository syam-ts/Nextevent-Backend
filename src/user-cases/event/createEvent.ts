import { IEvent } from "../../domain/entities/Event";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";

type Body = Omit<IEvent, "_id" | "organizerDetails" | "isClosed" | "createdAt">;

export class CreateEvent {
    constructor(private eventRepo: IEventRepository) { }

    execute(organizerId: string, body: Body) {
        const {
            eventName,
            eventImage,
            location,
            date,
            startTime,
            endTime,
            ticketPrice,
            totalSeats,
            isPaid,
            details,
        } = body;

        return this.eventRepo.createEvent(
            organizerId,
            eventName,
            eventImage,
            location,
            date,
            startTime,
            endTime,
            ticketPrice,
            totalSeats,
            isPaid,
            details
        );
    }
}
