import { IUserRepository } from "../../domain/interfaces/IUserRepository";

interface IBody { 
    fullName: string;
    mobile: number;
    gender: string;
    country: string;
    state: string;
    language: string;
}

export class updateUser {
    constructor(private userRepository: IUserRepository) { }

    execute(body: IBody, userId: string) {
        const { fullName, mobile, gender, country, state, language } = body;
        return this.userRepository.updateUser(
            userId,
            fullName,
            mobile,
            gender,
            country,
            state,
            language
        );
    }
}
