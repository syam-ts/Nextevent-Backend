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

    cancelBooking(bookingId: string): Promise<void>;
}
