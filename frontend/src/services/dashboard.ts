import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// Attach token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-storage");
  if (token) {
    try {
      const parsed = JSON.parse(token).state;
      config.headers.Authorization = `Bearer ${parsed.token}`;
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }
  return config;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Optimized dashboard data fetching
export interface DashboardData {
  user: {
    xp: number;
    level: number;
    currentStreak: number;
    longestStreak: number;
    badges: Array<{ title: string; achievedAt: Date }>;
    completedGoals: number;
    completedMilestones: number;
  };
  summary: {
    activeHabits: number;
    pendingTasks: number;
    completedTasks: number;
    totalHabitsStreak: number;
    activeGoals: number;
    completedGoals: number;
  };
  habits: Array<{
    _id: string;
    title: string;
    streakCount: number;
    xpReward: number;
    frequency: string;
    completedToday: boolean;
  }>;
  todayTasks: Array<{
    _id: string;
    title: string;
    completed: boolean;
    completedAt?: Date;
    dueDate: Date;
  }>;
  goals: Array<{
    _id: string;
    title: string;
    status: string;
    progress: number;
    dueDate?: Date;
  }>;
  weeklyActivity: Record<string, { count: number; xpEarned: number }>;
}

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const response = await API.get("/dashboard/data");
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch dashboard data:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard data");
  }
};