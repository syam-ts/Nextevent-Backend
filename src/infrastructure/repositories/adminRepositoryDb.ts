import { IAdmin } from "../../domain/entities/Admin";
import { IEvent } from "../../domain/entities/Event";
import { IGuest } from "../../domain/entities/Guest";
import { IOrganizer } from "../../domain/entities/Organizer";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";
import { sendMail } from "../../helper/sendMail";
import { AdminModel } from "../database/Schema/AdminSchema";
import { EventModel } from "../database/Schema/EventSchema";
import { GuestModel } from "../database/Schema/GuestSchema";
import { OrganizerModel } from "../database/Schema/organizerSchema";

export class AdminRepositoryDb implements IAdminRepository {
  async loginAdmin(userName: string, password: string): Promise<IAdmin> {
    const admin = await AdminModel.findOne({ userName }).lean<IAdmin>();

    if (!admin) throw new Error("Admin not found");

    if (password !== admin.password) throw new Error("Wrong password!");

    sendMail(
      "syamnandhu3@gmail.com",
      "Admin",
      "Login From Nextevent",
      "Welcome to Nextevent"
    );

    return admin;
  }

  async getAllOrganizers(): Promise<IOrganizer[]> {
    //pagination
    const allOrganizers = await OrganizerModel.find().lean<IOrganizer[]>();

    if (!allOrganizers) throw new Error("Organizers not found");

    return allOrganizers;
  }

  async getAllGuests(): Promise<IGuest[]> {
    const allGuests = await GuestModel.find().lean<IGuest[]>();

    if (!allGuests) throw new Error("Guests not found");

    return allGuests;
  }

  async getAllEvents(): Promise<IEvent[]> {
    const allEvents = await EventModel.find().lean<IEvent[]>();

    if (!allEvents) throw new Error("Events not found");

    return allEvents;
  }
}
