import api, { type ApiResponse } from "../lib/api";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const login = async (data: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed"
    };
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed"
    };
  }
};