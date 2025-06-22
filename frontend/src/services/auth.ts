import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE });

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => API.post("/auth/register", data);
