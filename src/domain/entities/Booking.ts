export interface IBooking {
    _id: string;
    guestId: string;
    eventDetails: {
        _id: string;
        eventName: string;
    };
    isPaid: boolean;
    street: string;
    city: string;
    zipcode: string;
    numberOfSeats: number;
    total: number;
    createdAt: Date;
}
