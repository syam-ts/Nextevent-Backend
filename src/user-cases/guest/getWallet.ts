import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

export class GetWallet {
    constructor(private guestRepo: IGuestRepository) { }

    execute(guestId: string) {
        return this.guestRepo.getWallet(guestId);
    }
}
