import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class GetAllEvents {
    constructor(private eventRepo: IEventRepository) { }

    execute() {
        return this.eventRepo.getAllEvents();
    }
}
