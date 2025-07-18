import { UserRepositoryDb } from "../../../infrastructure/repositories/userRepositoryDb";

interface IBody {
    email: string;
    password: string;
}

export class LoginUser {
    constructor(private userRepository: UserRepositoryDb) { }

    execute(body: IBody) {
        const { email, password } = body;
        return this.userRepository.loginUser(email, password);
    }
}
