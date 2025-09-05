"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protect = async (req, res, next) => {
    let token;
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env["JWT_SECRET"]);
        const user = await user_model_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.middleware.js.map