import { IAdmin } from "../../domain/entities/Admin";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";

type Body = Pick<IAdmin, "userName" | "password">;

export class LoginAdmin {
  constructor(private adminRepo: IAdminRepository) { }

  execute(body: Required<Body>) {
    const { userName, password } = body;
    return this.adminRepo.loginAdmin(userName, password);
  }
}
