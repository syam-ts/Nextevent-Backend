import { IGuest } from "../../domain/entities/Guest";
import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";
 
type Body = Pick<IGuest, 'email' | 'password'>;

export class LoginGuest {
    constructor(private guestRepo: IGuestRepository) { }

    execute(body: Required<Body>) {
        const { email, password } = body;
        return this.guestRepo.loginGuest(email, password);
    }
}
