export interface Notification {
  _id: string;
  user: string;
  message: string;
  type: 'reminder' | 'milestone' | 'goal' | 'tip' | 'achievement' | 'gamification';
  read: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationPreferences {
  habitReminders: boolean;
  goalReminders: boolean;
  milestoneReminders: boolean;
  streakReminders: boolean;
  gamificationNotifications: boolean;
  weeklyReports: boolean;
}

export type NotificationType = Notification['type'];
