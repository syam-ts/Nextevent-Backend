import { IBooking } from "../entities/Booking";

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
    ): Promise<void>;

    getMyBookings(guestId: string): Promise<IBooking[]>;

    viewBooking(BookingId: string): Promise<IBooking>;
    
    cancelBooking(bookingId: string): Promise<void>;
}
