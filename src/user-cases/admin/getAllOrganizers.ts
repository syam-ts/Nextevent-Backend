import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class GetAllOrganizers {
  constructor(private admingrepo: IAdminRepository) { }

  execute(currentPage: number, filter: string) {
    return this.admingrepo.getAllOrganizers(currentPage, filter);
  }
}
