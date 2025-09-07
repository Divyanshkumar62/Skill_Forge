import { create } from "zustand";
import { getUserBadges } from "../../services/badges";
import type { FrontendBadge } from "../../services/badges";

interface Streak {
  current: number;
  longest: number;
  lastUpdated: string;
}

interface GamificationState {
  xp: number;
  level: number;
  streak: Streak;
  badges: FrontendBadge[];
  loading: boolean;
  error: string | null;
  // Actions for updating gamification data
  setXp: (xp: number) => void;
  setLevel: (level: number) => void;
  setStreak: (streak: Streak) => void;
  loadBadgeData: () => void;
  addBadge: (badge: FrontendBadge) => void;
  clearError: () => void;
}

export const useGamification = create<GamificationState>((set) => ({
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

  loadBadgeData: () => {
    try {
      const userBadges = getUserBadges();
      set({ badges: userBadges });
    } catch (error) {
      set({ error: "Failed to load badges" });
    }
  },

  addBadge: (badge) => {
    set((state) => ({
      badges: [...state.badges, badge]
    }));
  },

  clearError: () => set({ error: null })
}));
