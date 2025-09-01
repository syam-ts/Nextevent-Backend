import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class BlockOrganizer {
  constructor(private admingrepo: IAdminRepository) { }

  execute(organizerId: string) {
    return this.admingrepo.blockOrganizer(organizerId);
  }
}
