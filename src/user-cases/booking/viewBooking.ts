import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

export class ViewBooking {
    constructor(private bookingRepo: IBookingRepository) { }

    execute(bookingId: string) {
        return this.bookingRepo.viewBooking(bookingId);
    }
}
