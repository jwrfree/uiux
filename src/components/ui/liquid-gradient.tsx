"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const LiquidGradient = ({ className }: { className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Blob 1 - Indigo */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-indigo-600/30 blur-[120px]"
        style={{
          x: springX,
          y: springY,
          translateX: "-20%",
          translateY: "-20%",
        }}
      />
      {/* Blob 2 - Cyan */}
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-cyan-400/20 blur-[120px]"
        style={{
          x: springX,
          y: springY,
          translateX: "10%",
          translateY: "10%",
        }}
      />
      {/* Blob 3 - Pink/Magenta Glow */}
      <motion.div
        className="absolute top-[20%] right-[20%] h-[40%] w-[40%] rounded-full bg-fuchsia-500/20 blur-[120px]"
        animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        }}
      />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
    </div>
  );
};
