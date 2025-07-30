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
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: "event",
            require: false,
        },
    ],
    createdAt: {
        type: Date,
        required: true,
    },
});

export const OrganizerModel = model("organizer", organizerSchema);
