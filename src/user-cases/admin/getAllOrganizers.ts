import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class GetAllOrganizers {
  constructor(private admingrepo: IAdminRepository) { }

  execute() {
    return this.admingrepo.getAllOrganizers();
  }
}
