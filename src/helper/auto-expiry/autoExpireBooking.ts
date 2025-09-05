import { IBooking } from "../../domain/entities/Booking";
import { BookingModel } from "../../infrastructure/database/Schema/BookingSchema";

export const autoExpierBooking = (
  bookingId: string,
  expiryDate: string
): void => {

  const expiryTime = new Date(expiryDate).getTime();
  const now = Date.now();
  const delay = expiryTime - now;

  setTimeout(async () => {
    const makeExpireBooking = await BookingModel.findByIdAndUpdate(bookingId, {
      $set: {
        isExpired: true,
      },
    }).lean<IBooking>();

    console.log(
      `${makeExpireBooking?.eventDetails.eventName}: Booking expired ${bookingId}`
    );
  }, delay);
};
