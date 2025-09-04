export interface Habit {
  _id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number;
  user: string;
  completedDates: Date[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHabitData {
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number;
}

export interface UpdateHabitData {
  title?: string;
  description?: string;
  frequency?: 'daily' | 'weekly' | 'custom';
  customDays?: number;
}
