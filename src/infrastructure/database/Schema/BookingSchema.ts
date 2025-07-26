import { model, Schema } from "mongoose";
import { IBooking } from "../../../domain/entities/Booking";

const EventDetails = {
    _id: {
        type: String,
        require: true,
    },
    evenatName: {
        type: String,
        require: true,
    },
};

export const BookingSchmea = new Schema<IBooking>({
    guestId: {
        type: String,
        require: true,
    },
    eventDetails: EventDetails,
    isPaid: {
        type: Boolean,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    time: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
});


export const BookingModel = model('booking', BookingSchmea);