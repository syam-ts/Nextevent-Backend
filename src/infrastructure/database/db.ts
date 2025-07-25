import { connect } from "mongoose";
import dotenv from "dotenv";


class ConnectDB {
    private _mongo_uri: string;

    constructor() {
        dotenv.config({}),
            this._mongo_uri = process.env.MONGO_URI as string;
    }

    public async connect(): Promise<void> {
        console.log("DB URI: ", this._mongo_uri);
        try {
            await connect(this._mongo_uri);
        } catch (error) {
            console.log("DB ERROR: ", error);
        }
    }
}

export default ConnectDB;
