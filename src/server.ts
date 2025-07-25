import express, { Express, Router } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import ConnectDB from "./infrastructure/database/db";
import GuestRoute from "./presentation/exress-http/routes/guestRoute";
import OrganizerRoute from "./presentation/exress-http/routes/organizerRoute";
import EventRoute from "./presentation/exress-http/routes/eventRoute";

const connectDB = new ConnectDB();

class Server {
    private app: Express;
    private port: number;
    private frontendUrl: string;
    private corsMethods: string[];
    private guestRoute: GuestRoute;
    private organizerRoute: OrganizerRoute;
    private eventRoute: EventRoute;

    constructor() {
        dotenv.config({
            path: ".env",
        }),
            (this.app = express());
        this.port = parseInt(process.env.PORT || "3000");
        this.frontendUrl = process.env.FRONTEND_URL as string;
        this.corsMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
        this.guestRoute = new GuestRoute();
        this.organizerRoute = new OrganizerRoute();
        this.eventRoute = new EventRoute();

        this.configureMiddlewares();
        this.configuredRoute();
        this.loggerConfigs();
    }

    public configureMiddlewares(): void {
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
        this.app.use(morgan("dev"));
    }

    private configuredRoute(): void {
        this.app.use("/api/guest", this.guestRoute.router);
        this.app.use("/api/organizer", this.organizerRoute.router);
        this.app.use("/api/event", this.eventRoute.router);
    }

    private async connectToDatabase(): Promise<void> {
        await connectDB.connect();

        console.log("Database Connected Successfully");
    }

    public start(): void {
        this.app.listen(this.port, async (): Promise<void> => {
            this.connectToDatabase();
            console.log(
                `Server listening to port ${this.port
                } on ${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} `
            );
        });
    }
}

export default Server;
