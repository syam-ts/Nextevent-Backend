import { IGuestRepository } from "../../domain/interfaces/IGuestRepository";

export class GetAllOrganizers {
  constructor(private guestRepo: IGuestRepository) { }

  execute() {
    return this.guestRepo.getAllOrganizers();
  }
}
