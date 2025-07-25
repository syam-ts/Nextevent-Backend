import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";

interface IBody {
    organizerId: string;
    name: string;
    mobile: number;
    organizationName: string;
}

export class UpdateOrganizer {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(organizerId: string, body: IBody) {
        const { name, mobile, organizationName } = body;
        return this.organizerRepo.updateOrganizer(
            organizerId,
            name,
            mobile,
            organizationName
        );
    }
}
