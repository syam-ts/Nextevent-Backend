import { IBooking } from "../../domain/entities/Booking";
import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { BookingModel } from "../database/Schema/BookingSchema";
import { EventModel } from "../database/Schema/EventSchema";
import { GuestModel } from "../database/Schema/GuestSchema";

export class BookingRepositoryDb implements IBookingRepository {
    async newBooking(
        guestId: string,
        eventId: string,
        eventName: string,
        isPaid: boolean,
        street: string,
        city: string,
        zipcode: string,
        numberOfSeats: number,
        total: number
    ): Promise<void> {
        const addNewBooking = await new BookingModel({
            guestId,
            eventDetails: {
                _id: eventId,
                eventName: eventName,
            },
            isPaid,
            street,
            city,
            zipcode,
            numberOfSeats,
            total,
            createdAt: Date.now(),
        }).save();
        if (!addNewBooking) throw new Error("Could not create new Booking");

        //update seats in event
        const updateEventSeats = await EventModel.findByIdAndUpdate(eventId, {
            $inc: { totalSeats: -numberOfSeats },
        });

        if (!updateEventSeats)
            throw new Error("Could not update event seats number!");

        return;
    }

    async getMyBookings(guestId: string): Promise<IBooking[]> {
        const bookings = await BookingModel.find({ guestId: guestId }).lean<
            IBooking[]
        >();

        if (!bookings) throw new Error("No booking found");
        return bookings;
    }

    async cancelBooking(bookingId: string): Promise<void> {
        const cancelGuestBooking = await BookingModel.findByIdAndDelete(bookingId);
        if (!cancelGuestBooking) throw new Error("Booking not cancel");

        const walletAmount: number = Math.floor(cancelGuestBooking.total / 2);

        const addMoneyToGuestWallet = await GuestModel.findByIdAndUpdate(
            cancelGuestBooking.guestId,
            {
                $inc: { "wallet.balance": walletAmount },

                $push: {
                    "wallet.transaction": {
                        type: "credit",
                        amount: walletAmount,
                        fromName: "admin",
                        fromId: "admin_id",
                        createdAt: Date.now(),
                    },
                },
            }
        );

        if (!addMoneyToGuestWallet)
            throw new Error("could not add money to guest wallet");
        return;
    }
}
