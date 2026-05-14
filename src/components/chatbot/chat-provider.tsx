"use client";

import { useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { AnimatePresence } from "framer-motion";
import { ChatBubble } from "./chat-bubble";
import { ChatWindow } from "./chat-window";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant" as const,
  parts: [{ type: "text" as const, text: "Hi! I'm Jati's AI assistant. Ask me anything about his work, skills, or experience. I can also help you get in touch!" }],
};

export function ChatProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const {
    messages,
    sendMessage,
    status,
    setMessages,
  } = useChat({
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          parts: [{ type: "text" as const, text: "Sorry, I'm having trouble connecting. Please try again or reach out directly at wruhantojati@gmail.com" }],
        },
      ]);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasOpened) {
        setMessages([WELCOME_MESSAGE]);
        setHasOpened(true);
      }
      return next;
    });
  }, [hasOpened, setMessages]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSendMessage = useCallback(
    async (content: string) => {
      await sendMessage({ text: content });
    },
    [sendMessage]
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
      <ChatBubble isOpen={isOpen} onClick={handleToggle} />
    </>
  );
}
