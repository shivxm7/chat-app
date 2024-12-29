import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageStore = create((set) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/getUsers");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.messages);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    set((state) => {
      const { selectedUser, messages } = state;
      if (!selectedUser) {
        toast.error("No user selected!");
        return;
      }

      axiosInstance
        .post(`/message/send/${selectedUser._id}`, messageData)
        .then((res) => {
          set({ messages: [...messages, res.data] });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
  },
}));
