"use client";

import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

gsap.registerPlugin(ScrollToPlugin);

const toolLogos = [
  { name: "Figma" },
  { name: "Adobe XD" },
  { name: "Sketch" },
  { name: "InVision" },
  { name: "Framer" },
  { name: "Zeplin" },
  { name: "Principle" },
];

function LogoCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  
  const extendedLogos = [...toolLogos, ...toolLogos];

  return (
    <div className="w-full">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex items-center">
          {extendedLogos.map((logo, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_auto] min-w-0 px-8"
            >
              <div className="flex h-10 items-center justify-center">
                 <span className="text-2xl font-medium text-white/60 transition-colors">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ease: "easeOut",
      duration: 0.8,
    },
  },
};

const staticContainerVariants = { visible: { opacity: 1 } };
const staticItemVariants = {
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const staticCtaVariants = { visible: { opacity: 1, y: 0 } };

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const [isVideoPaused, setIsVideoPaused] = React.useState(reduceMotion);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isVideoPaused) {
      v.pause();
    } else {
      v.play().catch(() => {});
    }
  }, [isVideoPaused]);

  React.useEffect(() => {
    if (reduceMotion) {
      setIsVideoPaused(true);
    }
  }, [reduceMotion]);

  const initialVariant = reduceMotion ? "visible" : "hidden";
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    gsap.to(window, { duration: 1.5, scrollTo: target, ease: "power2.inOut" });
  };

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full z-0 opacity-80">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" 
          ref={videoRef}
        >
          <source src="/videos/hero_video.webm" type="video/webm" />
          <source src="/videos/hero_video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 w-full h-full z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.6)]"></div>

      <motion.div
        variants={reduceMotion ? staticContainerVariants : containerVariants}
        initial={initialVariant}
        animate="visible"
        className="relative z-[2] container px-8 sm:px-12 lg:px-20 flex flex-col items-center justify-center h-full text-center py-20 md:py-24 lg:py-32"
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20/50 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/80 backdrop-blur-md whitespace-nowrap"
          variants={reduceMotion ? staticItemVariants : itemVariants}
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
          Open for full-time opportunities
        </motion.span>
        <motion.h1 
          className="mt-6 font-display font-bold text-white text-balance text-[2.5rem] leading-[1.12] md:text-[3.5rem] lg:text-[4.25rem] tracking-[-0.02em] max-w-5xl"
          variants={reduceMotion ? staticItemVariants : itemVariants}
        >
          <span 
            className="block bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent py-2"
          >
            Product Designer Driving Results
          </span>
          <span 
            className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent py-2"
          >
            Through Narrative & Data
          </span>
        </motion.h1>
        <motion.p 
          className="mt-6 w-full max-w-3xl lg:max-w-4xl text-lg text-white/80 md:text-xl font-medium"
          variants={reduceMotion ? staticItemVariants : itemVariants}
        >
          <span>Mid-level UI/UX designer with 3+ years shipping behavior-change platforms and civic tools—nudging 10,000+ users toward better habits and lifting onboarding completion by 37%.</span>
        </motion.p>
        <motion.div 
          className="mt-10 flex flex-row flex-wrap justify-center gap-4"
          variants={reduceMotion ? staticCtaVariants : itemVariants}
        >
          <Button asChild variant="primary" size="xl" className="group rounded-full w-full sm:w-auto">
            <Link href="#work" onClick={(e) => handleScrollTo(e, "#work")} className="flex items-center justify-center">
              <span className="font-medium sm:font-semibold drop-shadow-sm">Explore Case Studies</span>
                <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <ArrowRight className="h-4 w-4" />
                </div>
            </Link>
          </Button>
          <Button asChild variant="secondary" size="xl" className="group rounded-full w-full sm:w-auto">
            <a href="/resume.pdf" download className="flex items-center justify-center">
              <span className="font-medium sm:font-semibold drop-shadow-sm">Download Resume</span>
              <div className="w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 group-hover:ml-2 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] h-6">
                <DotLottieReact
                  src="https://lottie.host/91e26116-2e02-4baf-b68b-698eed7bd6ed/uPo6YVr1Oa.lottie"
                  loop
                  autoplay
                  width={24}
                  height={24}
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Controls */}
      <motion.div
        className="absolute z-[2] bottom-24 left-1/2 -translate-x-1/2 w-full flex justify-center items-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      >
        <a
            href="#about"
            onClick={(e) => handleScrollTo(e, "#about")}
            className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
            aria-label="Scroll down"
        >
            <DotLottieReact
                src="https://lottie.host/02ea0f83-ebc3-40b2-b381-17a8d8b711d3/2tBUg5ux5t.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
            />
        </a>
      </motion.div>

        <Button
            variant="secondary"
            size="icon"
            className="absolute z-[2] bottom-28 md:bottom-32 right-10 rounded-full text-white/90 w-10 h-10 sm:w-12 sm:h-12 active:scale-95 hover:scale-105 transition-transform"
            onClick={() => setIsVideoPaused((v) => !v)}
            aria-label={isVideoPaused ? "Play video" : "Pause video"}
        >
            <AnimatePresence mode="wait" initial={false}>
            {isVideoPaused ? (
                <motion.span
                key="play"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                >
                <Play className="h-5 w-5 fill-current" />
                </motion.span>
            ) : (
                <motion.span
                key="pause"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                >
                <Pause className="h-5 w-5 fill-current" />
                </motion.span>
            )}
            </AnimatePresence>
        </Button>

      <div className="absolute bottom-0 left-0 right-0 z-[2] w-full py-8 md:py-12">
        <LogoCarousel />
      </div>
    </section>
  );
};

export default HeroSection;
