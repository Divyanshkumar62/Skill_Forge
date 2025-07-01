import axios from "axios";
import { Goal } from "./types";

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

export const getGoals = () => API.get<Goal[]>("/goals");
export const createGoal = (data: Partial<Goal>) => API.post("/goals", data);
export const updateGoal = (id: string, data: Partial<Goal>) =>
  API.put(`/goals/${id}`, data);
export const deleteGoal = (id: string) => API.delete(`/goals/${id}`);
