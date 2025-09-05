import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";

export class MarkAsReadNotificationOrg {
  constructor(private organizerRepo: IOrganizerRepository) { }

  execute(notificationId: string) {
    return this.organizerRepo.markAsReadNotification(notificationId);
  }
}
