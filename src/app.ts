import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { indexRouter } from "./presentation/exress-http/routes";
import { ConnectDB } from "./infrastructure/database/db";
import morgan from "morgan";
import cors from "cors";
dotenv.config({
    path: ".env",
});
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: "GET,POST,PUT,PATCH",
        credentials: true
    })
);
app.use(morgan("dev"));

app.use("/api/v1", indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await ConnectDB();
    console.log("Database Connected Successfully");
    console.log(`Server listening to port ${port}`);
});
