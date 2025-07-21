import { HttpStatusCode } from "@/helper/constants/statusCodes";
import { InvoiceRepositoryDb } from "../../infrastructure/repositories/invoiceRepositoryDb";
import { ConfirmInvoicePayment } from "../../user-cases/invoice/ConfirmInvoicePaymentUseCase";
import { CreateInvoice } from "../../user-cases/invoice/CreateInvoiceUseCase";
import { GetInvoice } from "../../user-cases/invoice/GetInvoiceUseCase";

const invoiceRepository = new InvoiceRepositoryDb();
const createInvoiceUsecase = new CreateInvoice(invoiceRepository);
const confirmInvoicePaymentUseCaseUsecase = new ConfirmInvoicePayment(
    invoiceRepository
);
const getInvoiceUseCase = new GetInvoice(invoiceRepository);

export class InvoiceController {
    async createInvoice(req: any, res: any): Promise<void> {
        try {
            const result = await createInvoiceUsecase.execute(req.body);

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: "new invoice created", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    }

    async confirmInvoicePayment(req: any, res: any): Promise<void> {
        try {
            const result = await confirmInvoicePaymentUseCaseUsecase.execute(
                req.params.invoiceId
            );

            res
                .status(HttpStatusCode.CREATED)
                .json({ message: "Invoice updated", success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    }

    async getInvoice(req: any, res: any): Promise<void> {
        try {
            const { invoiceId } = req.params;
            const { filter, currentPage } = req.query;
            const invoice = await getInvoiceUseCase.execute(invoiceId);

            res
                .status(HttpStatusCode.OK)
                .json({ message: "Invoice loaded", invoice, success: true });
        } catch (error: unknown) {
            const err = error as { message: string };
            res
                .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
                .json({ message: err.message, success: false });
        }
    }
}
