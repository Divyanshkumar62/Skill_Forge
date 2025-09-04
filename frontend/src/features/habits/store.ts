import { create } from "zustand";
import type { Habit, CreateHabitData, UpdateHabitData } from "./types";

interface HabitsState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
  fetchHabits: () => Promise<void>;
  createHabit: (data: CreateHabitData) => Promise<void>;
  updateHabit: (id: string, data: UpdateHabitData) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  completeHabit: (id: string) => Promise<void>;
}

export const useHabits = create<HabitsState>((set, get) => ({
  habits: [],
  loading: false,
  error: null,

  fetchHabits: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/habits").then(m => m.getHabits());
      set({ habits: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch habits", loading: false });
    }
  },

  createHabit: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/habits").then(m => m.createHabit(data));
      const { habits } = get();
      set({ habits: [...habits, response.data], loading: false });
    } catch (error) {
      set({ error: "Failed to create habit", loading: false });
    }
  },

  updateHabit: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/habits").then(m => m.updateHabit(id, data));
      const { habits } = get();
      set({
        habits: habits.map(h => h._id === id ? response.data : h),
        loading: false
      });
    } catch (error) {
      set({ error: "Failed to update habit", loading: false });
    }
  },

  deleteHabit: async (id) => {
    set({ loading: true, error: null });
    try {
      await import("../../services/habits").then(m => m.deleteHabit(id));
      const { habits } = get();
      set({ habits: habits.filter(h => h._id !== id), loading: false });
    } catch (error) {
      set({ error: "Failed to delete habit", loading: false });
    }
  },

  completeHabit: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/habits").then(m => m.completeHabit(id));
      const { habits } = get();
      set({
        habits: habits.map(h => h._id === id ? response.data : h),
        loading: false
      });
    } catch (error) {
      set({ error: "Failed to complete habit", loading: false });
    }
  }
}));
