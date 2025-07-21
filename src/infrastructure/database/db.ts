import { connect } from "mongoose";
import dotenv from "dotenv";

const mongo_uri: string = process.env.MONGO_URI as string;

class ConnectDB {
    private _mongo_uri: string;

    constructor() {
        dotenv.config({}),
      (this._mongo_uri = mongo_uri);
    }

    public async connect(): Promise<void> {
        try {
            await connect(this._mongo_uri);
        } catch (error) {
            console.log("DB ERROR: ", error);
        }
    }
}

export default ConnectDB;
