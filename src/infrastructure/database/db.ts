import { connect } from "mongoose";
require("dotenv").config();

const mongo_uri = process.env.MONGO_URI as string; 

export const ConnectDB = async () => {
    try {
        await connect(mongo_uri);
    } catch (error) {
        console.log("DB ERROR: ", error);
    }
};
