import { model, Schema } from "mongoose";
import { IBooking } from "../../../domain/entities/Booking";

const EventDetails = {
    _id: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
};

export const BookingSchema = new Schema<IBooking>({
    guestId: {
        type: String,
        required: true,
    },
    eventDetails: EventDetails,
    isPaid: {
        type: Boolean,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    numberOfSeats: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },

    createdAt: {
        type: Date,
        required: true,
    },
});

export const BookingModel = model("booking", BookingSchema);
