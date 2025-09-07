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

// Milestone API functions
export const createMilestone = (goalId: string, data: { title: string; description?: string }) =>
  API.post(`/milestones/${goalId}`, data);

export const completeMilestone = (goalId: string, milestoneId: string, data = {}) =>
  API.patch(`/milestones/${goalId}/${milestoneId}`, data);

export const updateMilestone = (goalId: string, milestoneId: string, data: { title?: string; description?: string }) =>
  API.put(`/milestones/${goalId}/${milestoneId}`, data);

export const deleteMilestone = (goalId: string, milestoneId: string) =>
  API.delete(`/milestones/${goalId}/${milestoneId}`);
