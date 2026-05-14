import { create } from "zustand";
import type { Goal } from "./types";
import { getGoals, createGoal, updateGoal, deleteGoal, completeGoal as completeGoalApi } from "./api";

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
      const result = await getGoals();
      if (result.success && result.data) {
        set({ goals: result.data, loading: false });
      } else {
        set({ error: result.error || "Failed to fetch goals", loading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch goals", loading: false });
    }
  },

  createGoal: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await createGoal(data);
      if (result.success && result.data) {
        const { goals } = get();
        set({ goals: [...goals, result.data as Goal], loading: false });
      } else {
        set({ error: result.error || "Failed to create goal", loading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to create goal", loading: false });
    }
  },

  updateGoal: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const result = await updateGoal(id, data);
      if (result.success && result.data) {
        const { goals } = get();
        set({
          goals: goals.map(g => g._id === id ? result.data as Goal : g),
          loading: false
        });
      } else {
        set({ error: result.error || "Failed to update goal", loading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to update goal", loading: false });
    }
  },

  deleteGoal: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await deleteGoal(id);
      if (result.success) {
        const { goals } = get();
        set({ goals: goals.filter(g => g._id !== id), loading: false });
      } else {
        set({ error: result.error || "Failed to delete goal", loading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to delete goal", loading: false });
    }
  },

  completeGoal: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await completeGoalApi(id);
      if (result.success && result.data) {
        const { goals } = get();
        set({
          goals: goals.map(g => g._id === id ? result.data as Goal : g),
          loading: false
        });
      } else {
        set({ error: result.error || "Failed to complete goal", loading: false });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to complete goal", loading: false });
    }
  }
}));