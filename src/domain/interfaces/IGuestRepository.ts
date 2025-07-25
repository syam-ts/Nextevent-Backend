import { IGuest } from "../entities/Guest";

export interface IGuestRepository {
    signupGuest: (  
        name: string,
        email: string,
        password: string,
        mobile: number,
        age: number,  
    ) => Promise<void>;

    loginGuest: (email: string, password: string) => Promise<IGuest>

    updateGuest: (guestId: string,name: string, mobile: number, age: number) => Promise<IGuest>
}
