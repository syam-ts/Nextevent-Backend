import bcrypt from 'bcryptjs';

const salt = process.env.BCRYPT_SALT_LEVEL;

export const hashPasswordFunction = async (password: string) => {
    return await bcrypt.hashSync(password, salt);
}