import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

interface IBody {
    eventId: string;
    eventName: string;
    isPaid: boolean;
    street: string;
    city: string;
    zipcode: string;
    numberOfSeats: number;
    total: number;
}

export class FreeBooking {
    constructor(private bookingRepo: IBookingRepository) { }

    execute(guestId: string, body: IBody) {
        const {
            eventId,
            eventName,
            isPaid,
            street,
            city,
            zipcode,
            numberOfSeats,
            total,
        } = body;

        return this.bookingRepo.newBooking(
            guestId,
            eventId,
            eventName,
            isPaid,
            street,
            city,
            zipcode,
            numberOfSeats,
            total
        );
    }
}
