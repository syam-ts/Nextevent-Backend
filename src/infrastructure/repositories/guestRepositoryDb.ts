import { IGuest } from "../../domain/entities/Guest";
import { IWallet } from "../../domain/entities/Wallet";
import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";
import { hashPasswordFunction } from "../../utils/crypto/hashPassword";
import { verifyPassword } from "../../utils/crypto/verifyPassword";
import { BookingModel } from "../database/Schema/BookingSchema";
import { EventModel } from "../database/Schema/EventSchema";
import { GuestModel } from "../database/Schema/GuestSchema";
import { OrganizerModel } from "../database/Schema/organizerSchema";

export class GuestRepositoryDb implements IGuestRepository {

    async signupGuest(
        name: string,
        email: string,
        password: string,
        mobile: number,
        location: string
    ): Promise<void> {
        const hashedPass = await hashPasswordFunction(password);

        const newGuest = await new GuestModel({
            name,
            email,
            password: hashedPass,
            mobile,
            location,
            wallet: {},
            createdAt: Date.now(),
        }).save();

        if (!newGuest) throw new Error("could not create new guest");
        return;
    }

    async loginGuest(email: string, password: string): Promise<IGuest> {
        const guest = await GuestModel.findOne({ email }).lean<IGuest>();

        if (!guest) throw new Error("Guest not found");

        const verifyPass = await verifyPassword(password, guest.password);
        if (!verifyPass) throw new Error("Wrong password!");

        return guest;
    }


    async updateGuest(
        guestId: string,
        name: string,
        profilePicture: string,
        mobile: number,
        location: string
    ): Promise<IGuest> {
        const updatedGuest = await GuestModel.findByIdAndUpdate(
            guestId,
            {
                $set: {
                    name,
                    profilePicture,
                    mobile,
                    location,
                },
            },
            { new: true }
        ).lean<IGuest>();

        if (!updatedGuest) throw new Error("could not update guest");
        return updatedGuest;
    }


    async getWallet(guestId: string): Promise<IWallet> {
        const guest = await GuestModel.findById(guestId).lean<IGuest>();

        if (!guest) throw new Error("Guest not found");

        return guest.wallet;
    }


    async getHomestats(): Promise<{
        totalEvents: number;
        totalBookings: number;
        totalOrganizers: number;
    }> {
        const totalEvents = await EventModel.countDocuments();
        if (!totalEvents) throw new Error("No events found");
        const totalBookings = await BookingModel.countDocuments();
        if (!totalBookings) throw new Error("No bookings found");
        const totalOrganizers = await OrganizerModel.countDocuments();
        if (!totalOrganizers) throw new Error("No organizers found");

        return {
            totalEvents,
            totalBookings,
            totalOrganizers,
        };
    }
}
