import express, { Express } from "express";
require('module-alias/register');
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { indexRouter } from "./presentation/exress-http/routes";
import { ConnectDB } from "./infrastructure/database/db";
import morgan from "morgan";
import cors from "cors";
// import userRouter from "./presentation/exress-http/__tests__/userRouter";

export class Server {
    private app: Express;
    private port: number;

    constructor() {
        dotenv.config({
            path: ".env",
        }),
            (this.app = express());
        this.port = parseInt(process.env.PORT || "3000");

        this.configureMiddlewares();
        this.configuredRoute();
        this.loggerConfigs();
    }


    public configureMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(
            cors({
                origin: process.env.FRONTEND_URL,
                methods: "GET,POST,PUT,PATCH",
                credentials: true,
            })
        );
    }


    public loggerConfigs(): void {
        this.app.use(morgan("dev"));
    }


    public configuredRoute(): void {
        this.app.use("/api/v1", indexRouter);
        // this.app.use('/api/v1/users', userRouter) // for testing only
    }


    private async connectToDatabase(): Promise<void> {
        await ConnectDB();

        console.log("Database Connected Successfully");
    }


    public start(): void {
        this.app.listen(this.port, async (): Promise<void> => {
            this.connectToDatabase();
            console.log(`Server listening to port ${this.port}`);
        });
    }
}
