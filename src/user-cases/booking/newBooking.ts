import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

interface IBody {
    eventId: string;
    eventName: string;
    isPaid: boolean;
    total: number;
    date: Date;
    time: string;
}

export class NewBooking {
    constructor(private bookingRepo: IBookingRepository) { }

    execute(guestId: string, body: IBody) {
        const { eventId, eventName, isPaid, total, date, time } = body;
        return this.bookingRepo.newBooking(
            guestId,
            eventId,
            eventName,
            isPaid,
            total,
            date,
            time
        );
    }
}
