import { EventModel } from "../database/Schema/EventSchema";
import { BookingModel } from "../database/Schema/BookingSchema";
import { startSession } from "mongoose";

  async function newBooking(
    guestId: string,
    eventId: string,
    eventName: string,
    isPaid: boolean,
    street: string,
    city: string,
    zipcode: string,
    numberOfSeats: number,
    total: number
  ): Promise<void> {

    const session = await EventModel.startSession();
    session.startTransaction();
    
    try {
      const updatedEvent = await EventModel.findOneAndUpdate(
        { _id: eventId, totalSeats: { $gte: numberOfSeats } },

        {
          $inc: { totalSeats: -numberOfSeats, numberOfBooking: numberOfSeats },
        },
        {
          new: true,
          session,
        }
      );
      if (!updatedEvent) {
        throw new Error("Requested seats not available");
      }
      const newBooking = await new BookingModel({
        guestId,
        eventDetails: { _id: eventId, eventName },
        isPaid,
        street,
        city,
        zipcode,
        numberOfSeats,
        total,
        createdAt: Date.now(),
      }).save({ session });
      if (!newBooking) throw new Error("Could not create new Booking");
      await session.commitTransaction();
      session.endSession();
      return;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } 
