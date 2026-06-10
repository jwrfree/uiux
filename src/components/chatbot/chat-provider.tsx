"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatBubble } from "./chat-bubble";
import { ChatWindow, type ChatMessage } from "./chat-window";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Jati's AI assistant. Ask me anything about his work, skills, or experience — I'm happy to help!",
};

const STORAGE_KEY = "jati-chat-history";
const STORAGE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function ChatProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  // Load chat history from LocalStorage on mount (with TTL check)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { messages: parsed, savedAt } = JSON.parse(stored);
        const isExpired = Date.now() - savedAt > STORAGE_TTL_MS;
        if (!isExpired && Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setHasOpened(true);
        } else if (isExpired) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error("Failed to load chat history", e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Auto-save to LocalStorage whenever messages change (with TTL timestamp)
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages, savedAt: Date.now() })
      );
    } catch (e) {
      console.error("Failed to save chat history", e);
    }
  }, [messages]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasOpened) {
        setMessages([WELCOME_MESSAGE]);
        setHasOpened(true);
      }
      if (next) setHasUnread(false); // clear badge on open
      return next;
    });
  }, [hasOpened]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages: [WELCOME_MESSAGE], savedAt: Date.now() })
      );
    } catch (e) {
      console.error("Failed to clear chat history", e);
    }
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
      const currentMessages = messagesRef.current;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...currentMessages, userMessage]
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader");
      }

      const decoder = new TextDecoder();
      const assistantMessageId = `assistant-${Date.now()}`;

      // Initialize the assistant message in the state as empty
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
        },
      ]);
      setIsLoading(false); // Hide typing indicator now that we are streaming

      let assistantMessageContent = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // LOW-02: Strip [SHOW_CONTACT] from streamed chunks to prevent visual flicker
        assistantMessageContent += chunk.replace(/\[SHOW_CONTACT\]/gi, "");

        // Functional updater ensures we always get the latest state (no stale closure)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: assistantMessageContent }
              : msg
          )
        );
      }
      // Mark unread if window is closed when the AI finishes responding
      if (!isOpenRef.current) setHasUnread(true);
    } catch {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting. Please try again or reach out directly at wruhantojati@gmail.com",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onClose={handleClose}
            onClearChat={handleClearChat}
          />
        )}
      </AnimatePresence>
      <ChatBubble isOpen={isOpen} onClick={handleToggle} hasUnread={hasUnread} />
    </>
  );
}
