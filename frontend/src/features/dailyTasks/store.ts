import { create } from "zustand";
import type { DailyTask, CreateTaskData } from "./types";
import { getTasks, getTodayTasks, createTask, updateTask, markTaskComplete, deleteTask } from "../../services/dailyTasks";

interface DailyTasksState {
  tasks: DailyTask[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTodayTasks: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: string, data: any) => Promise<void>;
  markTaskComplete: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useDailyTasks = create<DailyTasksState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getTasks();
      if (result.success && result.data) {
        set({ tasks: result.data, loading: false });
      } else {
        set({ error: result.error || "Failed to fetch tasks", loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch tasks", loading: false });
    }
  },

  fetchTodayTasks: async () => {
    set({ loading: true, error: null });
    try {
      const result = await getTodayTasks();
      if (result.success && result.data) {
        set({ tasks: result.data, loading: false });
      } else {
        set({ error: result.error || "Failed to fetch tasks", loading: false });
      }
    } catch (error) {
      set({ error: "Failed to fetch tasks", loading: false });
    }
  },

  createTask: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await createTask(data);
      if (result.success && result.data) {
        const { tasks } = get();
        set({ tasks: [...tasks, result.data], loading: false });
      } else {
        set({ error: result.error || "Failed to create task", loading: false });
      }
    } catch (error) {
      set({ error: "Failed to create task", loading: false });
    }
  },

  updateTask: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const result = await updateTask(id, data);
      if (result.success && result.data) {
        const { tasks } = get();
        set({
          tasks: tasks.map(t => t._id === id ? result.data as DailyTask : t),
          loading: false
        });
      } else {
        set({ error: result.error || "Failed to update task", loading: false });
      }
    } catch (error) {
      set({ error: "Failed to update task", loading: false });
    }
  },

  markTaskComplete: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await markTaskComplete(id);
      if (result.success && result.data) {
        const { tasks } = get();
        set({
          tasks: tasks.map(t => t._id === id ? result.data as DailyTask : t),
          loading: false
        });
      } else {
        set({ error: result.error || "Failed to update task", loading: false });
      }
    } catch (error) {
      set({ error: "Failed to update task", loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      const result = await deleteTask(id);
      if (result.success) {
        const { tasks } = get();
        set({ tasks: tasks.filter(t => t._id !== id), loading: false });
      } else {
        set({ error: result.error || "Failed to delete task", loading: false });
      }
    } catch (error) {
      set({ error: "Failed to delete task", loading: false });
    }
  }
}));