import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

 
export class GetHomeStats {
    constructor(private guestRepo: IGuestRepository) { }

    execute() { 
        return this.guestRepo.getHomestats()
    }
}
