import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

interface IBody {
    name: string;
    profilePicture: string;
    mobile: number;
    age: number;
}

export class UpdateGuest {
    constructor(private guestRepo: IGuestRepository) { }

    execute(guestId: string, body: IBody) {
        const { name, profilePicture, mobile, age } = body;
        return this.guestRepo.updateGuest(
            guestId,
            name,
            profilePicture,
            mobile,
            age
        );
    }
}
