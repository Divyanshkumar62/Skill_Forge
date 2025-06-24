import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthResponse, User } from "./types";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (res: AuthResponse) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (res) => set({ user: res.user, token: res.token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
