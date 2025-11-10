
"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface SplitTextProps {
  text: string;
  word?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({ text, word }) => {
  const characters = text.split('');
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: word ? 0.05 : 0.015, // Adjusted stagger for a more natural rhythm
      },
    },
  };

  const childVariants = {
    hidden: { 
        y: 20, // Softer upward movement
        opacity: 0,
    },
    visible: { 
        y: 0,
        opacity: 1,
        transition: {
            ease: "easeOut", // Elegant ease-out transition
            duration: 0.8,    // Sligthly longer duration for a graceful feel
        },
    },
  };

  return (
    <motion.div
      style={{ display: 'inline-block', overflow: 'hidden' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {(word ? words : characters).map((unit, index) => (
        <motion.span 
          key={index} 
          style={{ display: 'inline-block', paddingRight: word ? '0.25em' : '0' }}
          variants={childVariants}
        >
          {unit}
        </motion.span>
      ))}
    </motion.div>
  );
};
