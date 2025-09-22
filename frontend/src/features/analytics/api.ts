import axios from "axios";

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

export const getWeeklyActivity = () => API.get("/analytics/weekly-activity");
export const getXpSummary = () => API.get("/analytics/xp-summary");
export const getHeatmapData = () => API.get("/analytics/heatmap");
