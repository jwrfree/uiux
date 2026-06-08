
"use client";

import { ArrowRight, Pause, Play } from "lucide-react";
import React from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import dynamic from 'next/dynamic';
import { ScrollAnimation } from "../ui/scroll-animation";
import { Magnetic } from "../ui/magnetic";

gsap.registerPlugin(ScrollToPlugin);

const DotLottieReact = dynamic(() => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact), { ssr: false });

const HeroSection = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const [isVideoPaused, setIsVideoPaused] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

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
          preload="metadata"
          poster="/images/hero-poster.webp"
          ref={videoRef}
        >
          <source src="/videos/hero_video.webm" type="video/webm" />
          <source src="/videos/hero_video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 w-full h-full z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.6)]"></div>

      <div
        className="relative z-[2] container px-8 sm:px-12 lg:px-20 flex flex-col items-center justify-center h-full text-center py-20 md:py-24 lg:py-32"
      >
        <ScrollAnimation>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20/50 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/80 backdrop-blur-md whitespace-nowrap">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                Available for Full-Time Roles
            </span>
        </ScrollAnimation>
        <ScrollAnimation delay={150}>
            <h1 className="mt-6 font-display font-bold text-white text-balance text-[2.5rem] leading-[1.12] md:text-[3.5rem] lg:text-[4.25rem] tracking-[-0.02em] max-w-5xl">
                <span className="block bg-gradient-to-b from-white to-white/65 bg-clip-text text-transparent py-2">
                    Human-centered experiences,
                </span>
                <span className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent py-2">
                    measurable results.
                </span>
            </h1>
        </ScrollAnimation>
        <ScrollAnimation delay={300}>
            <p className="mt-6 w-full max-w-3xl lg:max-w-4xl text-lg text-white/80 md:text-xl font-medium">
                <span>Mid-level UI/UX designer with 3+ years shipping behavior-change platforms and civic tools, where I've nudged over 10,000 users toward better habits and lifted onboarding completion by 37%.</span>
            </p>
        </ScrollAnimation>
        <ScrollAnimation delay={450}>
            <div className="mt-10 flex flex-row flex-wrap justify-center gap-4">
                <Magnetic>
                    <Button asChild size="xl" className="group rounded-full w-full sm:w-auto bg-white text-black hover:bg-white/90">
                        <a href="#work" onClick={(e) => handleScrollTo(e, "#work")} className="flex items-center justify-center">
                        <span className="font-medium sm:font-semibold drop-shadow-sm">Explore Case Studies</span>
                            <div className="w-0 opacity-0 sm:group-hover:w-4 sm:group-hover:opacity-100 sm:group-hover:ml-2 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </a>
                    </Button>
                </Magnetic>
                <Magnetic>
                    <Button asChild size="xl" className="group rounded-full text-white w-full sm:w-auto border border-white/20 backdrop-blur-lg saturate-150 bg-black/30 hover:bg-black/40 hover:border-white/30">
                        <a href="/resume.pdf" download className="flex items-center justify-center">
                        <span className="font-medium sm:font-semibold drop-shadow-sm">Download Resume</span>
                        {isMounted && <div className="w-0 opacity-0 sm:group-hover:w-6 sm:group-hover:opacity-100 sm:group-hover:ml-2 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] h-6">
                            <DotLottieReact
                            src="https://lottie.host/91e26116-2e02-4baf-b68b-698eed7bd6ed/uPo6YVr1Oa.lottie"
                            loop
                            autoplay
                            width={24}
                            height={24}
                            style={{ filter: "invert(1)" }}
                            />
                        </div>}
                        </a>
                    </Button>
                </Magnetic>
            </div>
        </ScrollAnimation>
      </div>

      {isMounted && <ScrollAnimation delay={600} className="absolute z-[2] bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center items-end">
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
      </ScrollAnimation>}

        <Button
            variant="secondary"
            size="icon"
            className="absolute z-[2] bottom-8 right-4 sm:right-6 md:right-10 rounded-full text-white/90 w-10 h-10 sm:w-12 sm:h-12 active:scale-95 hover:scale-105 transition-transform backdrop-blur-lg saturate-150 bg-black/30 hover:bg-black/40"
            onClick={() => setIsVideoPaused((v) => !v)}
            aria-label={isVideoPaused ? "Play" : "Pause"}
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
    </section>
  );
};

export default HeroSection;
