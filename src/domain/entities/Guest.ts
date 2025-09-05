 import { IWallet } from "./Wallet"

export interface IGuest {
    _id: string
    name: string
    profilePicture: string
    email: string
    password: string
    mobile: number
    location: string
    numberOfEventsAttended: number,
    wallet: IWallet 
    createdAt: Date 
}