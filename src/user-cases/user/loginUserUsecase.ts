import { IUserRepository } from "../../domain/interfaces/IOrganiserRepository"; 

interface IBody {
    email: string;
    password: string;
}

export class LoginUser {
    constructor(private userRepository: IUserRepository) { }

    execute(body: IBody) {
        const { email, password } = body;
        return this.userRepository.loginUser(email, password);
    }
}
