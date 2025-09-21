import { Request, Response } from "express";
import { Activity } from "../models/activity.model";
import Goal from "../models/goal.model";
import { Habit } from "../models/habit.model";
import { DailyTask } from "../models/dailyTask.model";
import User from "../models/user.model";
import { catchAsync } from "../middlewares/errorHandler.middleware";

// Aggregated dashboard data endpoint
export const getDashboardData = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?._id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Parallel data fetching for better performance
  const [user, habits, todayTasks, goals, weeklyActivity] = await Promise.all([
    User.findById(userId).select("xp level currentStreak longestStreak badges completedGoals completedMilestones"),
    
    Habit.find({ user: userId })
      .select("title streakCount completedDates xpReward frequency lastCompletedDate")
      .sort({ createdAt: -1 })
      .limit(10), // Limit for performance
    
    DailyTask.find({
      user: userId,
      dueDate: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      }
    }).select("title completed completedAt dueDate"),
    
    Goal.find({ owner: userId })
      .select("title status progress dueDate")
      .sort({ createdAt: -1 })
      .limit(5), // Recent goals only
    
    getWeeklyActivityData(userId)
  ]);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  // Calculate summary statistics
  const pendingTasks = todayTasks.filter(task => !task.completed).length;
  const completedTasks = todayTasks.filter(task => task.completed).length;
  const activeHabits = habits.filter(habit => !habit.lastCompletedDate || 
    new Date(habit.lastCompletedDate).toDateString() !== new Date().toDateString()).length;
  
  const totalHabitsStreak = habits.reduce((total, habit) => total + (habit.streakCount || 0), 0);

  const dashboardData = {
    user: {
      xp: user.xp,
      level: user.level,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      badges: user.badges,
      completedGoals: user.completedGoals,
      completedMilestones: user.completedMilestones
    },
    summary: {
      activeHabits,
      pendingTasks,
      completedTasks,
      totalHabitsStreak,
      activeGoals: goals.filter(goal => goal.status !== 'completed').length,
      completedGoals: goals.filter(goal => goal.status === 'completed').length
    },
    habits: habits.map(habit => ({
      _id: habit._id,
      title: habit.title,
      streakCount: habit.streakCount,
      xpReward: habit.xpReward,
      frequency: habit.frequency,
      completedToday: habit.lastCompletedDate && 
        new Date(habit.lastCompletedDate).toDateString() === new Date().toDateString()
    })),
    todayTasks: todayTasks.map(task => ({
      _id: task._id,
      title: task.title,
      completed: task.completed,
      completedAt: task.completedAt,
      dueDate: task.dueDate
    })),
    goals: goals.map(goal => ({
      _id: goal._id,
      title: goal.title,
      status: goal.status,
      progress: goal.progress,
      dueDate: goal.dueDate
    })),
    weeklyActivity
  };

  res.json(dashboardData);
});

// Optimized weekly activity data
const getWeeklyActivityData = async (userId: string) => {
  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const activities = await Activity.aggregate([
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
        xpEarned: { $sum: "$xpEarned" }, // Assuming activities have xpEarned field
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill in missing days with 0 values
  const result: Record<string, { count: number; xpEarned: number }> = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const key = date.toISOString().slice(0, 10);
    result[key] = { count: 0, xpEarned: 0 };
  }

  activities.forEach((item) => {
    result[item._id] = {
      count: item.count,
      xpEarned: item.xpEarned || 0
    };
  });

  return result;
};