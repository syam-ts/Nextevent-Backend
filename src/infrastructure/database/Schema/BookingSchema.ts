import { model, Schema } from "mongoose";
import { IBooking } from "../../../domain/entities/Booking";

const EventDetails = {
    _id: {
        type: String,
        require: true,
    },
    eventName: {
        type: String,
        require: true,
    },
};

export const BookingSchema = new Schema<IBooking>({
    guestId: {
        type: String,
        require: true,
    },
    eventDetails: EventDetails,
    isPaid: {
        type: Boolean,
        require: true,
    },
    street: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    zipcode: {
        type: String,
        require: true,
    },
    numberOfSeats: {
        type: Number,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },

    createdAt: {
        type: Date,
        require: true,
    },
});

export const BookingModel = model("booking", BookingSchema);
