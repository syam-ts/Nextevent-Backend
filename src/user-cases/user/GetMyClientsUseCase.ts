import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class GetMyClients {
    constructor(private userRepository: IUserRepository) { }

    execute(userId: string) {
        return this.userRepository.getMyClients(userId);
    }
}
