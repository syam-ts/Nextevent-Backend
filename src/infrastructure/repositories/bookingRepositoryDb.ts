import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { BookingModel } from "../database/Schema/BookingSchema";
import { GuestModel } from "../database/Schema/GuestSchema";

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
        console.log("E NAEM: ", eventName);
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

    async cancelBooking(bookingId: string): Promise<void> {
        const cancelGuestBooking = await BookingModel.findByIdAndDelete(bookingId);
        if (!cancelGuestBooking) throw new Error("Booking not cancel");

        const walletAmount: number = Math.floor(cancelGuestBooking.total / 2);

        const addMoneyToGuestWallet = await GuestModel.findByIdAndUpdate(
            cancelGuestBooking.guestId,
            {
                $inc: { "wallet.balance": walletAmount },
                
                $push: { "wallet.transaction":
                   { type: "credit",
                    amount: walletAmount,
                    fromName: "admin",
                    fromId: "admin_id",
                    createdAt: Date.now()},
                },
            }
        );

        if (!addMoneyToGuestWallet)
            throw new Error("could not add money to guest wallet");
        return;
    }
}
