import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

export class GetDashboardStatsForGrossData {
  constructor(private adminRepo: IAdminRepository) { }

  execute() {
    return this.adminRepo.getDashboardStatsForGrossData();
  }
}
