import User from '../models/user.model';
import { createNotification } from '../utils/notify';

interface Badge {
    title: string;
    condition: (user: any) => boolean;
}

const badges: Badge[] = [
    {
        title: 'First Steps',
        condition: (user: any) => user.xp >= 0,
    },
    {
        title: 'Goal Setter',
        condition: (user: any) => user.goals.length >= 1,
    },
    {
        title: 'Goal Crusher',
        condition: (user: any) => user.goals.filter((goal: any) => goal.status === 'completed').length >= 1,
    },
    {
        title: 'Milestone Achiever',
        condition: (user: any) => user.goals.some((goal: any) => goal.milestones.some((milestone: any) => milestone.completed)),
    },
]

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