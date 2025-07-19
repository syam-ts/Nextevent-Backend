import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class GetSingleClient {
    constructor(private userRepository: IUserRepository) { }

    execute(clientId: string) {
        return this.userRepository.getSingleClients(clientId);
    }
}
