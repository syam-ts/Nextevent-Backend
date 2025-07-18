import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { indexRouter } from "./presentation/exress-http/routes";
dotenv.config({
    path: ".env",
});
const app = express();
app.use(cookieParser());

app.use("/", indexRouter);

const port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
