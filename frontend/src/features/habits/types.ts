export interface Habit {
  _id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number;
  daysOfWeek?: number[];
  startDate?: string;
  endDate?: string;
  user: string;
  completedDates: string[];
  streakCount: number;
  lastCompletedDate?: string;
  xpReward: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitData {
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number;
  daysOfWeek?: number[];
  startDate?: string;
  endDate?: string;
  xpReward?: number;
}

export interface UpdateHabitData {
  title?: string;
  description?: string;
  frequency?: 'daily' | 'weekly' | 'custom';
  customDays?: number;
}
