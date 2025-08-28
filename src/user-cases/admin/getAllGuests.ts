import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class GetAllGuests {
  constructor(private admingrepo: IAdminRepository) { }

  execute() {
    return this.admingrepo.getAllGuests();
  }
}
