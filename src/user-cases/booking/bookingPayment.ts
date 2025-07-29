import Stripe from "stripe";
import { IBookingRepository } from "../../domain/interfaces/IBookingRepository";

interface IBody {
    guestId: string;
    eventId: string;
    eventName: string;
    isPaid: any;
    street: string;
    city: string;
    zipcode: string;
    numberOfSeats: number;
    total: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-06-30.basil",
});

export class BookingPayment {

    async execute(body: IBody) {
        const {
            eventId,
            eventName,
            isPaid,
            street,
            city,
            zipcode,
            numberOfSeats,
            total,
        } = body;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: eventName,
                        },
                        unit_amount: total * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/guest/payment-success?session_id={CHECKOUT_SESSION_ID}&eventId=${eventId}`,
            cancel_url: `${process.env.FRONTEND_URL}/guest/payment-cancelled`,
            metadata: {
                eventId,
                eventName,
                isPaid,
                street: street,
                city: city,
                zipcode: zipcode,
                numberOfSeats: numberOfSeats.toString(),
                total,
            },
        });

        return { id: session.id };
    }
}
