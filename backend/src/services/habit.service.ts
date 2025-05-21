import { Habit } from "../models/habit.model";
import { updateStreak } from "../services/streak.service";
import { awardXP } from "../services/xp.service";
export const createHabit = async (userId: string, data: any) => {
  return await Habit.create({ ...data, user: userId });
};

export const getHabits = async (userId: string) => {
  return await Habit.find({ user: userId });
};

export const updateHabit = async (
  habitId: string,
  userId: string,
  data: any
) => {
  return await Habit.findOneAndUpdate({ _id: habitId, user: userId }, data, {
    new: true,
  });
};

export const deleteHabit = async (habitId: string, userId: string) => {
  return await Habit.findOneAndDelete({ _id: habitId, user: userId });
};


export const completeHabit = async (habitId: string, userId: string) => {
  const today = new Date().toDateString();

  const habit = await Habit.findOne({ _id: habitId, user: userId });
  if (!habit) {
    throw new Error("Habit not found or unauthorized");
  }

  const alreadyCompleted = habit.completedDates.some(
    (date) => new Date(date).toDateString() === today
  );
  if (alreadyCompleted) {
    throw new Error("Habit already completed today");
  }

  habit.completedDates.push(new Date());
  await habit.save();

  await awardXP(userId, 10);
  await updateStreak(userId);

  return habit;
};