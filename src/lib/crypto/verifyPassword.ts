import bcrypt from "bcryptjs";

export const verifyPassword = <T extends string>(
    checkingPassword: T,
    userPassword: T
): boolean => {
    if (!bcrypt.compareSync(checkingPassword, userPassword)) {
        throw new Error("Wrong password");
    } else {
        return true;
    }
};
