import { IClient } from "../../domain/entities/Client";
import { IUser } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { hashPasswordFunction } from "../../utils/crypto/hashPassword";
import { verifyPassword } from "../../utils/crypto/verifyPassword";
import { ClientModel } from "../database/Schema/clientSchema";
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
        const findedUser = await UserModel.findOne({ email }).lean<IUser>().exec();

        if (!findedUser) throw new Error("User not found");
        const verifiedPassword = await verifyPassword(
            password,
            findedUser.password
        );
        if (verifiedPassword) return findedUser;
    }

    async getUserProfile(userId: string): Promise<IUser> {
        const user = await UserModel.findById(userId).lean<IUser>();
        if (!user) throw new Error("user not found!");
        return user;
    }

    async updateUser(
        userId: string,
        fullName: string,
        mobile: number,
        gender: string,
        country: string,
        state: string,
        language: string
    ): Promise<IUser> {
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            $set: {
                fullName,
                mobile,
                gender,
                country,
                state,
                language,
            }
        }, {
            new: true
        }).lean<IUser>();

        if (!updateUser) throw new Error("User not found");
        return updateUser;
    }

    async getMyClients(userId: string): Promise<IClient[]> {
        const clients = await ClientModel.find({ userId }).lean<IClient[]>();
    

        if (!clients) throw new Error("Clients not found");
        return clients;
    }
 
}
