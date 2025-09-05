"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStreak = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const updateStreak = async (userId) => {
    const user = await user_model_1.default.findById(userId);
    if (!user)
        return;
    const today = new Date();
    const last = user.lastActivityDate ? new Date(user.lastActivityDate) : null;
    const isSameDay = last && today.toDateString() === last.toDateString();
    const isYesterday = last && new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toDateString() === last.toDateString();
    if (isSameDay)
        return;
    if (isYesterday) {
        user.currentStreak += 1;
    }
    else {
        user.currentStreak = 1;
    }
    if (user.currentStreak > user.longestStreak) {
        user.longestStreak = user.currentStreak;
    }
    user.lastActivityDate = today;
    await user.save();
};
exports.updateStreak = updateStreak;
//# sourceMappingURL=streak.service.js.map