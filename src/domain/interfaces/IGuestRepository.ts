import { IGuest } from "../entities/Guest";
import { IWallet } from "../entities/Wallet";

export interface IGuestRepository {
    signupGuest(
        name: string,
        email: string,
        password: string,
        mobile: number,
        age: number
    ): Promise<void>;

    loginGuest(email: string, password: string): Promise<IGuest>;

    updateGuest(
        guestId: string,
        name: string,
        profilePicture: string,
        mobile: number,
        age: number
    ): Promise<IGuest>;

    getWallet(guestId: string): Promise<IWallet>;

    getHomestats(): Promise<{
        totalEvents: number;
        totalBookings: number;
        totalOrganizers: number;
    }>;
}
