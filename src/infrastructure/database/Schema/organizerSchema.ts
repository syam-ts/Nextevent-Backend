import { model, Schema } from "mongoose";
import { IOrganizer } from "../../../domain/entities/Organizer"; 

const organizerSchema = new Schema<IOrganizer>({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true,
        default: "organizer",
    },
    organizationName: {
        type: String,
        require: true,
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
        require: true,
    },
});

export const OrganizerModel = model("organizer", organizerSchema);
