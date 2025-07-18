import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    password: string;
    gender: string;
    country: string;
    state: string;
    language: string;
}

export class CreateUser {
    constructor(private userRepository: IUserRepository) { }

    execute(body: IUser) {
        const {
            firstName,
            lastName,
            email,
            mobile,
            password,
            gender,
            country,
            state,
            language,
        } = body;
        const fullName: string = firstName + lastName;

        return this.userRepository.signupUser(
            fullName,
            email,
            mobile,
            password,
            gender,
            country,
            state,
            language
        );
    }
}
