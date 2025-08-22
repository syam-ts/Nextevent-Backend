type Role = "organizer" | "guest";

export interface INotification {
  _id: string;
  role: Required<Role>;
  message: string;
  entityId: string;
  createdAt: Date;
}
