import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";

 
export class GetHomeStats {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(organizer: any) { 
        return this.organizerRepo.getHomeStats(organizer._id);
    }
}
