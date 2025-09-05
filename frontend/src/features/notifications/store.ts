import { create } from "zustand";

interface Notification {
  _id: string;
  user: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface NotificationPreferences {
  habitReminders: boolean;
  goalReminders: boolean;
  milestoneReminders: boolean;
  streakReminders: boolean;
  gamificationNotifications: boolean;
  weeklyReports: boolean;
}

interface NotificationsState {
  notifications: Notification[];
  preferences: NotificationPreferences | null;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  fetchNotificationPreferences: () => Promise<void>;
  updateNotificationPreferences: (prefs: NotificationPreferences) => Promise<void>;
}

export const useNotifications = create<NotificationsState>((set, get) => ({
  notifications: [],
  preferences: null,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/notifications").then(m => m.getNotifications());
      set({ notifications: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch notifications", loading: false });
    }
  },

  markAsRead: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/notifications").then(m => m.markAsRead(id));
      const { notifications } = get();
      set({
        notifications: notifications.map(n => n._id === id ? response.data : n),
        loading: false
      });
    } catch (error) {
      set({ error: "Failed to update notification", loading: false });
    }
  },

  deleteNotification: async (id) => {
    set({ loading: true, error: null });
    try {
      await import("../../services/notifications").then(m => m.deleteNotification(id));
      const { notifications } = get();
      set({ notifications: notifications.filter(n => n._id !== id), loading: false });
    } catch (error) {
      set({ error: "Failed to delete notification", loading: false });
    }
  },

  fetchNotificationPreferences: async () => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/notifications").then(m => m.getNotificationPreferences());
      set({ preferences: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch notification preferences", loading: false });
    }
  },

  updateNotificationPreferences: async (prefs) => {
    set({ loading: true, error: null });
    try {
      const response = await import("../../services/notifications").then(m => m.updateNotificationPreferences(prefs));
      set({ preferences: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to update notification preferences", loading: false });
    }
  }
}));
