import { IEventRepository } from "../../domain/interfaces/IEventRepository";

interface IBody {
    eventName: string;
    eventImage: string;
    location: string;
    date: Date;
    startTime: string;
    endTime: string;
    totalSeats: number;
    isPaid: boolean;
    details: string;
}

export class CreateEvent {
    constructor(private eventRepo: IEventRepository) { }

    execute(organizerId: string, body: IBody) {
        const { eventName, eventImage,location, date, startTime, endTime, totalSeats, isPaid, details } =
            body;

        return this.eventRepo.createEvent(
            organizerId,
            eventName,
            eventImage,
            location,
            date,
            startTime,
            endTime,
            totalSeats,
            isPaid,
            details
        );
    }
}
