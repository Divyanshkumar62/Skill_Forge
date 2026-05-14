import jwt from "jsonwebtoken";

const getJwtSecret = (): string => {
  const secret = process.env['JWT_SECRET'];
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required. Please set it in your .env file.");
  }
  if (secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters for proper security.");
  }
  return secret;
};

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: "7d",
  });
};

export default generateToken;
export { getJwtSecret };
 