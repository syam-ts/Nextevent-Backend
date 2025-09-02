import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class GetDashboardStatsForEntities {
  constructor(private adminRepo: IAdminRepository) { }

  execute(filter: string) {
    return this.adminRepo.getDashboardStatsForEntities(filter);
  }
}
