import { IEvent } from "../../domain/entities/Event";
import { IEventRepository } from "../../domain/interfaces/IEventRepository";
import { EventModel } from "../database/Schema/EventSchema";
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
            totalSeats,
            isPaid,
            details,
            organizerDetails: {
                _id: organizerId,
            },
            isClosed: false,
            createdAt: Date.now(),
        }).save();

        if (!newEvent) throw new Error("Event not created");

        const updateOrganization = await OrganizerModel.findByIdAndUpdate(
            organizerId,
            {
                $addToSet: {
                    createdEvents: newEvent._id,
                },
            }
        );

        if (!updateOrganization) throw new Error("could not update organization");

        return;
    }

    async getMyEvents(organizerId: string): Promise<IEvent[]> {
        const events = await EventModel.find({
            "organizerDetails._id": organizerId,
        }).lean<IEvent[]>();

        if (!events) throw new Error("No events found");
        return events;
    }

    async getAllEvents(): Promise<IEvent[]> {
        const events = await EventModel.find().lean<IEvent[]>();

        if (!events) throw new Error("No event found");
        return events;
    }

    async viewEvent(eventId: string): Promise<IEvent> {
        const event = await EventModel.findById(eventId).lean<IEvent>();

        if (!event) throw new Error("Event not found");
        return event;
    }
}
