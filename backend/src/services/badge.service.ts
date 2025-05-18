import User from '../models/user.model';
import { createNotification } from '../utils/notify';

interface Badge {
    title: string;
    condition: (user: any) => boolean;
}

const badges: Badge[] = [
  {
    title: 'First Step',
    condition: (user) => user.completedGoals >= 1,
  },
  {
    title: 'Goal Getter',
    condition: (user) => user.completedGoals >= 5,
  },
  {
    title: 'Milestone Maker',
    condition: (user) => user.completedMilestones >= 5,
  },
  {
    title: 'XP Rookie',
    condition: (user) => user.xp >= 500,
  },
  {
    title: 'XP Champion',
    condition: (user) => user.xp >= 3000,
  },
  // Deadline Destroyer badge would need more logic based on deadline completion (optional later)
];


export const checkAndAwardBadges = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found');
      return;
    }

    for (const badge of badges) {
      const alreadyHasBadge = user.badges.some((b) => b.title === badge.title);

      if (!alreadyHasBadge && badge.condition(user)) {
        user.badges.push({ title: badge.title, achievedAt: new Date() });

        await createNotification(
          user._id,
          `🏅 You've earned the '${badge.title}' badge! Great work!`,
          'achievement'
        );
      }
    }

    await user.save();
  } catch (error) {
    console.error('Error checking badges:', error);
  }
};