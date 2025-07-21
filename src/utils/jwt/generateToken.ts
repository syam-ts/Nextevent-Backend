import jwt from "jsonwebtoken";

const accessToken_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;

const refreshToken_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;

const generateToken = (userId: string) => {
  if (!userId) throw new Error("User ID missing in generateTokens");

  const accessToken = jwt.sign(
    {
      userId,
    },
    accessToken_SECRET,
    {
      expiresIn: "1m",
    }
  );

  const refreshToken = jwt.sign({ userId }, refreshToken_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export default generateToken;
