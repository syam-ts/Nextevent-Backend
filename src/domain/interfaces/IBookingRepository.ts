import { IBooking } from "../entities/Booking";
import { INotification } from "../entities/Notification";

export interface IBookingRepository {
    newBooking(
        guestId: string,
        eventId: string,
        eventName: string,
        isPaid: boolean,
        street: string,
        city: string,
        zipcode: string,
        numberOfSeats: number,
        total: number
    ): Promise<INotification>;

    getMyBookings(guestId: string): Promise<IBooking[]>;

    viewBooking(BookingId: string): Promise<IBooking>;
    
    cancelBooking(bookingId: string): Promise<void>;
}
