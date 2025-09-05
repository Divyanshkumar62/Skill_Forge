"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXpSummary = exports.getHeatmapData = exports.getWeeklyActivity = void 0;
const activity_model_1 = require("../models/activity.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const getWeeklyActivity = async (req, res) => {
    const userId = req.user._id;
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
};
exports.getWeeklyActivity = getWeeklyActivity;
const getHeatmapData = async (req, res) => {
    const userId = req.user._id;
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
};
exports.getHeatmapData = getHeatmapData;
const getXpSummary = async (req, res) => {
    const user = await user_model_1.default.findById(req.user._id).select("xp level");
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json({
        xp: user.xp,
        level: user.level,
        nextLevelXp: (user.level + 1) * 100,
    });
};
exports.getXpSummary = getXpSummary;
//# sourceMappingURL=analytics.controller.js.map