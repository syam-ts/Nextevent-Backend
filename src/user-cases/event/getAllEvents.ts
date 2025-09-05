import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class GetAllEvents {
    constructor(private eventRepo: IEventRepository) { }

    execute(guestId: string, currentPage: number, filter: string, input: string) {
        return this.eventRepo.getAllEvents(guestId, currentPage, filter, input);
    }
}
