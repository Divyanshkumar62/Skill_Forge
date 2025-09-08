import { Quest } from "../models/quest.model";
import { awardXP } from "./xp.service";

export const getActiveQuests = async () => {
  const now = new Date();
  return await Quest.find({
    startDate: { $lte: now },
    endDate: { $gte: now }
  });
};

export const completeQuestStep = async (questId: string, userId: string) => {
  const quest = await Quest.findById(questId);
  if (!quest) throw new Error("Quest not found");
  if (!userId) throw new Error("User ID is required");

  const currentProgress = quest.progress.get(userId) || 0;
  if (currentProgress >= quest.goal) throw new Error("Quest already completed");

  quest.progress.set(userId, currentProgress + 1);
  await quest.save();

  // Award XP if completed
  if (currentProgress + 1 >= quest.goal) {
    await awardXP(userId, quest.rewardXp);
  }

  return quest;
};
