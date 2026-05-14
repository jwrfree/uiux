"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatBubble } from "./chat-bubble";
import { ChatWindow, type ChatMessage } from "./chat-window";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Jati's AI assistant. Ask me anything about his work, skills, or experience. I can also help you get in touch!",
};

export function ChatProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasOpened) {
        setMessages([WELCOME_MESSAGE]);
        setHasOpened(true);
      }
      return next;
    });
  }, [hasOpened]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Sorry, I could not generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting. Please try again or reach out directly at wruhantojati@gmail.com",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

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
