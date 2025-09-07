import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// API functions without React Query for direct use
export const loginRequest = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const registerRequest = (data: {
  name: string;
  email: string;
  password: string;
}) => API.post("/auth/register", data);

// React Query mutations
export const loginMutation = async (data: { email: string; password: string }) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerMutation = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};
