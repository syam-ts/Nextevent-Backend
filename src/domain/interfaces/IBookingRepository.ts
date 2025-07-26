export interface IBookingRepository {
    newBooking(
        guestId: string,
        eventId: string,
        eventName: string,
        isPaid: boolean,
        total: number,
        date: Date,
        time: string
    ): Promise<void>;

    cancelBooking(bookingId: string): Promise<void>;
}
