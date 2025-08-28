import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class GetAllEvents {
  constructor(private admingrepo: IAdminRepository) { }

  execute() {
    return this.admingrepo.getAllEvents();
  }
}
