import { IOrganizer } from "../../domain/entities/Organizer";
import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";
 
type Body = Pick<IOrganizer, 'name'|'mobile'|'organizationName'>;

export class UpdateOrganizer {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(organizerId: string, body: Body) {
        const { name, mobile, organizationName } = body;
        return this.organizerRepo.updateOrganizer(
            organizerId,
            name,
            mobile,
            organizationName
        );
    }
}
