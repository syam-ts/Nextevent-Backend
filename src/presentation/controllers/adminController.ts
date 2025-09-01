import { Request, Response } from "express";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";
import { AdminRepositoryDb } from "../../infrastructure/repositories/adminRepositoryDb";
import { GetAllEvents } from "../../user-cases/admin/getAllEvents";
import { GetAllGuests } from "../../user-cases/admin/getAllGuests";
import { GetAllOrganizers } from "../../user-cases/admin/getAllOrganizers";
import { HttpStatusCode } from "../../utils/constants/statusCodes";
import generateToken from "../../lib/jwt/generateToken";
import { LoginAdmin } from "../../user-cases/admin/loginAdmin";
import { BlockOrganizer } from "../../user-cases/admin/blockOrganizer";
import { UnBlockOrganizer } from "../../user-cases/admin/unBlockOrganizer";

export class AdminController {
  private adminRepo: IAdminRepository;
  public loginAdminUsecase: LoginAdmin;
  public getAllOrganizersUsecase: GetAllOrganizers;
  public getAllGuestsUsecase: GetAllGuests;
  public getAllEventsUsecase: GetAllEvents;
  public blockOrganizerUsecase: BlockOrganizer;
  public unBlockOrganizerUsecase: UnBlockOrganizer;

  constructor() {
    this.adminRepo = new AdminRepositoryDb();
    this.loginAdminUsecase = new LoginAdmin(this.adminRepo);
    this.getAllOrganizersUsecase = new GetAllOrganizers(this.adminRepo);
    this.getAllGuestsUsecase = new GetAllGuests(this.adminRepo);
    this.getAllEventsUsecase = new GetAllEvents(this.adminRepo);
    this.blockOrganizerUsecase = new BlockOrganizer(this.adminRepo);
    this.unBlockOrganizerUsecase = new UnBlockOrganizer(this.adminRepo);
  }

  loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
      const admin = await this.loginAdminUsecase.execute(req.body);
      const { accessToken, refreshToken } = generateToken(admin._id, "admin");

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(HttpStatusCode.OK).json({
        message: "Loggedin Successfull",
        admin,
        accessToken,
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  };

  getAllOrganizers = async (req: Request, res: Response) => {
    try {
      const { currentPage, filter } = req.query;
      const result = await this.getAllOrganizersUsecase.execute(
        Number(currentPage),
        String(filter)
      );

      res.status(HttpStatusCode.OK).json({
        organizers: result.organizers,
        totalPages: result.totalPages,
        message: "Loaded all organizes",
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  };

  getAllGuests = async (req: Request, res: Response) => {
    try {
      const guests = await this.getAllGuestsUsecase.execute();

      res.status(HttpStatusCode.OK).json({
        guests,
        message: "Loaded all guests",
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  };

  getAllEvents = async (req: Request, res: Response) => {
    try {
      const events = await this.getAllEventsUsecase.execute();

      res.status(HttpStatusCode.OK).json({
        events,
        message: "Loaded all events",
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  };

  blockOrganizer = async (req: Request, res: Response) => {
    try {
      const { organizerId } = req.params;
      const reuslt = await this.blockOrganizerUsecase.execute(organizerId);

      res.status(HttpStatusCode.CREATED).json({
        message: "Organizer blocked",
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  };

  unBlockOrganizer = async (req: Request, res: Response) => {
    try {
      const { organizerId } = req.params;
      const reuslt = await this.unBlockOrganizerUsecase.execute(organizerId);

      res.status(HttpStatusCode.CREATED).json({
        message: "Organizer unblocked",
        success: true,
      });
    } catch (error: unknown) {
      const err = error as { message: string };
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: err.message, success: false });
    }
  };
}
