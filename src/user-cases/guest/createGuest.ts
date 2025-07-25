import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

interface IBody {
    name: string;
    email: string;
    password: string;
    mobile: number;
    age: number;
}

export class CreateGuest {
    constructor(private guestRepo: IGuestRepository) { }

    execute(body: IBody) {
        const { name, email, password, mobile, age } = body;
        return this.guestRepo.signupGuest(name, email, password, mobile, age);
    }
}
