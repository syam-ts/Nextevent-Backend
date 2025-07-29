import { IGuest } from "../../domain/entities/Guest";
import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";
import { hashPasswordFunction } from "../../utils/crypto/hashPassword";
import { verifyPassword } from "../../utils/crypto/verifyPassword";
import { GuestModel } from "../database/Schema/GuestSchema";

export class GuestRepositoryDb implements IGuestRepository {
    async signupGuest(
        name: string,
        email: string,
        password: string,
        mobile: number,
        age: number
    ): Promise<void> {
        const hashedPass = await hashPasswordFunction(password);

        const newGuest = await new GuestModel({
            name,
            email,
            password: hashedPass,
            mobile,
            age,
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
        age: number
    ): Promise<IGuest> {
        const updatedGuest = await GuestModel.findByIdAndUpdate(
            guestId,
            {
                $set: {
                    name,
                    profilePicture,
                    mobile,
                    age,
                },
            },
            { new: true }
        ).lean<IGuest>();

        if (!updatedGuest) throw new Error("could not update guest");
        return updatedGuest;
    }
}
