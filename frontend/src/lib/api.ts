import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_BASE_URL || 
         import.meta.env.VITE_API_BASE || 
         "http://localhost:5000/api";
};

const api: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthToken = (): string | null => {
  try {
    const stored = localStorage.getItem("auth-storage");
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed?.state?.token || null;
    }
  } catch {
    console.error("Error parsing auth token from storage");
  }
  return null;
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const handleApiResponse = <T>(response: any): ApiResponse<T> => {
  return {
    success: true,
    data: response.data,
  };
};

export const handleApiError = <T>(error: AxiosError): ApiResponse<T> => {
  const message = error.response?.data 
    ? (error.response.data as any)?.message || "An error occurred"
    : error.message || "Network error";
  
  return {
    success: false,
    error: message,
  };
};

export default api;