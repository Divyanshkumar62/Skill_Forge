"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awardXP = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const notify_1 = require("../utils/notify");
const calculateLevel = (xp) => {
    if (xp >= 8000)
        return 7;
    if (xp >= 5500)
        return 6;
    if (xp >= 3500)
        return 5;
    if (xp >= 2000)
        return 4;
    if (xp >= 1000)
        return 3;
    if (xp >= 500)
        return 2;
    return 1;
};
const awardXP = async (userId, xpToAdd) => {
    try {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            console.error(`User not found with ID: ${userId}`);
            return;
        }
        // Add XP
        user.xp += xpToAdd;
        // Determine new level based on XP
        const newLevel = calculateLevel(user.xp);
        // Check if level changed
        if (newLevel > user.level) {
            user.level = newLevel;
            await (0, notify_1.createNotification)(user._id, `🎉 Congratulations! You've reached Level ${newLevel}! Keep up the great work!`, "milestone");
        }
        await user.save();
    }
    catch (error) {
        console.error("Error awarding XP:", error);
    }
};
exports.awardXP = awardXP;
//# sourceMappingURL=xp.service.js.map