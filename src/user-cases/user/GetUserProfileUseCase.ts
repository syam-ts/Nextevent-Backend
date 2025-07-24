import { IUserRepository } from "../../domain/interfaces/IOrganiserRepository";

export class GetUserProfile {
    constructor(private userRepository: IUserRepository) { }

    execute(userId: string) {
        return this.userRepository.getUserProfile(userId);
    }
}
