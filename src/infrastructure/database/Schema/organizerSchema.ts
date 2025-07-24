import { IOrganizer } from "@/domain/entities/Organizer";
import { model, Schema } from "mongoose";

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
    organizationName: {
        type: String,
        require: true
    }
});

export const OrganizerModel = model("Organizer", organizerSchema);
