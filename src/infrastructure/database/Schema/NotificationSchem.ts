import { model, Schema } from "mongoose";
import { INotification } from "../../../domain/entities/Notification";

export const NotificationSchema = new Schema<INotification>({
  role: {
    type: String,
    enum: ["organizer", "guest"],
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  markAsRead: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export const NotificationModel = model("notification", NotificationSchema);
