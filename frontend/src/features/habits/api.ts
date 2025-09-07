import axios from "axios";
import type { CreateHabitData, UpdateHabitData } from "./types";

// Create API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE || "http://localhost:5000/api",
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
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Habit API endpoints with proper error handling
export const getHabits = async () => {
  try {
    const response = await API.get("/habits");
    return { data: response.data, success: true };
  } catch (error: any) {
    return {
      data: [],
      success: false,
      error: error.response?.data?.message || "Failed to fetch habits"
    };
  }
};

export const createHabit = async (data: CreateHabitData) => {
  try {
    const response = await API.post("/habits", data);
    return { data: response.data, success: true };
  } catch (error: any) {
    return {
      data: null,
      success: false,
      error: error.response?.data?.message || "Failed to create habit"
    };
  }
};

export const updateHabit = async (id: string, data: UpdateHabitData) => {
  try {
    const response = await API.put(`/habits/${id}`, data);
    return { data: response.data, success: true };
  } catch (error: any) {
    return {
      data: null,
      success: false,
      error: error.response?.data?.message || "Failed to update habit"
    };
  }
};

export const deleteHabit = async (id: string) => {
  try {
    await API.delete(`/habits/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete habit"
    };
  }
};

export const completeHabit = async (id: string, timezone?: string) => {
  try {
    const response = await API.post(`/habits/${id}/complete`, { timezone });
    return { data: response.data, success: true };
  } catch (error: any) {
    return {
      data: null,
      success: false,
      error: error.response?.data?.message || "Failed to complete habit"
    };
  }
};

export const getHabitStreak = async (id: string) => {
  try {
    const response = await API.get(`/habits/${id}/streak`);
    return { data: response.data, success: true };
  } catch (error: any) {
    return {
      data: null,
      success: false,
      error: error.response?.data?.message || "Failed to get habit streak"
    };
  }
};
