import { IEvent } from "../entities/Event"
import { INotification } from "../entities/Notification";

export interface IEventRepository {
    createEvent ( 
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
        details: string, 
    ): Promise<INotification>

    getMyEvents(organizerId: string): Promise<IEvent[]>
    
    getAllEvents(guestId: string, currentPage: number, filter: string, input: string): Promise<IEvent[]>;

    viewEvent(eventId: string): Promise<IEvent>

    getLatestEvents(): Promise<IEvent[]>

    deleteEvent(eventId: string): Promise<void>;

}
