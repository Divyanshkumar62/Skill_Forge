import { DailyTask } from "../models/dailyTask.model";
import { checkAndAwardBadges } from "./badge.service";
import { updateStreak } from "./streak.service";
import { awardXP } from "./xp.service";

export const createTask = async (data: string) => {
    return await DailyTask.create(data);
}

export const getTodayTasks = async (userId: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await DailyTask.find({
        user: userId,
        dueDate: { $gte: today, $lt: tomorrow }
    });
}

export const completeTask = async (taskId: string, userId: string) => {
    const task = await DailyTask.findOneAndUpdate( 
        { _id: taskId, user: userId }, 
        { completed: true, completedAt: new Date() }, 
        { new: true } 
    );
    if(!task)
        throw new Error("Task not found or unauthorized")

    await awardXP(userId, 5);
    await updateStreak(userId);
    await checkAndAwardBadges(userId);

    return task;
};

export const deleteTask = async (taskId: string) => {
    return await DailyTask.findByIdAndDelete(taskId);
}
