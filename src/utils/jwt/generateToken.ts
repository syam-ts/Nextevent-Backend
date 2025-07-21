import jwt from "jsonwebtoken";

 

const generateToken = (userId: string) => {

    if (!userId) throw new Error("User ID missing in generateTokens");
    const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;

    const accessToken = jwt.sign(
        {
            userId,
        },
        ACCESS_TOKEN_SECRET,
        {
            expiresIn: "1m",
        }
    );

    const REFRESH_TOKEN_SECRET: string = process.env
        .REFRESH_TOKEN_SECRET as string;

    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

export default generateToken;
