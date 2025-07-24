import { IUserRepository } from "../../domain/interfaces/IOrganiserRepository";

export class GetMyClients {
    constructor(private userRepository: IUserRepository) { }

    execute(userId: string) {
        return this.userRepository.getMyClients(userId);
    }
}
