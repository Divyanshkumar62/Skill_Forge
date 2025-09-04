import axios from "axios";
import { Habit, CreateHabitData, UpdateHabitData } from "./types";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-storage");
  if (token) {
    const parsed = JSON.parse(token).state;
    config.headers.Authorization = `Bearer ${parsed.token}`;
  }
  return config;
});

export const getHabits = () => API.get("/habits");
export const createHabit = (data: CreateHabitData) => API.post("/habits", data);
export const updateHabit = (id: string, data: UpdateHabitData) => API.put(`/habits/${id}`, data);
export const deleteHabit = (id: string) => API.delete(`/habits/${id}`);
export const completeHabit = (id: string) => API.post(`/habits/${id}/complete`);
