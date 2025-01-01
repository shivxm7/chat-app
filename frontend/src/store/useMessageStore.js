import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
export const useMessageStore = create((set, get) => ({
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

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = useMessageStore.getState(); // Access state directly
    if (!selectedUser) {
      toast.error("No user selected!");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );

      // Safely update messages
      useMessageStore.setState({
        messages: [...messages, res.data],
      });
    } catch (error) {
      toast.error(error.message);
      console.error("Failed to send message:", error);
    }
  },

  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId != selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unSubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
