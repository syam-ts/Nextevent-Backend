import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class LatestEvent {
    constructor(private eventRepo: IEventRepository) { }

    execute() {
        return this.eventRepo.getLatestEvents();
    }
}
