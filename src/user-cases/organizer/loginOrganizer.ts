import { IOrganizer } from "../../domain/entities/Organizer";
import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";
 
type Body = Pick<IOrganizer, "email" | "password">;

export class LoginOrganizer {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(body: Body) {
        const { email, password } = body;

        return this.organizerRepo.loginOrganizer(email, password);
    }
}
