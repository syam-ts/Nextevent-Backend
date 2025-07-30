import { IBooking } from "../../domain/entities/Booking";
import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";
import { AdminModel } from "../database/Schema/AdminSchema";
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
            $inc: { totalSeats: -numberOfSeats, numberOfBooking: numberOfSeats },
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

    async viewBooking(bookingId: string): Promise<IBooking> {
        const booking = await BookingModel.findById(bookingId).lean<IBooking>();

        if (!booking) throw new Error("Booking not found");
        return booking;
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
                        fromId: process.env.ADMIN_OBJECT_ID as string,
                        createdAt: Date.now(),
                    },
                },
            }
        );

        const addMoneyToAdminWallet = await AdminModel.findByIdAndUpdate(
            process.env.ADMIN_OBJECT_ID,
            {
                $inc: { "wallet.balance": walletAmount },

                $push: {
                    "wallet.transaction": {
                        type: "credit",
                        amount: walletAmount,
                        fromName: "guest",
                        fromId: cancelGuestBooking.guestId as string,
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
