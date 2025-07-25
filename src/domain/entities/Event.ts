interface IOrganizer {
    _id: string
}

export interface IEvent {
   _id: string
   eventName: string;
   eventImage: string;
   location: string;
   date: Date;
   time: string;
   totalSeats: number;
   isPaid: boolean;
   organizerDetails: IOrganizer;
   details: string;
   isClosed: boolean;
   createdAt: Date;
}

