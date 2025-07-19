import { ClientRepositoryDb } from "../../infrastructure/repositories/clientRepositoryDb";
import { CreateClient } from "../../user-cases/client/CreateClientUsecase";
import { GetAllInvoices } from "../../user-cases/client/GetAllInvoicesUseCase";
import { UpdateClient } from "../../user-cases/client/UpdateClientUseCase";

const clientRepository = new ClientRepositoryDb();
const createClientUseCase = new CreateClient(clientRepository);
const updateClientUseCase = new UpdateClient(clientRepository);
const getAllInvoicesUseCase = new GetAllInvoices(clientRepository);

export class ClientController {
    async createClient(req: any, res: any): Promise<void> {
        try {
            const { userId } = req.user;
            const result = await createClientUseCase.execute(req.body, userId);
            res.status(201).json({ message: "new client created", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }

    async updateClient(req: any, res: any): Promise<void> {
        try {
            const result = await updateClientUseCase.execute(
                req.body,
                req.params.clientId
            );
            res
                .status(201)
                .json({ message: "Cilent updated Succssfully", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }

    async getAllInvoices(req: any, res: any): Promise<void> {
        try {
            const { clientId } = req.params;
            const invoices = await getAllInvoicesUseCase.execute(clientId);
            res
                .status(201)
                .json({ message: "Invoices loaded", invoices, success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }
}
