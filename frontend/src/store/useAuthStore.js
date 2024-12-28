import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      // if User if valid then set data to auth user
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in Check AUth: ", error);
      set({ authUser: null });
    } finally {
      // set Checking Auth to false as it check
      set({ isCheckingAuth: false });
    }
  },
}));
