import { Request, Response } from "express";
import { BookingRepositoryDb } from "../../infrastructure/repositories/bookingRepositoryDb";
import { NewBooking } from "../../user-cases/booking/newBooking";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { CancelBooking } from "../../user-cases/booking/cancelBooking";

export class BookingController {
    public bookingRepo: BookingRepositoryDb;
    public newBookingUsecase: NewBooking;
    public cancelBookingUsecase: CancelBooking;
    
    constructor() {

        this.bookingRepo = new BookingRepositoryDb();
        this.newBookingUsecase = new NewBooking(this.bookingRepo);
        this.cancelBookingUsecase = new CancelBooking(this.bookingRepo);
    }
    newBooking = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("organizer id is missing");
            const result = await this.newBookingUsecase.execute(
                req.user._id,
                req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "New Booking created",
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    cancelBooking = async (req: Request, res: Response): Promise<void> => {
        try { 
            const result = await this.cancelBookingUsecase.execute( 
                req.params.bookingId
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "New Booking created",
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };
}
