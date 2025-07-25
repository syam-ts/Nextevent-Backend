import { IEvent } from "./IEvent"

export interface IOrganizer {
    _id: string;
    name: string,
    email: string
    mobile: number,
    password: string
    role: "organizer",
    organizationName: string,
    createdEvents: IEvent[],
    createdAt: Date
}