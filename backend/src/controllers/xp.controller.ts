import { Request, Response } from "express";
import User from "../models/user.model";
import { awardXP } from "../services/xp.service";

export const getXpStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select("xp level");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Calculate XP needed for next level
    const xpToNextLevel = (user.level * 100) - (user.xp % (user.level * 100));

    res.json({
      xp: user.xp,
      level: user.level,
      xpToNextLevel
    });
  } catch (error) {
    console.error("Error getting XP status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const earnXP = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { amount } = req.body;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!amount || amount <= 0) {
      res.status(400).json({ message: "Invalid XP amount" });
      return;
    }

    await awardXP(userId, amount);

    res.json({ message: "XP awarded successfully" });
  } catch (error) {
    console.error("Error awarding XP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
