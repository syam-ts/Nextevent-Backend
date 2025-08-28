import { IOrganizer } from "../../domain/entities/Organizer";
import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";
  
type Body = Pick<IOrganizer, 'name'|'email'|'mobile'|'password'|'organizationName'>;

export class CreateNewOrganizer {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(body: Required<Body>) {
        const { name, email, mobile, password, organizationName } = body;
        return this.organizerRepo.signupOrganizer(
            name,
            email,
            mobile,
            password,
            organizationName
        );
    }
}
