import { model, Schema } from "mongoose";
import { IOrganizer } from "../../../domain/entities/Organizer"; 

const organizerSchema = new Schema<IOrganizer>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "organizer",
    },
    organizationName: {
        type: String,
        required: true,
    },
    totalEventsCreated: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

export const OrganizerModel = model("organizer", organizerSchema);
