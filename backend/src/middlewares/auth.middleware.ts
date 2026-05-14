import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { getJwtSecret } from "../utils/generateToken";

declare global {
  namespace Express {
    interface Request {
      user?: Partial<{
        _id: string;
        name: string;
        email: string;
        xp: number;
        level: number;
        password?: string;
      }>;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    token = req.headers.authorization.split(" ")[1];
    const secret = getJwtSecret();
    const decoded = jwt.verify(token as string, secret) as { userId: string };

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
