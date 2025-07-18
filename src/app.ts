import express from "express";
import dotenv from 'dotenv'
dotenv.config({
    path: '.env'
})
const app = express();

const port = process.env.PORT as string;

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
