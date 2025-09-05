import { sendMail } from "../../helper/sendMail";
import { IAdmin } from "../../domain/entities/Admin";
import { IEvent } from "../../domain/entities/Event";
import { IGuest } from "../../domain/entities/Guest";
import { AdminModel } from "../database/Schema/AdminSchema";
import { EventModel } from "../database/Schema/EventSchema";
import { GuestModel } from "../database/Schema/GuestSchema";
import { IOrganizer } from "../../domain/entities/Organizer";
import { OrganizerModel } from "../database/Schema/organizerSchema";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";
import { BookingModel } from "../database/Schema/BookingSchema";

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

  async getAllOrganizers(
    currentPage: number,
    filter: string
  ): Promise<{
    organizers: IOrganizer[];
    totalPages: number;
  }> {
    // search , filter

    const totalPages = await OrganizerModel.countDocuments();

    const PAGE_SIZE: number = 5;
    const skip = (currentPage - 1) * PAGE_SIZE;

    let currentFilter = {};
    if (filter === "newest") {
      currentFilter = {
        createdAt: -1,
      };
    } else if (filter === "oldest") {
      currentFilter = {
        createdAt: 1,
      };
    } else if (filter === "mostevents") {
      currentFilter = {
        totalEventsCreated: -1,
      };
    } else {
      throw new Error("Wrong filter selection");
    }

    const allOrganizers = await OrganizerModel.find()
      .skip(skip)
      .limit(PAGE_SIZE)
      .sort(currentFilter)
      .lean<IOrganizer[]>();

    if (!allOrganizers) throw new Error("Organizers not found");

    return { organizers: allOrganizers, totalPages };
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

  async blockOrganizer(organizersId: string): Promise<IOrganizer> {
    const blockedOrganizer = await OrganizerModel.findByIdAndUpdate(
      organizersId,
      {
        $set: {
          isBlocked: true,
        },
      }
    ).lean<IOrganizer>();

    if (!blockedOrganizer) throw new Error("Could not block organizer");
    return blockedOrganizer;
  }

  async unBlockOrganizer(organizersId: string): Promise<IOrganizer> {
    const unBlockedOrganizer = await OrganizerModel.findByIdAndUpdate(
      organizersId,
      {
        $set: {
          isBlocked: false,
        },
      }
    ).lean<IOrganizer>();

    if (!unBlockedOrganizer) throw new Error("Could not unblock organizer");
    return unBlockedOrganizer;
  }
  async getDashboardStatsForEntities(filter: string): Promise<{
    totalEvents: number;
    totalOrganizers: number;
    totalGuests: number;
  }> {
    //filter [ day, week, month]
    const totalEvents = await EventModel.countDocuments();
    !totalEvents && new Error("no events found");

    const totalOrganizers = await OrganizerModel.countDocuments();
    !totalOrganizers && new Error("no organizers found");

    const totalGuests = await GuestModel.countDocuments();
    !totalGuests && new Error("no guets found");

    return {
      totalEvents,
      totalOrganizers,
      totalGuests,
    };
  }

  async getDashboardStatsForGrossData(): Promise<{
    totalTickets: number;
    totalRefund: number;
    totalTransfer: number;
    totalProfit: number;
  }> {
    const totalTickets: any = await BookingModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$numberOfSeats" },
        },
      },
    ]);

    if (!totalTickets) throw new Error("Total tickets not found");

    const totalRefund: any = await GuestModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$wallet.balance" },
        },
      },
    ]);

    const totalTransfer = 1000;

    const totalProfit: any = await AdminModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$wallet.balance" },
        },
      },
    ]);

    return {
      totalTickets: totalTickets[0].total,
      totalRefund: totalRefund[0].total,
      totalTransfer,
      totalProfit: totalProfit[0].total,
    };
  }
}
