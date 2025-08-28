interface IOrganizer {
    _id: string
}

export interface IEvent {
   _id: string
   eventName: string;
   eventImage: string;
   location: string;
   date: Date;
   startTime: string;
   endTime: string;
   ticketPrice: number;
   totalSeats: number;
   isPaid: boolean;
   organizerDetails: IOrganizer;
   details: string; 
   isClosed: boolean;
   isExpired: boolean;
   createdAt: Date;
}

