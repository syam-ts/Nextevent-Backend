export interface IEventRepository {
    createEvent ( 
        organizerId: string,
        eventName: string,
        eventImage: string,
        location: string,
        date: Date,
        time: string,
        totalSeats: number,
        isPaid: boolean,
        details: string, 
    ): Promise<void>;


}
