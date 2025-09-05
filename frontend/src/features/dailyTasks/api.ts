import axios from "axios";
import type { CreateTaskData } from "./types";

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

export const getTodayTasks = () => API.get("/dailyTask/today");
export const createTask = (data: CreateTaskData) => API.post("/dailyTask", data);
export const markTaskComplete = (id: string) => API.patch(`/dailyTask/complete/${id}`);
export const deleteTask = (id: string) => API.delete(`/dailyTask/${id}`);
