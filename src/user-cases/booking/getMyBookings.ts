import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

export class GetMyBookings {
    constructor(private bookingRepo: IBookingRepository) { }

    execute(guestId: string) {
        return this.bookingRepo.getMyBookings(guestId);
    }
}
