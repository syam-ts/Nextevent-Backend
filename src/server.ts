import express, { Express } from "express";
require("module-alias/register");
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { indexRouter } from "./presentation/exress-http/routes"; 
import morgan from "morgan";
import cors from "cors";
import ConnectDB from "./infrastructure/database/db";
// import userRouter from "./presentation/exress-http/__tests__/userRouter";

const connectDB = new ConnectDB();

class Server {

    private app: Express;
    private port: number;
    private frontendUrl: string;
    private corsMethods: string[];

    constructor() {

        dotenv.config({
            path: ".env",
        }),
        
        this.app = express();
        this.port = parseInt(process.env.PORT || "3000");
        this.frontendUrl = process.env.FRONTEND_URL as string;
        this.corsMethods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];

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
        this.app.use("/api/v1", indexRouter);
        // this.app.use('/api/v1/users', userRouter) // for testing only
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
