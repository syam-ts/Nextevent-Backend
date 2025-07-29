import { IGuest } from "../entities/Guest";

export interface IGuestRepository {
    signupGuest (
        name: string,
        email: string,
        password: string,
        mobile: number,
        age: number
    ):   Promise<void>;

    loginGuest (email: string, password: string): Promise<IGuest>;

    updateGuest (
        guestId: string,
        name: string,
        profilePicture: string,
        mobile: number,
        age: number
    ): Promise<IGuest>;

    // bookEvent (
    //     guestId: string, 
    //      eventId: string 
    // paymentType: string
    // amount: number
    // numberOfTickets: number
    // ): Promise<IGuest>;
}
