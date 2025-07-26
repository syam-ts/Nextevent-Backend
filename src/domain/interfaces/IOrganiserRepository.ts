import { IOrganizer } from "../entities/Organizer";

export interface IOrganizerRepository {
    signupOrganizer (
        name: string,
        email: string,
        mobile: number,
        password: string,
        organizationName: string
    ): Promise<void>;

    loginOrganizer (email: string, password: string): Promise<IOrganizer>;

    updateOrganizer (
        organizerId: string,
        name: string,
        mobile: number,
        organizationName: string
    ): Promise<IOrganizer>;
}
