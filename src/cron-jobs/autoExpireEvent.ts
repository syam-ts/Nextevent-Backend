import { IEvent } from "../domain/entities/Event";
import { EventModel } from "../infrastructure/database/Schema/EventSchema";
import { NotificationModel } from "../infrastructure/database/Schema/NotificationSchem";

export const autoExpierEvent = (
  organizerId: string,
  eventId: string,
  expiryDate: string
): void => {
  const expiryTime = new Date(expiryDate).getTime();
  const now = Date.now();
  const delay = expiryTime - now;

  setTimeout(async () => {
    const makeExpireEvent = await EventModel.findByIdAndUpdate(eventId, {
      $set: {
        isExpired: true,
      },
    }).lean<IEvent>();

    const addNotification = await new NotificationModel({
      role: "organizer",
      roleId: organizerId,
      entityId: eventId,
      message: "Event has expired",
      markAsRead: false,
      createdAt: Date.now(),
    }).save();

    // console.log('notification send');
    console.log(`${makeExpireEvent?.eventName}: Event were expired ${eventId}`);
  }, delay);
};
