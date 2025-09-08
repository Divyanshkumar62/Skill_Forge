import { Request, Response } from "express";
import * as questService from "../services/quest.service";

export const getQuests = async (_: Request, res: Response): Promise<void> => {
  const quests = await questService.getActiveQuests();
  res.json(quests);
};

export const completeQuestStep = async (req: Request, res: Response): Promise<void> => {
  const { questId } = req.params;

  try {
    if (!req.user?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user._id as string;
    const quest = await questService.completeQuestStep(questId as string, userId);
    res.json({ message: 'Quest step completed', quest });
  } catch (error) {
    console.error('Error completing quest step:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};
