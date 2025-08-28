import { IEvent } from "../entities/Event";
import { IGuest } from "../entities/Guest";
import { IOrganizer } from "../entities/Organizer";

export interface IAdminRepository {
  
  getAllOrganizers(): Promise<IOrganizer[]>;
  getAllGuests(): Promise<IGuest[]>;
  getAllEvents(): Promise<IEvent[]>;
}
