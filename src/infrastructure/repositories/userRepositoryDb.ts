import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserModel } from "../database/Schema/userSchema";

export class UserRepositoryDb implements IUserRepository {
    async signupUser(
        fullName: string,
        email: string,
        mobile: number,
        gender: string,
        country: string,
        state: string,
        language: string
    ) {
        const newUser = await new UserModel({
            fullName,
            email,
            mobile,
            gender,
            country,
            state,
            language,
        }).save();
        if (!newUser) throw new Error("Failed to create new User");
        return;
    }

    async loginUser(email: string, password: string) { }
}
