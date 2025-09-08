import { Request, Response } from "express";
import * as habitService from "../services/habit.service";
import { logActivity } from "../services/activity.service";

export const createHabit = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const habit = await habitService.createHabit(userId, req.body);
    res.status(201).json(habit);

    await logActivity(
      userId,
      "habit_created",
      `Created habit "${habit.title}"`,
      {
        habitId: habit._id,
      }
    );

  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to create habit" });
  }
};

export const getHabits = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const habits = await habitService.getHabits(userId);
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};

export const updateHabit = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const habit = await habitService.updateHabit(
      req.params['id'] as string,
      userId,
      req.body
    );
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: "Failed to update habit" });
  }
};

export const deleteHabit = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await habitService.deleteHabit(req.params['id'] as string, userId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
};

export const completeHabit = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const timezone = req.body.timezone || 'Etc/UTC';
    const updatedHabit = await habitService.completeHabit(
      req.params['id'] as string,
      userId,
      timezone
    );
    res.status(200).json(updatedHabit);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to complete habit" });
  }
};

export const getHabitStreak = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const streakInfo = await habitService.getHabitStreak(
      req.params['id'] as string,
      userId
    );
    res.status(200).json(streakInfo);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to get habit streak" });
  }
};
