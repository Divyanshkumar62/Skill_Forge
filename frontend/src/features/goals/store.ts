import { create } from "zustand";
import type { Goal } from "./types";

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  fetchGoals: () => Promise<void>;
  createGoal: (data: Partial<Goal>) => Promise<void>;
  updateGoal: (id: string, data: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  completeGoal: (id: string) => Promise<void>;
}

export const useGoals = create<GoalsState>((set, get) => ({
  goals: [],
  loading: false,
  error: null,

  fetchGoals: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("./api").then(m => m.getGoals());
      set({ goals: response.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch goals", loading: false });
    }
  },

  createGoal: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await import("./api").then(m => m.createGoal(data));
      const { goals } = get();
      set({ goals: [...goals, response.data], loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to create goal", loading: false });
    }
  },

  updateGoal: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await import("./api").then(m => m.updateGoal(id, data));
      const { goals } = get();
      set({
        goals: goals.map(g => g._id === id ? response.data : g),
        loading: false
      });
    } catch (error: any) {
      set({ error: error.message || "Failed to update goal", loading: false });
    }
  },

  deleteGoal: async (id) => {
    set({ loading: true, error: null });
    try {
      await import("./api").then(m => m.deleteGoal(id));
      const { goals } = get();
      set({ goals: goals.filter(g => g._id !== id), loading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to delete goal", loading: false });
    }
  },

  completeGoal: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await import("./api").then(m => m.completeGoal(id));
      const { goals } = get();
      set({
        goals: goals.map(g => g._id === id ? response.data : g),
        loading: false
      });
    } catch (error: any) {
      set({ error: error.message || "Failed to complete goal", loading: false });
    }
  }
}));
