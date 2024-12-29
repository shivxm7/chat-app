import React from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useEffect } from "react";
import ChatSkeleton from "./skeletons/ChatSkeleton";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const { messages, isMessageLoading, getMessage, selectedUser } =
    useMessageStore();

  useEffect(() => {
    getMessage(selectedUser._id);
  }, [selectedUser._id, getMessage]);

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <ChatSkeleton />
        <ChatInput />
      </div>
    );
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <p>Messages..</p>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
