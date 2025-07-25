import { IEventRepository } from "../../domain/interfaces/IEventRepository";

interface IBody {
    eventName: string;
    location: string;
    date: Date;
    time: string;
    totalSeats: number;
    isPaid: boolean;
    details: string;
}

export class CreateEvent {
    constructor(private eventRepo: IEventRepository) { }

    execute(organizerId: string, body: IBody) {
        const { eventName, location, date, time, totalSeats, isPaid, details } =
            body;

        return this.eventRepo.createEvent(
            organizerId,
            eventName,
            location,
            date,
            time,
            totalSeats,
            isPaid,
            details
        );
    }
}
