import cors from "cors";
import dayjs from "dayjs";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import ConnectDB from "./infrastructure/database/db";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import GuestRoute from "./presentation/exress-http/routes/guestRoute";
import OrganizerRoute from "./presentation/exress-http/routes/organizerRoute";
import EventRoute from "./presentation/exress-http/routes/eventRoute";
import BookingRoute from "./presentation/exress-http/routes/bookingRoute";

interface IServer {
    connectDB: ConnectDB;
    configureMiddlewares: () => void;
    loggerConfigs: () => void;
    start: () => void;
}

class Server implements IServer {
    private app: Express;
    private port: number;
    private apiLimiter: RateLimitRequestHandler;
    private env: string;
    private frontendUrl: string;
    private corsMethods: string[];
    private guestRoute: GuestRoute;
    private organizerRoute: OrganizerRoute;
    private eventRoute: EventRoute;
    private bookingRoute: BookingRoute;
    public connectDB: ConnectDB;

    constructor() {
        dotenv.config({
            path: ".env",
        }),
            (this.app = express());
        this.port = parseInt(process.env.PORT || "3001");
        this.apiLimiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
            standardHeaders: "draft-8",
            legacyHeaders: false,
            message:
                "Too many requests from this IP, please try again after 5 minutes",
        });
        this.env = process.env.NODE_ENV as string;
        this.frontendUrl = process.env.FRONTEND_URL as string;
        this.corsMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
        this.guestRoute = new GuestRoute();
        this.organizerRoute = new OrganizerRoute();
        this.eventRoute = new EventRoute();
        this.bookingRoute = new BookingRoute();
        this.connectDB = new ConnectDB();
        this.executeMethods();
    }

    private executeMethods(): void {
        this.env === "development" && this.loggerConfigs();
        this.configureMiddlewares();
        this.configuredRoute();
    }

    public configureMiddlewares(): void {
        this.app.use(this.apiLimiter);
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(
            cors({
                origin: this.frontendUrl,
                methods: this.corsMethods,
                credentials: true,
            })
        );
    }

    public loggerConfigs(): void {
        this.app.use(morgan(":method :url :status - :response-time ms"));
    }

    private configuredRoute(): void {
        this.app.use("/api/guest", this.guestRoute.router);
        this.app.use("/api/organizer", this.organizerRoute.router);
        this.app.use("/api/event", this.eventRoute.router);
        this.app.use("/api/booking", this.bookingRoute.router);
    }

    private async connectToDatabase(): Promise<void> {
        await this, this.connectDB.connect();

        console.log("Database Connected Successfully");
    }

    public start(): void {
        this.app.listen(this.port, async (): Promise<void> => {
            this.connectToDatabase();
            console.log(
                `Server listening to port ${this.port} on ${dayjs(Date.now()).format(
                    "dddd MMMM YYYY : H mm a"
                )} `
            );
        });
    }
}

export default Server;
