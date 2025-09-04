import { create } from "zustand";

interface ActivityData {
  date: string;
  completed: number;
  total: number;
}

interface XpSummary {
  current: number;
  total: number;
  level: number;
}

interface AnalyticsState {
  weeklyActivity: Record<string, number>;
  xpSummary: XpSummary | null;
  heatmapData: any[];
  loading: boolean;
  error: string | null;
  fetchWeeklyActivity: () => Promise<void>;
  fetchXpSummary: () => Promise<void>;
  fetchHeatmapData: () => Promise<void>;
}

export const useAnalytics = create<AnalyticsState>((set) => ({
  weeklyActivity: {},
  xpSummary: null,
  heatmapData: [],
  loading: false,
  error: null,

  fetchWeeklyActivity: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/analytics").then(m => m.getWeeklyActivity());
      set({ weeklyActivity: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch weekly activity", loading: false });
    }
  },

  fetchXpSummary: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/analytics").then(m => m.getXpSummary());
      set({ xpSummary: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch XP summary", loading: false });
    }
  },

  fetchHeatmapData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/analytics").then(m => m.getHeatmapData());
      set({ heatmapData: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch heatmap data", loading: false });
    }
  }
}));
