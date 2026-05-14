import api, { type ApiResponse } from "../lib/api";
import type { CreateTaskData, UpdateTaskData } from "../features/dailyTasks/types";

interface DailyTaskResponse {
  _id: string;
  user: string;
  goal?: string;
  habit?: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const getTasks = async (): Promise<ApiResponse<DailyTaskResponse[]>> => {
  try {
    const response = await api.get<DailyTaskResponse[]>("/daily-tasks");
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch tasks"
    };
  }
};

export const getTodayTasks = async (): Promise<ApiResponse<DailyTaskResponse[]>> => {
  try {
    const response = await api.get<DailyTaskResponse[]>("/daily-tasks/today");
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch today's tasks"
    };
  }
};

export const createTask = async (data: CreateTaskData): Promise<ApiResponse<DailyTaskResponse>> => {
  try {
    const response = await api.post<DailyTaskResponse>("/daily-tasks", data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create task"
    };
  }
};

export const updateTask = async (id: string, data: UpdateTaskData): Promise<ApiResponse<DailyTaskResponse>> => {
  try {
    const response = await api.put<DailyTaskResponse>(`/daily-tasks/${id}`, data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update task"
    };
  }
};

export const markTaskComplete = async (id: string): Promise<ApiResponse<DailyTaskResponse>> => {
  try {
    const response = await api.post<DailyTaskResponse>(`/daily-tasks/complete/${id}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to complete task"
    };
  }
};

export const deleteTask = async (id: string): Promise<ApiResponse<void>> => {
  try {
    await api.delete(`/daily-tasks/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete task"
    };
  }
};