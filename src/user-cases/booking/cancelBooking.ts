import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

export class CancelBooking {
    constructor(private bookingRep: IBookingRepository) { }

    execute(bookingId: string) {
        return this.bookingRep.cancelBooking(bookingId);
    }
}
