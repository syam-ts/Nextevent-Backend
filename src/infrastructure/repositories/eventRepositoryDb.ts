import { IEvent } from "../../domain/entities/Event";
import { IGuest } from "../../domain/entities/Guest";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { expiryVerification } from "../../helper/helperFuntions/corn";
import { EventModel } from "../database/Schema/EventSchema";
import { GuestModel } from "../database/Schema/GuestSchema";
import { OrganizerModel } from "../database/Schema/organizerSchema";

export class EventRepositorDb implements IEventRepository {
    async createEvent(
        organizerId: string,
        eventName: string,
        eventImage: string,
        location: string,
        date: Date,
        startTime: string,
        endTime: string,
        ticketPrice: number,
        totalSeats: number,
        isPaid: boolean,
        details: string
    ): Promise<void> {
 
        const newEvent = await new EventModel({
            eventName,
            eventImage,
            location,
            date,
            startTime,
            endTime,
            ticketPrice,
            totalSeats,
            isPaid,
            details,
            organizerDetails: {
                _id: organizerId,
            },
            isClosed: false,
            isExpired: false,
            createdAt: Date.now(),
        }).save();

        if (!newEvent) throw new Error("Event not created");

        expiryVerification(String(date), newEvent._id);

        const updateOrganization = await OrganizerModel.findByIdAndUpdate(
            organizerId,
            {
                $addToSet: {
                    createdEvents: newEvent._id,
                },
                $inc: { totalEventsCreated: 1 },
            }
        );

        if (!updateOrganization) throw new Error("could not update organization");

        return;
    }

    async getMyEvents(organizerId: string): Promise<IEvent[]> {
        const events = await EventModel.find({
            "organizerDetails._id": organizerId,
        }).sort({createdAt: -1}).lean<IEvent[]>();

        if (!events) throw new Error("No events found");
        return events;
    }

    async getAllEvents(
        guestId: string,
        currentPage: number,
        filter: string
    ): Promise<IEvent[]> {
        const guest = await GuestModel.findById(guestId).lean<IGuest>();

        if (!guest) throw new Error("guest not found");

        let filterQuery;
        if (filter === "free") {
            filterQuery = {
                isPaid: false,
            };
        } else if (filter === "paid") {
            filterQuery = {
                isPaid: true,
            };
        } else if (filter === "nearby") {
            filterQuery = {
                location: guest.location,
            };
        } else {
            throw new Error("wrong selection");
        }

        //for future pagination -------------
        const page_size: number = 4;
        const skip: number = (currentPage - 1) * page_size;
        const totalEvents = await EventModel.countDocuments();
        const totalPages = Math.ceil(totalEvents / page_size);
        // const events = await EventModel.find(filterQuery)
        //     .skip(skip)
        //     .limit(page_size)
        //     .lean<IEvent[]>();
        // -----------------------------------

        const events = await EventModel.find(filterQuery).lean<IEvent[]>();

        if (!events) throw new Error("No event found");
        return events;
    }

    async viewEvent(eventId: string): Promise<IEvent> {
        const event = await EventModel.findById(eventId).lean<IEvent>();

        if (!event) throw new Error("Event not found");
        return event;
    }

    async getLatestEvents(): Promise<IEvent[]> {
        const events = await EventModel.find()
            .sort({ createdAt: -1 })
            .lean<IEvent[]>();

        if (!events) throw new Error("No event found");
        return events;
    }
}
