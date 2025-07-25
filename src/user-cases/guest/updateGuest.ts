import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

interface IBody {
    name: string;
    mobile: number;
    age: number;
}

export class UpdateGuest {
    constructor(private guestRepo: IGuestRepository) { }

    execute(guestId: string, body: IBody) {
        const { name, mobile, age } = body;
        return this.guestRepo.updateGuest(guestId, name, mobile, age);
    }
}
