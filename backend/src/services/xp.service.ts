import User from "../models/user.model";
import { createNotification } from "../utils/notify";

export const calculateLevel = (xp: number): number => {
  if (xp >= 8000) return 7;
  if (xp >= 5500) return 6;
  if (xp >= 3500) return 5;
  if (xp >= 2000) return 4;
  if (xp >= 1000) return 3;
  if (xp >= 500) return 2;
  return 1;
};

export const awardXP = async (
  userId: string,
  xpToAdd: number
): Promise<void> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      return;
    }

    // Add XP
    user.xp += xpToAdd;

    // Determine new level based on XP
    const newLevel = calculateLevel(user.xp);

    // Check if level changed
    if (newLevel > user.level) {
      user.level = newLevel;

      await createNotification(
        user._id,
        `🎉 Congratulations! You've reached Level ${newLevel}! Keep up the great work!`,
        "milestone"
      );
    }

    await user.save();
  } catch (error) {
    console.error("Error awarding XP:", error);
  }
};



