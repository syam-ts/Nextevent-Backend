import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class ViewEvent {
    constructor(private eventRepo: IEventRepository) { }

    execute(eventId: string) {
        return this.eventRepo.viewEvent(eventId);
    }
}
