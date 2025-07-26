

export interface IBooking { 
    _id: string,
    guestId: string,
    eventDetails: {
        _id: string,
        eventName: string
    },
    isPaid: boolean,
    total: number,
    date: Date,
    time: string,
    createdAt: Date,
}