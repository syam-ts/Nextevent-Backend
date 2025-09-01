import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class UnBlockOrganizer {
  constructor(private admingrepo: IAdminRepository) { }

  execute(organizerId: string) {
    return this.admingrepo.unBlockOrganizer(organizerId);
  }
}
