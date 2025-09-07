import axios from "axios";
import { useAuth } from "../features/auth/store";

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

// Badge icon mapping for better display
const BADGE_ICONS: { [key: string]: string } = {
  'First Step': '🎯',
  'Goal Getter': '🏆',
  'Milestone Maker': '🚀',
  'XP Rookie': '⭐',
  'XP Champion': '👑',
  'Streak Star': '🔥',
  'Daily Hero': '⚡',
  'Consistency King': '👑',
};

const BADGE_DESCRIPTIONS: { [key: string]: string } = {
  'First Step': 'Complete your first goal',
  'Goal Getter': 'Complete 5 goals',
  'Milestone Maker': 'Complete 5 milestones',
  'XP Rookie': 'Earn 500 XP',
  'XP Champion': 'Earn 3000 XP',
  'Streak Star': 'Maintain a 7-day streak',
  'Daily Hero': 'Complete tasks for 10 consecutive days',
  'Consistency King': 'Complete 50 tasks in total',
};

export interface FrontendBadge {
  _id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

// This function simulates fetching badges from the backend
// In a real scenario, we'd have an API endpoint to get badges
export const getUserBadges = (): FrontendBadge[] => {
  const authState = useAuth.getState();
  const user = authState.user;

  if (!user || !user.badges) return [];

  return user.badges.map((badge: { title: string; achievedAt: Date }) => ({
    _id: badge.title.toLowerCase().replace(/\s+/g, '-'),
    name: badge.title,
    description: BADGE_DESCRIPTIONS[badge.title] || `Achievement unlocked: ${badge.title}`,
    icon: BADGE_ICONS[badge.title] || '🏅',
    unlockedAt: new Date(badge.achievedAt).toISOString(),
  }));
};

// Function to refresh user data and badges (if user data changes)
export const refreshBadges = async () => {
  // In this implementation, badges are stored in the user auth state
  // So we just return the current badges from the auth store
  return getUserBadges();
};
