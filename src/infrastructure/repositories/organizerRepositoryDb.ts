import { IOrganizer } from "../../domain/entities/Organizer";
import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";
import { hashPasswordFunction } from "../../utils/crypto/hashPassword";
import { verifyPassword } from "../../utils/crypto/verifyPassword";
import { OrganizerModel } from "../database/Schema/organizerSchema";

export class OrganizerRepositoryDb implements IOrganizerRepository {
  async signupOrganizer(
    name: string,
    email: string,
    mobile: number,
    password: string,
    organizationName: string
  ): Promise<void> {
    const hashedPassword = await hashPasswordFunction(password);

    const newOrganizer = await new OrganizerModel({
      name,
      email,
      mobile,
      password: hashedPassword,
      organizationName,
      createdAt: Date.now(),
    }).save();

    if (!newOrganizer) throw new Error("Organizer didnt created!");

    return;
  }

  async loginOrganizer(email: string, password: string): Promise<IOrganizer> {
    const organizer = await OrganizerModel.findOne({
      email,
    }).lean<IOrganizer>();
    if (!organizer) throw new Error("User not found");

    const verifyPass = verifyPassword(password, organizer.password);
    if (!verifyPass) throw new Error("Wrong Password!");
    return organizer;
  }

  async updateOrganizer(
    organizerId: string,
    name: string,
    mobile: number,
    organizationName: string
  ): Promise<IOrganizer> {
    const updateOrganizer = await OrganizerModel.findByIdAndUpdate(
      organizerId,
      {
        $set: {
          name,
          mobile,
          organizationName,
        },
      },
      {
        new: true,
      }
    ).lean<IOrganizer>();

    if (!updateOrganizer) throw new Error("updation failed!");
    return updateOrganizer;
  }
}
