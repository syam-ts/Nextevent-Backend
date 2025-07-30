import { IAdmin } from "../../domain/entities/Admin";
import { AdminModel } from "../../infrastructure/database/Schema/AdminSchema";

export const createTestAdmin = async (): Promise<IAdmin> => {
    return await AdminModel.create({
        userName: "nexteventAdmin",
        password: "admin123",
        wallet: {
            balance: 0,
            transactions: [],
        },
        isAuthorized: true,
    });
};