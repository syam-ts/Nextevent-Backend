import { IEvent } from "./Event"

export interface IGuest {
    _id: string
    name: string
    email: string
    password: string
    mobile: number
    age: number
    numberOfEventsAttended: number,
    // events: IEvent,
    createdAt: Date 
}