import { connect } from "mongoose";
import dotenv from "dotenv"; 
import { createTestAdmin } from "../../helper/createTestAdmin";

interface IConnectDB {
    connect(): void
}

class ConnectDB implements IConnectDB {
    private _mongo_uri: string;

    constructor() {
        dotenv.config({}), (this._mongo_uri = process.env.MONGO_URI as string);
    }

    public async connect(): Promise<void> {
        try {
            await connect(this._mongo_uri);

            //createTestAdmin();
        } catch (error) {
            console.log("DB ERROR: ", error);
        }
    }
}

export default ConnectDB;