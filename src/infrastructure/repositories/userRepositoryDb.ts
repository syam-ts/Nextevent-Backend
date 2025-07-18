import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { hashPasswordFunction } from "../../utils/crypto/hashPassword";
import { verifyPassword } from "../../utils/crypto/verifyPassword";
import { UserModel } from "../database/Schema/userSchema";

export class UserRepositoryDb implements IUserRepository {
    async signupUser(
        fullName: string,
        email: string,
        mobile: number,
        password: string,
        gender: string,
        country: string,
        state: string,
        language: string
    ) {
        const hashedPassword = await hashPasswordFunction(password);

        const newUser = await new UserModel({
            fullName,
            email,
            mobile,
            password: hashedPassword,
            gender,
            country,
            state,
            language,
        }).save();
        if (!newUser) throw new Error("Failed to create new User");
        return;
    }

    async loginUser(email: string, password: string): Promise<any> {
        const findedUser = await UserModel.findOne({ email }).lean<User>().exec();

        if (!findedUser) throw new Error("User not found");
        const verifiedPassword = await verifyPassword(
            password,
            findedUser.password
        );
        if (verifiedPassword) return findedUser._id.toString();
    }
}
