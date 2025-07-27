import bcrypt from 'bcryptjs';

const salt = process.env.BCRYPT_SALT_LEVEL || 10;

export const hashPasswordFunction = async (password: string) => {
    return await bcrypt.hashSync(password, 10);
}