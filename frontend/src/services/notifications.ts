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

export const getNotifications = () => API.get("/notifications");
export const markAsRead = (id: string) => API.patch(`/notifications/${id}/read`);
export const deleteNotification = (id: string) => API.delete(`/notifications/${id}`);
export const getNotificationPreferences = () => API.get("/notifications/preferences");
export const updateNotificationPreferences = (preferences: any) => API.put("/notifications/preferences", preferences);
