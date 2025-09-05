import bcrypt from "bcryptjs";

const salt: number = Number(process.env.BCRYPT_SALT_LEVEL) || 10;

export const hashPasswordFunction = async (
    password: string
): Promise<string> => {
    return await bcrypt.hashSync(password, salt);
};
