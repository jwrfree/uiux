"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUp, RotateCcw, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "./markdown-renderer";

const MAX_INPUT_LENGTH = 1000;

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
  onClearChat?: () => void;
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

const SUGGESTED_PROMPTS = [
  "What are Jati's core skills?",
  "Tell me about the Teknovo project",
  "Is Jati open to remote work?",
  "How can I get in touch with Jati?",
];

export function ChatWindow({
  messages,
  onSendMessage,
  isLoading,
  onClose,
  onClearChat,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [charCount, setCharCount] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = useCallback(async (id: string, content: string) => {
    const cleanContent = content.replace("[SHOW_CONTACT]", "").trim();
    await navigator.clipboard.writeText(cleanContent);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    const value = input.value.trim();
    if (value && value.length <= MAX_INPUT_LENGTH) {
      onSendMessage(value);
      input.value = "";
      setCharCount(0);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.94 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.8,
        }}
        className={cn(
          "fixed z-50",
          "bottom-24 right-6",
          "w-[460px] max-h-[620px]",
          "max-sm:left-4 max-sm:right-4 max-sm:w-auto max-sm:bottom-20 max-sm:max-h-[75vh]",
          "flex flex-col",
          "bg-background border border-border",
          "rounded-2xl shadow-2xl overflow-hidden"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            {/* Avatar with online status dot */}
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10 border border-border flex items-center justify-center">
                <img
                  src="/images/profile.webp"
                  alt="Wruhantojati"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if photo not available
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-xs font-bold text-primary">JW</span>`;
                    }
                  }}
                />
              </div>
              {/* Online status indicator */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <h3 className="text-sm font-semibold !bg-none ![-webkit-text-fill-color:unset] text-foreground leading-tight">
                Jati&apos;s AI Assistant
              </h3>
              <p className="text-[11px] text-muted-foreground">Typically replies instantly</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {messages.length > 1 && onClearChat && (
              <button
                type="button"
                onClick={onClearChat}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="size-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="size-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex group/msg",
                msg.role === "user" ? "justify-end" : "justify-start items-end gap-1"
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
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <MarkdownRenderer text={msg.content} />
                )}
              </div>
              {/* Copy button for assistant messages — hover reveal */}
              {msg.role === "assistant" && msg.id !== "welcome" && msg.content && (
                <button
                  type="button"
                  onClick={() => handleCopy(msg.id, msg.content)}
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full mb-0.5",
                    "text-muted-foreground hover:text-foreground hover:bg-accent",
                    "opacity-0 group-hover/msg:opacity-100 transition-all duration-200",
                    "cursor-pointer"
                  )}
                  title="Copy message"
                  aria-label="Copy message"
                >
                  {copiedId === msg.id ? (
                    <Check className="size-3 text-primary" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </button>
              )}
            </div>
          ))}
          {messages.length === 1 && messages[0].id === "welcome" && !isLoading && (
            <div className="flex flex-col gap-2 mt-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
              <p className="text-xs text-muted-foreground font-medium px-1">Ask about Jati:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onSendMessage(prompt)}
                    className={cn(
                      "text-xs px-3.5 py-2 rounded-xl text-left font-medium",
                      "bg-secondary/40 backdrop-blur-xs text-foreground border border-border/40",
                      "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/30",
                      "hover:shadow-xs hover:-translate-y-0.5",
                      "transition-all duration-200 cursor-pointer active:scale-95 active:translate-y-0"
                    )}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 px-4 py-3 border-t border-border"
        >
          <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            name="message"
            type="text"
            placeholder="Type a message..."
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleInputChange}
            className={cn(
              "flex-1 bg-secondary/50 rounded-full px-4 py-2.5 text-sm",
              "outline-none placeholder:text-muted-foreground",
              "focus:ring-1 focus:ring-ring transition-all",
              charCount >= MAX_INPUT_LENGTH && "ring-1 ring-destructive"
            )}
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isLoading || charCount >= MAX_INPUT_LENGTH}
            className={cn(
              "flex items-center justify-center",
              "w-9 h-9 rounded-full flex-shrink-0",
              "bg-gradient-to-b from-primary to-[#191b18]",
              "text-primary-foreground",
              "disabled:opacity-50 cursor-pointer",
              "hover:shadow-md transition-shadow"
            )}
            aria-label="Send message"
          >
            <ArrowUp className="size-4" />
          </button>
          </div>
          {charCount > 800 && (
            <p className={cn(
              "text-xs text-right pr-1 transition-colors",
              charCount >= MAX_INPUT_LENGTH ? "text-destructive" : "text-muted-foreground"
            )}>
              {charCount}/{MAX_INPUT_LENGTH}
            </p>
          )}
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
