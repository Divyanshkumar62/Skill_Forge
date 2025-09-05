"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndAwardBadges = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const notify_1 = require("../utils/notify");
const badges = [
    {
        title: 'First Step',
        condition: (user) => user.completedGoals >= 1,
    },
    {
        title: 'Goal Getter',
        condition: (user) => user.completedGoals >= 5,
    },
    {
        title: 'Milestone Maker',
        condition: (user) => user.completedMilestones >= 5,
    },
    {
        title: 'XP Rookie',
        condition: (user) => user.xp >= 500,
    },
    {
        title: 'XP Champion',
        condition: (user) => user.xp >= 3000,
    },
    // Deadline Destroyer badge would need more logic based on deadline completion (optional later)
];
const checkAndAwardBadges = async (userId) => {
    try {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            console.error('User not found');
            return;
        }
        for (const badge of badges) {
            const alreadyHasBadge = user.badges.some((b) => b.title === badge.title);
            if (!alreadyHasBadge && badge.condition(user)) {
                user.badges.push({ title: badge.title, achievedAt: new Date() });
                await (0, notify_1.createNotification)(user._id, `🏅 You've earned the '${badge.title}' badge! Great work!`, 'achievement');
            }
        }
        await user.save();
    }
    catch (error) {
        console.error('Error checking badges:', error);
    }
};
exports.checkAndAwardBadges = checkAndAwardBadges;
//# sourceMappingURL=badge.service.js.map