import { InvoiceRepositoryDb } from "../../infrastructure/repositories/invoiceRepositoryDb";
import { CreateInvoice } from "../../user-cases/invoice/CreateInvoiceUseCase";

const invoiceRepository = new InvoiceRepositoryDb();
const createInvoiceUsecase = new CreateInvoice(invoiceRepository);

export class InvoiceController {
    async createInvoice(req: any, res: any): Promise<void> {
        try {
            const result = await createInvoiceUsecase.execute(req.body);

            res.status(201).json({ message: "new invoice created", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(501).json({ message: err.message, success: false });
        }
    }
}
