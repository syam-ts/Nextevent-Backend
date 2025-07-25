export interface IEvent {
   _id: string
   eventName: string;
   location: string;
   date: Date;
   time: string;
   totalSeats: number;
   isPaid: boolean;
   details: string;
   isClosed: boolean;
}
