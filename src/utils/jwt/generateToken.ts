import jwt from "jsonwebtoken";

 

const generateToken = (userId: string) => {

    if (!userId) throw new Error("User ID missing in generateTokens");
    const accessToken_SECRET: string = process.env.accessToken_SECRET as string;

    const accessToken = jwt.sign(
        {
            userId,
        },
        accessToken_SECRET,
        {
            expiresIn: "1m",
        }
    );

    const refreshToken_SECRET: string = process.env
        .refreshToken_SECRET as string;

    const refreshToken = jwt.sign({ userId }, refreshToken_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

export default generateToken;
