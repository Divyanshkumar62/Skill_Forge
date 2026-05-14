import api, { type ApiResponse } from "../../lib/api";
import type { Goal } from "./types";

interface GoalResponse {
  _id: string;
  title: string;
  description?: string;
  milestones: Array<{
    _id: string;
    title: string;
    completed: boolean;
  }>;
  status: "pending" | "in-progress" | "completed";
  progress: number;
  dueDate?: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export const getGoals = async (): Promise<ApiResponse<GoalResponse[]>> => {
  try {
    const response = await api.get<GoalResponse[]>("/goals");
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch goals"
    };
  }
};

export const createGoal = async (data: Partial<Goal>): Promise<ApiResponse<GoalResponse>> => {
  try {
    const response = await api.post<GoalResponse>("/goals", data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create goal"
    };
  }
};

export const updateGoal = async (id: string, data: Partial<Goal>): Promise<ApiResponse<GoalResponse>> => {
  try {
    const response = await api.put<GoalResponse>(`/goals/${id}`, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update goal"
    };
  }
};

export const deleteGoal = async (id: string): Promise<ApiResponse<void>> => {
  try {
    await api.delete(`/goals/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete goal"
    };
  }
};

export const completeGoal = async (id: string): Promise<ApiResponse<GoalResponse>> => {
  try {
    const response = await api.patch<GoalResponse>(`/goals/complete/${id}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to complete goal"
    };
  }
};