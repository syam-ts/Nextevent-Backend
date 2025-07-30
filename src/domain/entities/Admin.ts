import { IWallet } from "./Wallet";

export interface IAdmin {
    _id?: string;
    userName: string;
    password: String;
    isAuthurized: boolean;
    wallet: IWallet
    createdAt: Date
}
