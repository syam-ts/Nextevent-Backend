import { IEvent } from "../entities/Event";
import { IGuest } from "../entities/Guest";
import { IOrganizer } from "../entities/Organizer";
import { IWallet } from "../entities/Wallet";

export interface IGuestRepository {
    signupGuest(
        name: string,
        email: string,
        password: string,
        mobile: number,
        location: string
    ): Promise<void>;

    loginGuest(email: string, password: string): Promise<IGuest>;

    updateGuest(
        guestId: string,
        name: string,
        profilePicture: string,
        mobile: number,
        location: string
    ): Promise<IGuest>;

    getWallet(guestId: string): Promise<IWallet>;

    getHomestats(): Promise<{
        totalEvents: number;
        totalBookings: number;
        totalOrganizers: number;
    }>;

    getAllOrganizers(): Promise<IOrganizer[]>;

    GetEventsByOrganizer(organizerId: string, filter: string): Promise<IEvent[]>;
}
