import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";

interface IBody {
    email: string;
    password: string;
}

export class LoginOrganizer {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(body: IBody) {
        const { email, password } = body;

        return this.organizerRepo.loginOrganizer(email, password);
    }
}
