"use client";

import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatBubble({ isOpen, onClick }: ChatBubbleProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex items-center justify-center",
        "w-14 h-14 rounded-full",
        "bg-gradient-to-b from-primary to-[#191b18]",
        "text-primary-foreground shadow-lg",
        "cursor-pointer outline-none",
        "hover:shadow-xl transition-shadow duration-300"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      <motion.div
        key={isOpen ? "close" : "open"}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 90 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {isOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </motion.div>
    </motion.button>
  );
}
