import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { BookingModel } from "../database/Schema/BookingSchema";

export class BookingRepositoryDb implements IBookingRepository {
    async newBooking(
        guestId: string,
        eventId: string,
        eventName: string,
        isPaid: boolean,
        total: number,
        date: Date,
        time: string
    ): Promise<void> {
        console.log('E NAEM: ',eventName)
        const addNewBooking = await new BookingModel({
            guestId,
            eventDetails: {
                _id: eventId,
                eventName: eventName,
            },
            isPaid,
            total,
            date,
            time,
            createdAt: Date.now(),
        }).save();
        if (!addNewBooking) throw new Error("Could not create new Booking");
        return;
    }
}
