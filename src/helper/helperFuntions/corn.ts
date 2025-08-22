import { EventModel } from "../../infrastructure/database/Schema/EventSchema";

export const expiryVerification = (
  expiryDate: string,
  eventId: string
): void => { 

  const expiryTime = new Date(expiryDate).getTime();
  const now = Date.now();
  const delay = expiryTime - now;

  setTimeout(async () => {
    console.log("Triggered timer");
    const makeExpireEvent = await EventModel.findByIdAndUpdate(eventId, {
      $set: {
        isExpired: true,
      },
    });

    console.log(`${makeExpireEvent?.eventName}: Event were expired ${eventId}`);
  }, delay);
};
