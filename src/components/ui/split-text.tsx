
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
        staggerChildren: word ? 0.05 : 0.015,
      },
    },
  };

  const childVariants = {
    hidden: { 
        // Start with the text completely masked from the bottom
        clipPath: 'inset(0 0 100% 0)',
    },
    visible: { 
        // Animate to reveal the text completely
        clipPath: 'inset(0 0 0% 0)',
        transition: {
            ease: "easeOut",
            duration: 0.8,
        },
    },
  };

  return (
    <motion.div
      style={{ display: 'inline-block' }} // No overflow:hidden needed here
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {(word ? words : characters).map((unit, index) => (
        <motion.span 
          key={index} 
          style={{ 
            display: 'inline-block', 
            paddingRight: word ? '0.25em' : '0' 
          }}
          variants={childVariants}
        >
          {unit}
        </motion.span>
      ))}
    </motion.div>
  );
};
