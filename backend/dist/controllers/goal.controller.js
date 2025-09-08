"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.completeGoal = exports.getGoals = exports.createGoal = void 0;
const goal_model_1 = __importDefault(require("../models/goal.model"));
const xp_service_1 = require("../services/xp.service");
const badge_service_1 = require("../services/badge.service");
const streak_service_1 = require("../services/streak.service");
const activity_service_1 = require("../services/activity.service");
const calculateProgress = (milestones) => {
    if (milestones.length === 0)
        return 0;
    const completed = milestones.filter(m => m.completed).length;
    return Math.round((completed / milestones.length) * 100);
};
const createGoal = async (req, res) => {
    const { title, description, milestones, dueDate } = req.body;
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const progress = calculateProgress(milestones);
        const status = progress === 100 ? "completed" : progress > 0 ? "in-progress" : "pending";
        const goal = await goal_model_1.default.create({
            title,
            description,
            milestones,
            progress,
            status,
            dueDate,
            owner: userId
        });
        res.status(201).json(goal);
        await (0, badge_service_1.checkAndAwardBadges)(userId);
        await (0, activity_service_1.logActivity)(userId, "goal_created", `Created goal "${goal.title}"`, {
            goalId: goal._id,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error!" });
    }
};
exports.createGoal = createGoal;
const getGoals = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const goals = await goal_model_1.default.find({ owner: userId });
        res.status(200).json(goals);
    }
    catch (error) {
        console.error("Error getting goals:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getGoals = getGoals;
const completeGoal = async (req, res) => {
    const { goalId } = req.params;
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const goal = await goal_model_1.default.findById(goalId);
        if (!goal) {
            res.status(404).json({ message: "Goal not found" });
            return;
        }
        // Verify the goal belongs to the user
        if (goal.owner.toString() !== userId) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        // Check if all milestones are completed
        const allCompleted = goal.milestones.every((milestone) => milestone.completed);
        if (!allCompleted) {
            res.status(400).json({ message: "Not all milestones completed yet" });
            return;
        }
        if (goal.status === "completed") {
            res.status(400).json({ message: "Goal is already completed" });
            return;
        }
        goal.status = "completed";
        goal.progress = 100;
        await goal.save();
        await (0, xp_service_1.awardXP)(userId, 100);
        // Award extra XP if completed before due date
        if (new Date(Number(goal.dueDate)) > new Date()) {
            await (0, xp_service_1.awardXP)(userId, 10);
        }
        // Award bonus XP if goal had many milestones
        if (goal.milestones.length > 5) {
            await (0, xp_service_1.awardXP)(userId, 30);
        }
        await (0, streak_service_1.updateStreak)(userId);
        await (0, badge_service_1.checkAndAwardBadges)(userId);
        res.status(200).json({ message: "Goal completed successfully", goal });
    }
    catch (err) {
        console.error("Error completing goal:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.completeGoal = completeGoal;
const updateGoal = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        let goal = await goal_model_1.default.findOne({ _id: req.params['id'], owner: userId });
        if (!goal) {
            res.status(404).json({ message: "Goal not found!" });
        }
        else {
            const updateGoalData = req.body;
            if (updateGoalData.milestones) {
                goal.milestones = updateGoalData.milestones;
                goal.progress = calculateProgress(updateGoalData.milestones);
                goal.status = goal.progress === 100 ? "completed" : goal.progress > 0 ? "in-progress" : "pending";
            }
            goal.set(updateGoalData);
            await goal.save();
            res.status(200).json(goal);
        }
    }
    catch (error) {
        console.error("Error updating goal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateGoal = updateGoal;
const deleteGoal = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const goal = await goal_model_1.default.findOneAndDelete({ _id: req.params['id'], owner: userId });
        if (goal)
            res.status(200).json({ message: "Goal Deleted!" });
        else
            res.status(404).json({ message: "Goal not found!" });
    }
    catch (err) {
        console.error("Error deleting goal:", err);
        res.status(500).json({ message: "Internal server error!" });
    }
};
exports.deleteGoal = deleteGoal;
//# sourceMappingURL=goal.controller.js.map