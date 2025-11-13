
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const AnimatedMenuIcon = ({ isOpen, isHovered }: {isOpen: boolean;isHovered: boolean;}) =>
<div className="relative w-6 h-6 flex items-center justify-center">
    <span
    className={`block absolute h-[2px] w-6 bg-foreground rounded-full transition-all duration-300 ease-out ${
    isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : isHovered ? "top-[5px]" : "top-[8px]"}`}
    />

    <span
    className={`block absolute h-[2px] w-6 bg-foreground rounded-full transition-all duration-300 ease-out ${
    isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : isHovered ? "top-[19px]" : "top-[16px]"}`}
    />

  </div>;

const menuContainerVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeOut",
      when: "afterChildren",
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const menuListVariants = {
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const menuItemVariants = {
  closed: {
    opacity: 0,
    y: 10,
    transition: { type: "tween", ease: "easeIn", duration: 0.2 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.3 },
  },
};


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
        window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.startsWith("/#");
    
    if (isAnchor) {
        e.preventDefault();
        const target = href.substring(1); // -> "#work"
        closeMenu();
        // Use a small delay to allow the menu closing animation to start
        setTimeout(() => {
            gsap.to(window, { 
                duration: 1.5, 
                scrollTo: target, 
                ease: "power2.inOut",
            });
        }, 300); // 300ms delay
    } else {
        closeMenu();
    }
};


  const getBoxShadow = () => {
    const inset = 'inset 0 1px 0 rgba(255, 255, 255, 0.8)';
    if (isMenuOpen || isHeaderHovered) {
      return `0 8px 32px rgba(0, 0, 0, 0.1), ${inset}`;
    }
    return `0 2px 4px rgba(0, 0, 0, 0.02), ${inset}`;
  };


  return (
    <header 
      className="fixed top-0 z-50 w-full p-4 md:p-6 lg:p-8 pointer-events-none flex justify-center"
    >
      <motion.div
        className={`w-full max-w-[calc(100vw-2rem)] sm:max-w-md md:max-w-lg mx-auto pointer-events-auto transition-transform duration-500 ease-out origin-center`}
        initial={{ scale: 1 }}
        animate={{ scale: isScrolled ? 0.8 : 1 }}
        >
        
        <div 
          className="flex justify-center"
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          <motion.div
            className="relative rounded-[36px] w-full origin-center"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 1, 0.5, 1],
              delay: 0.1
            }}
            style={{
              background: 'rgba(250, 250, 249, 0.6)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: getBoxShadow(),
              transition: 'box-shadow 0.3s ease-out'
            }}>

            {/* Glass shine effect */}
            <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="animate-shine absolute inset-0 rounded-[36px] opacity-50 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 25%, rgba(255, 255, 255, 0.3) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
              }}
            />

            {/* Header Bar */}
            <div className={`relative h-[72px] grid grid-cols-3 items-center z-10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMenuOpen ? 'px-6' : 'px-3'}`}>
              <motion.div 
                className="flex justify-start items-center h-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link
                  href="/"
                  aria-label="Home"
                  onClick={closeMenu}
                  className="flex items-center justify-start ml-2 lg:ml-4 transition-transform duration-300 hover:scale-105">
                  <span className="text-2xl md:text-3xl font-medium bg-gradient-to-b from-[#232522] to-[rgba(35,37,34,0.4)] text-transparent bg-clip-text">UI/UX</span>
                </Link>
              </motion.div>

              <div className="flex justify-center items-center h-full">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group flex items-center justify-center w-12 h-12 cursor-pointer rounded-full transition-all duration-300 hover:bg-black/5 active:scale-95"
                  aria-label="Toggle menu">
                  <AnimatedMenuIcon isOpen={isMenuOpen} isHovered={isHovered} />
                </button>
              </div>

              <motion.div 
                className="flex justify-end items-center h-full"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button asChild variant="primary" size="lg" className="group hidden md:flex rounded-full">
                  <a href="mailto:wruhantojati@gmail.com">
                    <span>Get in Touch</span>
                    <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </a>
                </Button>
                <Button asChild variant="primary" size="icon" className="group md:hidden rounded-full w-12 h-12">
                  <a href="mailto:wruhantojati@gmail.com">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-30deg] group-hover:scale-110" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={menuContainerVariants}
                  className="overflow-visible"
                >
                  <motion.ul
                    variants={menuListVariants}
                    className="flex flex-col gap-2 pt-2 pb-8"
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {[
                      { href: "/about", label: "About Me" },
                      { href: "/#work", label: "My Work" },
                      { href: "/contact", label: "Contact" },
                    ].map((item) => (
                      <motion.li 
                        key={item.href} 
                        variants={menuItemVariants}
                        onMouseEnter={() => setHoveredLink(item.href)}
                        >
                        <Link
                          href={item.href}
                          onClick={(e) => handleMenuClick(e, item.href)}
                          className="block text-center text-2xl md:text-3xl font-medium text-foreground transition-all duration-300 py-3"
                          style={{
                            opacity: hoveredLink && hoveredLink !== item.href ? 0.5 : 1,
                          }}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
