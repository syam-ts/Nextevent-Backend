import Stripe from "stripe";
import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

export class NewBooking {
    constructor(private bookingRepo: IBookingRepository) { }

    async execute(guestId: string, body: any) {
        const { sessionId, eventId } = body;

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: "2025-06-30.basil",
        });

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session.metadata) {
            throw new Error("metadata missing");
        }
        const isPaid = session.metadata?.isPaid === "true";
        const parsedSeats = parseInt(session.metadata.numberOfSeats, 10);
        const total = parseInt(session.metadata.total, 10);

        return this.bookingRepo.newBooking(
            guestId,
            eventId,
            session.metadata!.eventName,
            isPaid,
            session.metadata!.street,
            session.metadata!.city,
            session.metadata!.zipcode,
            parsedSeats,
            total
        );
    }
}
