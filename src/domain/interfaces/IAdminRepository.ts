import { IAdmin } from "../entities/Admin";
import { IEvent } from "../entities/Event";
import { IGuest } from "../entities/Guest";
import { IOrganizer } from "../entities/Organizer";

export interface IAdminRepository {

  loginAdmin(userName: string, password: string): Promise<IAdmin>; 
  getAllOrganizers(): Promise<IOrganizer[]>;
  getAllGuests(): Promise<IGuest[]>;
  getAllEvents(): Promise<IEvent[]>;
}
