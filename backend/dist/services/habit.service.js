"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeHabit = exports.deleteHabit = exports.updateHabit = exports.getHabits = exports.createHabit = void 0;
const habit_model_1 = require("../models/habit.model");
const streak_service_1 = require("../services/streak.service");
const xp_service_1 = require("../services/xp.service");
const createHabit = async (userId, data) => {
    return await habit_model_1.Habit.create({ ...data, user: userId });
};
exports.createHabit = createHabit;
const getHabits = async (userId) => {
    return await habit_model_1.Habit.find({ user: userId });
};
exports.getHabits = getHabits;
const updateHabit = async (habitId, userId, data) => {
    return await habit_model_1.Habit.findOneAndUpdate({ _id: habitId, user: userId }, data, {
        new: true,
    });
};
exports.updateHabit = updateHabit;
const deleteHabit = async (habitId, userId) => {
    return await habit_model_1.Habit.findOneAndDelete({ _id: habitId, user: userId });
};
exports.deleteHabit = deleteHabit;
const completeHabit = async (habitId, userId) => {
    const today = new Date().toDateString();
    const habit = await habit_model_1.Habit.findOne({ _id: habitId, user: userId });
    if (!habit) {
        throw new Error("Habit not found or unauthorized");
    }
    const alreadyCompleted = habit.completedDates.some((date) => new Date(date).toDateString() === today);
    if (alreadyCompleted) {
        throw new Error("Habit already completed today");
    }
    habit.completedDates.push(new Date());
    await habit.save();
    await (0, xp_service_1.awardXP)(userId, 10);
    await (0, streak_service_1.updateStreak)(userId);
    return habit;
};
exports.completeHabit = completeHabit;
//# sourceMappingURL=habit.service.js.map