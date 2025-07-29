import { IEvent } from "./Event"
import { IWallet } from "./Wallet"

export interface IGuest {
    _id: string
    name: string
    profilePicture: string
    email: string
    password: string
    mobile: number
    age: number
    numberOfEventsAttended: number,
    wallet: IWallet
    // events: IEvent,
    createdAt: Date 
}