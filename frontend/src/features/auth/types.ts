export interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  currentStreak?: number;
  longestStreak?: number;
  badges?: Array<{
    title: string;
    achievedAt: Date;
  }>;
}

export interface AuthResponse {
  token: string;
  user: User;
}
