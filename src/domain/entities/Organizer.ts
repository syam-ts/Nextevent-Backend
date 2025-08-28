
export interface IOrganizer {
    _id: string;
    name: string,
    email: string
    mobile: number,
    password: string
    role: "organizer",
    organizationName: string,
    totalEventsCreated: number,
    createdAt: Date
}