import { IEvent } from "../domain/entities/Event";
import { EventModel } from "../infrastructure/database/Schema/EventSchema";

export const autoExpierEvent = (eventId: string, expiryDate: string): void => {

  const expiryTime = new Date(expiryDate).getTime();
  const now = Date.now();
  const delay = expiryTime - now;

  setTimeout(async () => {
    const makeExpireEvent = await EventModel.findByIdAndUpdate(eventId, {
      $set: {
        isExpired: true,
      },
    }).lean<IEvent>();

    console.log(`${makeExpireEvent?.eventName}: Event were expired ${eventId}`);
  }, delay);
};
