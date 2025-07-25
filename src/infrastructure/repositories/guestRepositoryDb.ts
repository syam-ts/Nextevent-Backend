import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";
import { GuestModel } from "../database/Schema/GuestSchema";

export class GuestRepositoryDb implements IGuestRepository {
    async signupGuest(
        name: string,
        email: string,
        password: string,
        mobile: number,
        age: number
    ): Promise<void> { 


        const newGuest = await new GuestModel({
            name,
            email,
            password,
            mobile,
            age,
            createdAt: Date.now()
        }).save();

        if(!newGuest) throw new Error('could not create new guest')
            return ;
    }
}
