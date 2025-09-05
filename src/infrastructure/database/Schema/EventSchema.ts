import { model, Schema } from "mongoose";
import { IEvent } from "../../../domain/entities/Event";

const OrganizerSchmea = {
    _id: {
        type: String,
        required: true,
    }, 
};

const EventSchema = new Schema<IEvent>({
    eventName: {
        type: String,
        required: true,
    },
    eventImage: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
        default: 100,
    },
    totalSeats: {
        type: Number,
        required: true,
        default: 0,
    },
    isPaid: {
        type: Boolean,
        required: true,
    },
    organizerDetails: OrganizerSchmea,
    details: {
        type: String,
        required: true,
    },
    isClosed: {
        type: Boolean,
        required: true,
    },
    isExpired: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

export const EventModel = model("event", EventSchema);
