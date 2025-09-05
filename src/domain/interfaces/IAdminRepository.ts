import { IAdmin } from "../entities/Admin";
import { IEvent } from "../entities/Event";
import { IGuest } from "../entities/Guest";
import { IOrganizer } from "../entities/Organizer";

export interface IAdminRepository {
  loginAdmin(userName: string, password: string): Promise<IAdmin>;
  getAllOrganizers(
    currentPage: number,
    filter: string
  ): Promise<{
    organizers: IOrganizer[];
    totalPages: number;
  }>;
  getAllGuests(): Promise<IGuest[]>;
  getAllEvents(): Promise<IEvent[]>;

  blockOrganizer(organizersId: string): Promise<IOrganizer>;
  unBlockOrganizer(organizerId: string): Promise<IOrganizer>;

  getDashboardStatsForEntities(filter: string): Promise<{
    totalEvents: number;
    totalOrganizers: number;
    totalGuests: number;
  }>;

  getDashboardStatsForGrossData(): Promise<{
    totalTickets: number;
    totalRefund: number;
    totalTransfer: number;
    totalProfit: number;
  }>;
}
