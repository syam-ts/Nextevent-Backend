import { IOrganizer } from "../entities/Organizer";
import { INotification } from "../entities/Notification";

export interface IOrganizerRepository {
    signupOrganizer(
        name: string,
        email: string,
        mobile: number,
        password: string,
        organizationName: string
    ): Promise<void>;

    loginOrganizer(
        email: string,
        password: string
    ): Promise<{ notifications: INotification[]; organizer: IOrganizer }>;

    updateOrganizer(
        organizerId: string,
        name: string,
        mobile: number,
        organizationName: string
    ): Promise<IOrganizer>;

    getHomeStats(organizerId: string): Promise<any>;

    markAsReadNotification(notificationId: string): Promise<INotification>
}
