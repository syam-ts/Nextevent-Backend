import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";

export class OrganizationRepositoryDb implements IOrganizerRepository {
    async signupOrganizer(
        name: string,
        email: string,
        mobile: number,
        password: string,
        organizationName: string
    ): Promise<any> {
        // const newOrganizer = await
    }

    async loginOrganizer(email: string, password: string): Promise<any> { }
}
