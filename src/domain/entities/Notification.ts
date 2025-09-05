type Role = "organizer" | "guest";

export interface INotification {
  _id: string;
  role: Required<Role>;
  roleId: string;
  entityId: string;
  message: string; 
  markAsRead: boolean;
  createdAt: Date;
}
