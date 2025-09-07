import { create } from "zustand";
import type { Habit, CreateHabitData, UpdateHabitData } from "./types";
import { getHabits, createHabit, updateHabit, deleteHabit, completeHabit as completeHabitApi } from "./api";

interface HabitsState {
  habits: Habit[];
  loading: boolean;
  error: string | null;
  fetchHabits: () => Promise<void>;
  createHabit: (data: CreateHabitData) => Promise<void>;
  updateHabit: (id: string, data: UpdateHabitData) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  completeHabit: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useHabits = create<HabitsState>((set, get) => ({
  habits: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchHabits: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getHabits();
      if (result.success && result.data) {
        // Ensure we have an array and each habit has default values
        const habits = Array.isArray(result.data) ? result.data.map((habit: any) => ({
          ...habit,
          streakCount: habit.streakCount || 0,
          xpReward: habit.xpReward || 10,
          completedDates: habit.completedDates || [],
          daysOfWeek: habit.daysOfWeek || [],
        })) : [];
        set({ habits, loading: false });
      } else {
        set({ error: result.error || "Failed to fetch habits", loading: false });
      }
    } catch (error: any) {
      set({
        error: error?.message || "Failed to fetch habits",
        loading: false,
        habits: []
      });
    }
  },

  createHabit: async (data: CreateHabitData) => {
    set({ loading: true, error: null });
    try {
      const result = await createHabit(data);
      if (result.success && result.data) {
        const { habits } = get();
        set({ habits: [...habits, result.data], loading: false });
      } else {
        set({ error: result.error || "Failed to create habit", loading: false });
      }
    } catch (error: any) {
      set({
        error: error?.message || "Failed to create habit",
        loading: false
      });
    }
  },

  updateHabit: async (id: string, data: UpdateHabitData) => {
    set({ loading: true, error: null });
    try {
      const result = await updateHabit(id, data);
      if (result.success && result.data) {
        const { habits } = get();
        set({
          habits: habits.map(h => h._id === id ? result.data : h),
          loading: false
        });
      } else {
        set({ error: result.error || "Failed to update habit", loading: false });
      }
    } catch (error: any) {
      set({
        error: error?.message || "Failed to update habit",
        loading: false
      });
    }
  },

  deleteHabit: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const result = await deleteHabit(id);
      if (result.success) {
        const { habits } = get();
        set({ habits: habits.filter(h => h._id !== id), loading: false });
      } else {
        set({ error: result.error || "Failed to delete habit", loading: false });
      }
    } catch (error: any) {
      set({
        error: error?.message || "Failed to delete habit",
        loading: false
      });
    }
  },

  completeHabit: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // Get client's timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const result = await completeHabitApi(id, timezone);
      if (result.success && result.data) {
        const { habits } = get();
        set({
          habits: habits.map(h => h._id === id ? result.data : h),
          loading: false
        });
      } else {
        set({ error: result.error || "Failed to complete habit", loading: false });
      }
    } catch (error: any) {
      set({
        error: error?.message || "Failed to complete habit",
        loading: false
      });
    }
  }
}));
