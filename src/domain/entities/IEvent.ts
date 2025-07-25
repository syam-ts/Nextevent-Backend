export interface IEvent {
   eventName: string;
   location: string;
   date: Date;
   time: string;
   totalSeats: number;
   isPaid: boolean;
   details: string;
   isClosed: boolean;
}
