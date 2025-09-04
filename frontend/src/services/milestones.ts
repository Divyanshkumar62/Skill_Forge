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

export const createMilestone = (goalId: string, data: { title: string }) =>
  API.post(`/milestones/${goalId}`, data);
export const completeMilestone = (goalId: string, milestoneId: string) =>
  API.patch(`/milestones/${goalId}/${milestoneId}`);
export const updateMilestone = (goalId: string, milestoneId: string, data: { title: string }) =>
  API.put(`/milestones/${goalId}/${milestoneId}`, data);
export const deleteMilestone = (goalId: string, milestoneId: string) =>
  API.delete(`/milestones/${goalId}/${milestoneId}`);
