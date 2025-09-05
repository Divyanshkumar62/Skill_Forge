"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.completeTask = exports.getTodayTasks = exports.createTask = void 0;
const dailyTask_model_1 = require("../models/dailyTask.model");
const badge_service_1 = require("./badge.service");
const streak_service_1 = require("./streak.service");
const xp_service_1 = require("./xp.service");
const createTask = async (data) => {
    return await dailyTask_model_1.DailyTask.create(data);
};
exports.createTask = createTask;
const getTodayTasks = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return await dailyTask_model_1.DailyTask.find({
        user: userId,
        dueDate: { $gte: today, $lt: tomorrow }
    });
};
exports.getTodayTasks = getTodayTasks;
const completeTask = async (taskId, userId) => {
    const task = await dailyTask_model_1.DailyTask.findOneAndUpdate({ _id: taskId, user: userId }, { completed: true, completedAt: new Date() }, { new: true });
    if (!task)
        throw new Error("Task not found or unauthorized");
    await (0, xp_service_1.awardXP)(userId, 5);
    await (0, streak_service_1.updateStreak)(userId);
    await (0, badge_service_1.checkAndAwardBadges)(userId);
    return task;
};
exports.completeTask = completeTask;
const deleteTask = async (taskId) => {
    return await dailyTask_model_1.DailyTask.findByIdAndDelete(taskId);
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=dailyTask.service.js.map