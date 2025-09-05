import { Request, Response } from "express";
import * as habitService from "../services/habit.service";
import { logActivity } from "../services/activity.service";

export const createHabit = async (req: Request, res: Response) => {
  try {
    const habit = await habitService.createHabit(req.user._id, req.body);
    res.status(201).json(habit);

    await logActivity(
      req.user._id,
      "habit_completed",
      `Completed habit "${habit.title}"`,
      {
        habitId: habit._id,
      }
    );
    
  } catch (err) {
    res.status(500).json({ error: "Failed to create habit" });
  }
};

export const getHabits = async (req: Request, res: Response) => {
  try {
    const habits = await habitService.getHabits(req.user._id);
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};

export const updateHabit = async (req: Request, res: Response) => {
  try {
    const habit = await habitService.updateHabit(
      req.params['id'] as string,
      req.user._id,
      req.body
    );
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: "Failed to update habit" });
  }
};

export const deleteHabit = async (req: Request, res: Response) => {
  try {
    await habitService.deleteHabit(req.params['id'] as string, req.user._id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
};

export const completeHabit = async (req: Request, res: Response) => {
  try {
    const updatedHabit = await habitService.completeHabit(
      req.params['id'] as string,
      req.user._id
    );
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(400).json({ error: "Failed to complete habit" });
  }
};


