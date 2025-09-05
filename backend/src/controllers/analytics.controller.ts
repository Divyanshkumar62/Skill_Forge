import { Request, Response } from "express";
import { Activity } from "../models/activity.model";

import User from "../models/user.model";


export const getWeeklyActivity = async (req: Request, res: Response) => {
  const userId = req.user._id;

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
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const result: Record<string, number> = {};
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


export const getHeatmapData = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const pastMonth = new Date();
  pastMonth.setDate(pastMonth.getDate() - 30);

  const activities = await Activity.aggregate([
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


export const getXpSummary = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user._id).select("xp level");
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