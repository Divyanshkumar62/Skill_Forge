import { create } from "zustand";

interface Badge {
  _id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface Streak {
  current: number;
  longest: number;
  lastUpdated: string;
}

interface GamificationState {
  xp: number;
  level: number;
  streak: Streak;
  badges: Badge[];
  loading: boolean;
  error: string | null;
  // Actions for updating gamification data (usually triggered by other actions)
  setXp: (xp: number) => void;
  setLevel: (level: number) => void;
  setStreak: (streak: Streak) => void;
  addBadge: (badge: Badge) => void;
  clearError: () => void;
}

export const useGamification = create<GamificationState>((set, get) => ({
  xp: 0,
  level: 1,
  streak: { current: 0, longest: 0, lastUpdated: '' },
  badges: [],
  loading: false,
  error: null,

  setXp: (xp) => {
    const newLevel = Math.floor(xp / 100) + 1;
    set((state) => ({
      xp,
      level: newLevel > state.level ? newLevel : state.level
    }));
  },

  setLevel: (level) => set({ level }),

  setStreak: (streak) => set({ streak }),

  addBadge: (badge) => {
    set((state) => ({
      badges: [...state.badges, badge]
    }));
  },

  clearError: () => set({ error: null })
}));
