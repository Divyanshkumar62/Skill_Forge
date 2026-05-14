import api, { type ApiResponse } from "../../lib/api";
import type { CreateHabitData, UpdateHabitData } from "./types";

interface HabitApiResponse {
  _id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number;
  daysOfWeek?: number[];
  startDate?: string;
  endDate?: string;
  user: string;
  completedDates: string[];
  streakCount: number;
  lastCompletedDate?: string;
  xpReward: number;
  createdAt: string;
  updatedAt: string;
}

export const getHabits = async (): Promise<ApiResponse<HabitApiResponse[]>> => {
  try {
    const response = await api.get<HabitApiResponse[]>("/habits");
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch habits"
    };
  }
};

export const createHabit = async (data: CreateHabitData): Promise<ApiResponse<HabitApiResponse>> => {
  try {
    const response = await api.post<HabitApiResponse>("/habits", data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create habit"
    };
  }
};

export const updateHabit = async (id: string, data: UpdateHabitData): Promise<ApiResponse<HabitApiResponse>> => {
  try {
    const response = await api.put<HabitApiResponse>(`/habits/${id}`, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update habit"
    };
  }
};

export const deleteHabit = async (id: string): Promise<ApiResponse<void>> => {
  try {
    await api.delete(`/habits/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete habit"
    };
  }
};

export const completeHabit = async (id: string, timezone?: string): Promise<ApiResponse<HabitApiResponse>> => {
  try {
    const response = await api.post<HabitApiResponse>(`/habits/${id}/complete`, { timezone });
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to complete habit"
    };
  }
};

export const getHabitStreak = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await api.get(`/habits/${id}/streak`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to get habit streak"
    };
  }
};