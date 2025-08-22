import { IGuest } from "../../domain/entities/Guest";
import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";
  
type Body = Pick<IGuest, 'name'| 'email' | 'password' | 'mobile' | 'location'>;

export class CreateGuest {
    constructor(private guestRepo: IGuestRepository) { }

    execute(body: Required<Body>) {
        const { name, email, password, mobile, location } = body;
        return this.guestRepo.signupGuest(name, email, password, mobile, location);
    }
}
