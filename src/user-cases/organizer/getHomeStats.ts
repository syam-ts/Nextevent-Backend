import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";

 
export class GetHomeStats {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(organizerId: string) { 
        return this.organizerRepo.getHomeStats(organizerId);
    }
}
