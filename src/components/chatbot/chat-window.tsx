"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onClose: () => void;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div
        className={cn(
          "px-4 py-3 rounded-2xl rounded-bl-sm",
          "bg-secondary text-secondary-foreground",
          "flex items-center gap-1"
        )}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatWindow({
  messages,
  onSendMessage,
  isLoading,
  onClose,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    const value = input.value.trim();
    if (value) {
      onSendMessage(value);
      input.value = "";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "fixed z-50",
          "bottom-24 right-6",
          "w-[380px] max-h-[600px]",
          "max-sm:left-4 max-sm:right-4 max-sm:w-auto max-sm:bottom-20 max-sm:max-h-[70vh]",
          "flex flex-col",
          "bg-background border border-border",
          "rounded-2xl shadow-2xl overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
          <div>
            <h3 className="text-sm font-semibold !bg-none ![-webkit-text-fill-color:unset] text-foreground">
              Jati AI Assistant
            </h3>
            <p className="text-xs text-muted-foreground">Ask me anything</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <X className="size-4 text-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] px-4 py-2.5 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-gradient-to-b from-primary to-[#191b18] text-primary-foreground rounded-2xl rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-2xl rounded-bl-sm"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 border-t border-border"
        >
          <input
            ref={inputRef}
            name="message"
            type="text"
            placeholder="Type a message..."
            className={cn(
              "flex-1 bg-secondary/50 rounded-full px-4 py-2.5 text-sm",
              "outline-none placeholder:text-muted-foreground",
              "focus:ring-1 focus:ring-ring transition-all"
            )}
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "flex items-center justify-center",
              "w-9 h-9 rounded-full",
              "bg-gradient-to-b from-primary to-[#191b18]",
              "text-primary-foreground",
              "disabled:opacity-50 cursor-pointer",
              "hover:shadow-md transition-shadow"
            )}
            aria-label="Send message"
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
