import { ClientRepositoryDb } from "../../infrastructure/repositories/clientRepositoryDb";
import { createClient } from "../../user-cases/client/CreateClientUsecase";

const clientRepository = new ClientRepositoryDb();
const createClientUseCase = new createClient(clientRepository);

export class ClientController {
    async createClient(req: any, res: any): Promise<void> {
        try {
            const result = await createClientUseCase.execute(req.body);
            res.status(201).json({ message: "new user created", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }
}
