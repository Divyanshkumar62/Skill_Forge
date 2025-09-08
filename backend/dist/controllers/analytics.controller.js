"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXpSummary = exports.getHeatmapData = exports.getSkillTree = exports.getAnalyticsOverview = exports.getWeeklyActivity = void 0;
const activity_model_1 = require("../models/activity.model");
const goal_model_1 = __importDefault(require("../models/goal.model"));
const habit_model_1 = require("../models/habit.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const getWeeklyActivity = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const start = new Date();
        start.setDate(start.getDate() - 6);
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const activities = await activity_model_1.Activity.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const result = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date(start);
            date.setDate(date.getDate() + i);
            const key = date.toISOString().slice(0, 10);
            result[key] = 0;
        }
        activities.forEach((item) => {
            result[item._id] = item.count;
        });
        res.json(result);
    }
    catch (error) {
        console.error("Error getting weekly activity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getWeeklyActivity = getWeeklyActivity;
// Phase 7: Analytics & Progress Reporting
const getAnalyticsOverview = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Get user data
        const user = await user_model_1.default.findById(userId).select("xp level");
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        // Get recent activity for streak calculation
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        const recentActivities = await activity_model_1.Activity.find({
            user: userId,
            createdAt: { $gte: last30Days }
        }).sort({ createdAt: -1 });
        // Calculate consistency score (days with activity in last 30 days)
        const activityDays = new Set();
        recentActivities.forEach(activity => {
            const dateStr = activity.createdAt.toISOString().slice(0, 10);
            activityDays.add(dateStr);
        });
        const consistencyScore = Math.round((activityDays.size / 30) * 100);
        // Calculate current longest streak
        let currentStreak = 0;
        let longestStreak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Simple streak calculation - could be enhanced
        for (let i = 0; i < 30; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const dateStr = checkDate.toISOString().slice(0, 10);
            if (activityDays.has(dateStr)) {
                currentStreak++;
                longestStreak = Math.max(longestStreak, currentStreak);
            }
            else {
                currentStreak = 0;
            }
        }
        // Get weekly XP data
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - 7);
        startOfWeek.setHours(0, 0, 0, 0);
        const weeklyActivities = await activity_model_1.Activity.find({
            user: userId,
            createdAt: { $gte: startOfWeek }
        });
        // Aggregate XP by day for the week
        const xpByDay = {};
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(date.getDate() + i);
            const key = date.toISOString().slice(0, 10);
            xpByDay[key] = 0;
        }
        weeklyActivities.forEach(activity => {
            const dateStr = activity.createdAt.toISOString().slice(0, 10);
            xpByDay[dateStr] = (xpByDay[dateStr] || 0) + 1; // Simplified - assume 1 XP per activity
        });
        const response = {
            overview: {
                totalXp: user.xp,
                currentLevel: user.level,
                nextLevelXp: (user.level + 1) * 100,
                consistencyScore,
                currentStreak,
                longestStreak
            },
            weeklyXp: xpByDay
        };
        res.json(response);
    }
    catch (error) {
        console.error("Error getting analytics overview:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAnalyticsOverview = getAnalyticsOverview;
const getSkillTree = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Get all user habits for "skills" data
        const habits = await habit_model_1.Habit.find({ user: userId });
        const goals = await goal_model_1.default.find({ owner: userId });
        // Calculate skill axes based on activity types
        const skillAxes = {
            productivity: { name: "Productivity", points: 0, maxPoints: 1000 },
            discipline: { name: "Discipline", points: 0, maxPoints: 1000 },
            learning: { name: "Learning", points: 0, maxPoints: 1000 },
            health: { name: "Health", points: 0, maxPoints: 1000 }
        };
        // Calculate points based on habit streaks and goal completion
        habits.forEach((habit) => {
            const streakPoints = (habit.streakCount || 0) * 10;
            const frequencyPoints = habit.frequency === 'daily' ? 50 : 25;
            const title = habit.title.toLowerCase();
            if (title.includes('health') || title.includes('exercise') || title.includes('fitness')) {
                skillAxes.health.points += streakPoints + frequencyPoints;
            }
            else if (title.includes('read') || title.includes('learn') || title.includes('study')) {
                skillAxes.learning.points += streakPoints + frequencyPoints;
            }
            else {
                skillAxes.productivity.points += streakPoints + frequencyPoints;
            }
            skillAxes.discipline.points += streakPoints;
        });
        // Reward goal completion - use constant values
        goals.forEach((goal) => {
            if (goal.status === 'completed') {
                skillAxes.productivity.points += 50;
                skillAxes.discipline.points += 30;
            }
        });
        // Also get recent activity counts
        const startOfMonth = new Date();
        startOfMonth.setDate(1); // First day of current month
        const monthlyActivities = await activity_model_1.Activity.find({
            user: userId,
            createdAt: { $gte: startOfMonth }
        });
        const response = {
            skillTree: {
                axes: skillAxes,
                monthlyActivityCount: monthlyActivities.length,
                currentLevel: Math.floor(Object.values(skillAxes).reduce((acc, axis) => acc + axis.points, 0) / 100)
            }
        };
        res.json(response);
    }
    catch (error) {
        console.error("Error getting skill tree:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSkillTree = getSkillTree;
const getHeatmapData = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const pastMonth = new Date();
        pastMonth.setDate(pastMonth.getDate() - 30);
        const activities = await activity_model_1.Activity.aggregate([
            {
                $match: {
                    user: userId,
                    createdAt: { $gte: pastMonth },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
        ]);
        res.json(activities);
    }
    catch (error) {
        console.error("Error getting heatmap data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getHeatmapData = getHeatmapData;
const getXpSummary = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await user_model_1.default.findById(userId).select("xp level");
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({
            xp: user.xp,
            level: user.level,
            nextLevelXp: (user.level + 1) * 100,
        });
    }
    catch (error) {
        console.error("Error getting XP summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getXpSummary = getXpSummary;
//# sourceMappingURL=analytics.controller.js.map