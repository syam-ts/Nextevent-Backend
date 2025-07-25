import { IOrganizerRepository } from "../../domain/interfaces/IOrganiserRepository";

interface IBody {
    name: string;
    email: string;
    mobile: number;
    password: string;
    organizationName: string;
}

export class CreateNewOrganizer {
    constructor(private organizerRepo: IOrganizerRepository) { }

    execute(body: IBody) {
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
