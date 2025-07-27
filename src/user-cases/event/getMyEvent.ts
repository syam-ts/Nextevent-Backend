import { IEventRepository } from "../../domain/interfaces/IEventRepository";

export class GetMyEvents {
  constructor(private eventRepo: IEventRepository) {}

  execute(organizerId: string) {
    return this.eventRepo.getMyEvents(organizerId);
  }
}
