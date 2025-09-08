import { Request, Response, NextFunction } from "express";
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
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map