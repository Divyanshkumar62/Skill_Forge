import { create } from "zustand";
import type { DailyTask, CreateTaskData } from "./types";

interface DailyTasksState {
  tasks: DailyTask[];
  loading: boolean;
  error: string | null;
  fetchTodayTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  markTaskComplete: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useDailyTasks = create<DailyTasksState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTodayTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/dailyTasks").then(m => m.getTodayTasks());
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch tasks", loading: false });
    }
  },

  createTask: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/dailyTasks").then(m => m.createTask(data));
      const { tasks } = get();
      set({ tasks: [...tasks, response.data], loading: false });
    } catch (error) {
      set({ error: "Failed to create task", loading: false });
    }
  },

  markTaskComplete: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/dailyTasks").then(m => m.markTaskComplete(id));
      const { tasks } = get();
      set({
        tasks: tasks.map(t => t._id === id ? response.data : t),
        loading: false
      });
    } catch (error) {
      set({ error: "Failed to update task", loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await import("../../services/dailyTasks").then(m => m.deleteTask(id));
      const { tasks } = get();
      set({ tasks: tasks.filter(t => t._id !== id), loading: false });
    } catch (error) {
      set({ error: "Failed to delete task", loading: false });
    }
  }
}));
