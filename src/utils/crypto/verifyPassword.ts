import bcrypt from "bcryptjs";

export const verifyPassword = (
    checkingPassword: string,
    userPassword: string
): unknown => { 
    if (!bcrypt.compareSync(checkingPassword, userPassword)) {
        throw new Error("Wrong password");
    } else {
        return true;
    }
};
