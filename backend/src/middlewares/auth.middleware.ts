import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken"
import User from '../models/user.model'

interface DecodedToken {
    userId: string;
    iat: number;
    exp: number
}

declare global {
    namespace Express {
        interface Request {
            user ?: any;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
          token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
          ) as DecodedToken;

          const user = await User.findById(decoded.userId).select("-password");
          if (!user) res.status(401).json({ message: "Unauthorized access!" });
          
          req.user = user;
          next();
        } catch (err){
            console.error(err)
            res.status(401).json({message: "Not Authorized! Token Failed"})
        }
    }
}