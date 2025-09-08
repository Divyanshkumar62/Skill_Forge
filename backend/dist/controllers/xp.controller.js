"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.earnXP = exports.getXpStatus = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const xp_service_1 = require("../services/xp.service");
const getXpStatus = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await user_model_1.default.findById(userId).select("xp level");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Calculate XP needed for next level
        const xpToNextLevel = (user.level * 100) - (user.xp % (user.level * 100));
        res.json({
            xp: user.xp,
            level: user.level,
            xpToNextLevel
        });
    }
    catch (error) {
        console.error("Error getting XP status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getXpStatus = getXpStatus;
const earnXP = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { amount } = req.body;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        if (!amount || amount <= 0) {
            res.status(400).json({ message: "Invalid XP amount" });
            return;
        }
        await (0, xp_service_1.awardXP)(userId, amount);
        res.json({ message: "XP awarded successfully" });
    }
    catch (error) {
        console.error("Error awarding XP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.earnXP = earnXP;
//# sourceMappingURL=xp.controller.js.map