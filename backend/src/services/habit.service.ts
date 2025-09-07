import { Habit } from "../models/habit.model";
import { updateStreak } from "./streak.service";
import { awardXP } from "./xp.service";
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


// Advanced streak calculation function with timezone awareness
const calculateHabitStreak = (habit: any, _currentTimezone: string = 'Etc/UTC') => {
  const completedDates = habit.completedDates.map((date: any) => new Date(date));
  completedDates.sort((a: any, b: any) => b.getTime() - a.getTime());

  if (completedDates.length === 0) return 0;

  let streak = 1;
  let currentDate = new Date(completedDates[0]);
  let expectedPreviousDate: Date;

  if (habit.frequency === 'daily') {
    // Daily habits should be completed exactly one day apart
    expectedPreviousDate = new Date(currentDate);
    expectedPreviousDate.setDate(currentDate.getDate() - 1);
  } else if (habit.frequency === 'weekly') {
    // Weekly habits should be completed exactly one week apart
    expectedPreviousDate = new Date(currentDate);
    expectedPreviousDate.setDate(currentDate.getDate() - 7);
  } else if (habit.frequency === 'custom' && habit.customDays) {
    // Custom habits should be completed customDays apart
    expectedPreviousDate = new Date(currentDate);
    expectedPreviousDate.setDate(currentDate.getDate() - habit.customDays);
  } else {
    // More complex scheduling could be handled here
    return 1;
  }

  for (let i = 1; i < completedDates.length; i++) {
    const actualPreviousDate = completedDates[i];
    const actualDateString = actualPreviousDate.toDateString();
    const expectedDateString = expectedPreviousDate.toDateString();

    if (actualDateString === expectedDateString) {
      streak++;
      // Update expected date for further iteration
      if (habit.frequency === 'daily') {
        expectedPreviousDate.setDate(expectedPreviousDate.getDate() - 1);
      } else if (habit.frequency === 'weekly') {
        expectedPreviousDate.setDate(expectedPreviousDate.getDate() - 7);
      } else if (habit.frequency === 'custom' && habit.customDays) {
        expectedPreviousDate.setDate(expectedPreviousDate.getDate() - habit.customDays);
      }
    } else {
      // Streak is broken
      break;
    }
  }

  return streak;
};

export const getHabitStreak = async (habitId: string, userId: string) => {
  const habit = await Habit.findOne({ _id: habitId, user: userId });
  if (!habit) {
    throw new Error("Habit not found or unauthorized");
  }

  const currentStreak = calculateHabitStreak(habit);
  return {
    habitId: habit._id,
    currentStreak,
    longestStreak: habit.streakCount,
    lastCompletedDate: habit.lastCompletedDate,
    totalCompletions: habit.completedDates.length,
  };
};

export const completeHabit = async (habitId: string, userId: string, timezone?: string) => {
  const habit = await Habit.findOne({ _id: habitId, user: userId });
  if (!habit) {
    throw new Error("Habit not found or unauthorized");
  }

  // Check if this habit should be completed today based on its schedule
  const now = new Date();
  const isDueToday = checkIfHabitIsDueToday(habit, now);

  if (!isDueToday) {
    throw new Error("Habit is not scheduled for completion today");
  }

  const today = now.toDateString();
  const alreadyCompletedToday = habit.completedDates.some(
    (date: Date) => new Date(date).toDateString() === today
  );

  if (alreadyCompletedToday) {
    throw new Error("Habit already completed today");
  }

  // Add completion date
  habit.completedDates.push(now);
  habit.lastCompletedDate = now;

  // Calculate new streak
  const newStreak = calculateHabitStreak(habit, timezone || 'Etc/UTC');
  habit.streakCount = Math.max(habit.streakCount, newStreak);

  await habit.save();

  // Award XP and update user streak
  await awardXP(userId, habit.xpReward || 10);
  await updateStreak(userId);

  return habit;
};

// Helper function to check if habit is due today
const checkIfHabitIsDueToday = (habit: any, today: Date) => {
  const startDate = habit.startDate ? new Date(habit.startDate) : null;
  const endDate = habit.endDate ? new Date(habit.endDate) : null;

  // Normalize dates to start of day for fair comparison
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDateStart = startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) : null;
  const endDateStart = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : null;

  // Check if habit is still active
  if (startDateStart && todayStart < startDateStart) return false;
  if (endDateStart && todayStart > endDateStart) return false;

  // Check frequency
  if (habit.frequency === 'daily') {
    return true; // Daily habits are always due
  }

  if (habit.frequency === 'weekly' && habit.daysOfWeek && Array.isArray(habit.daysOfWeek)) {
    const todayDayOfWeek = todayStart.getDay(); // 0=Sunday, 1=Monday, etc.
    return habit.daysOfWeek.includes(todayDayOfWeek);
  }

  if (habit.frequency === 'custom' && habit.customDays && habit.customDays > 0) {
    // Check if today is customDays from start date
    if (startDate) {
      const diffTime = todayStart.getTime() - startDateStart!.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays % habit.customDays === 0;
    }
  }

  return true; // Default to true if no specific scheduling
};
