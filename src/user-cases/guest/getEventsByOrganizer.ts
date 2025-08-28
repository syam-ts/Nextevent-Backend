import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

export class GetEventsByOrganizer {
  constructor(private guestRepo: IGuestRepository) { }

  execute(organizerId: string, filter: string) {
    return this.guestRepo.GetEventsByOrganizer(organizerId, filter);
  }
}
