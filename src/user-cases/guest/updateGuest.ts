import { IGuest } from "../../domain/entities/Guest";
import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";
  
type Body = Pick<IGuest, 'name'| 'profilePicture' |'mobile'|'location'>;

export class UpdateGuest {
    constructor(private guestRepo: IGuestRepository) { }

    execute(guestId: string, body: Required<Body>) {
        const { name, profilePicture, mobile, location } = body;
        return this.guestRepo.updateGuest(
            guestId,
            name,
            profilePicture,
            mobile,
            location
        );
    }
}
