import { Request, Response } from "express";
import { BookingRepositoryDb } from "../../infrastructure/repositories/bookingRepositoryDb";
import { NewBooking } from "../../user-cases/booking/newBooking";
import { HttpStatusCode } from "../../helper/constants/statusCodes";
import { CancelBooking } from "../../user-cases/booking/cancelBooking";
import { BookingPayment } from "../../user-cases/booking/bookingPayment";
import { GetMyBookings } from "../../user-cases/booking/getMyBookings";
import { ViewBooking } from "../../user-cases/booking/viewBooking";
import { FreeBooking } from "../../user-cases/booking/freeBooking";

export class BookingController {
    public bookingRepo: BookingRepositoryDb;
    public bookingPaymentUsecase: BookingPayment;
    public newBookingUsecase: NewBooking;
    public freeBookingUsecase: FreeBooking;
    public getMyBookingsUsecase: GetMyBookings;
    public viewBookingUsecase: ViewBooking;
    public cancelBookingUsecase: CancelBooking;

    constructor() {
        this.bookingRepo = new BookingRepositoryDb();
        this.bookingPaymentUsecase = new BookingPayment();
        this.newBookingUsecase = new NewBooking(this.bookingRepo);
        this.freeBookingUsecase = new FreeBooking(this.bookingRepo);
        this.getMyBookingsUsecase = new GetMyBookings(this.bookingRepo);
        this.viewBookingUsecase = new ViewBooking(this.bookingRepo);
        this.cancelBookingUsecase = new CancelBooking(this.bookingRepo);
    }
    bookingPayment = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("guest id is missing");
            const result = await this.bookingPaymentUsecase.execute(req.body);

            res.status(HttpStatusCode.CREATED).json({
                result,
                message: "Payment Done ",
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    newBooking = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("guest id is missing");
            const result = await this.newBookingUsecase.execute(
                req.user._id,
                req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "New Paid Booking created",
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    freeBooking = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("guest id is missing");
            const result = await this.freeBookingUsecase.execute(
                req.user._id,
                req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: "New Free Booking created",
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    getMyBookings = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.user?._id) throw new Error("guest id is missing");
            const bookings = await this.getMyBookingsUsecase.execute(req.user._id);

            res.status(HttpStatusCode.OK).json({
                message: "Bookings loaded successfully",
                bookings,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    };

    viewBooking = async (req: Request, res: Response): Promise<void> => {
        try {
            const booking = await this.viewBookingUsecase.execute(
                req.params.bookingId
            );

            res.status(HttpStatusCode.OK).json({
                message: "Booking loaded successfully",
                booking,
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
