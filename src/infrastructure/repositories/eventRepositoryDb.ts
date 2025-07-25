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
        time: string,
        totalSeats: number,
        isPaid: boolean,
        details: string
    ): Promise<void> {
        const newEvent = await new EventModel({
            eventName,
            eventImage,
            location,
            date,
            time,
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
}
