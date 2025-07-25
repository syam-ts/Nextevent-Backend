import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

interface IBody {
    email: string;
    password: string;
}

export class LoginGuest {
    constructor(private guestRepo: IGuestRepository) { }

    execute(body: IBody) {
        const { email, password } = body;
        return this.guestRepo.loginGuest(email, password);
    }
}
