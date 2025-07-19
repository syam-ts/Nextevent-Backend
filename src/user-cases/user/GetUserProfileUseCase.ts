import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class GetUserProfile {
    constructor(private userRepository: IUserRepository) { }

    execute(userId: string) {
        return this.userRepository.getUserProfile(userId);
    }
}
