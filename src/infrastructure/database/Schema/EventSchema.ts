import { model, Schema } from "mongoose";
import { IEvent } from "../../../domain/entities/IEvent";

const OrganizerSchmea = {
    _id: {
        type: String,
        require: true,
    }, 
};

const EventSchema = new Schema<IEvent>({
    eventName: {
        type: String,
        require: true,
    },
    location: {
        type: String,
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
    totalSeats: {
        type: Number,
        require: true,
        default: 0,
    },
    isPaid: {
        type: Boolean,
        require: true,
    },
    organizerDetails: OrganizerSchmea,
    details: {
        type: String,
        require: true,
    },
    isClosed: {
        type: Boolean,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
});

export const EventModel = model("event", EventSchema);
