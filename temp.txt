"use client";

import Link from "next/link";
import { ArrowRight, PauseCircle, PlayCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
      staggerChildren: 0.1,
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
          <source src="/videos/hero_video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 w-full h-full z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.6)]"></div>

      <motion.div
        variants={reduceMotion ? staticContainerVariants : containerVariants}
        initial={initialVariant}
        animate="visible"
        className="relative z-[2] container flex flex-col items-center justify-center h-full text-center py-20 md:py-24 lg:py-32"
      >
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            onClick={() => setIsVideoPaused((v) => !v)}
          >
            {isVideoPaused ? (
              <>
                <PlayCircle className="h-4 w-4 mr-2" />
                <span>Play Reel</span>
              </>
            ) : (
              <>
                <PauseCircle className="h-4 w-4 mr-2" />
                <span>Pause Reel</span>
              </>
            )}
          </Button>
        </div>
        <h1 className="font-display font-bold text-white text-balance text-[2.5rem] leading-[1.1] md:text-[3.5rem] lg:text-[4.5rem] tracking-[-0.02em] max-w-4xl">
          <motion.span 
            className="inline-block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
            variants={reduceMotion ? staticItemVariants : itemVariants}
            initial={initialVariant}
            animate="visible"
           >
            Crafting Product Narratives People Feel
          </motion.span>
        </h1>
        <motion.p 
          className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
          variants={reduceMotion ? staticItemVariants : itemVariants}
          initial={initialVariant}
          animate="visible"
        >
          <span>From behavior change platforms to mission-critical workflows, I craft intuitive journeys that balance empathy, clarity, and measurable results.</span>
        </motion.p>
        <motion.div 
          className="mt-10 flex flex-row flex-wrap justify-center gap-4"
          variants={
            reduceMotion
              ? staticCtaVariants
              : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.8 } } }
          }
          initial={initialVariant}
          animate="visible"
        >
          <Button asChild variant="primary" size="xl" className="group rounded-full">
            <Link href="#work" onClick={(e) => handleScrollTo(e, "#work")}>
              <span className="font-semibold drop-shadow-sm">Explore Case Studies</span>
                <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                    <ArrowRight className="h-4 w-4" />
                </div>
            </Link>
          </Button>
          <Button asChild variant="frosted" size="xl" className="group rounded-full text-white dark:text-white">
            <a href="/resume.pdf" download>
              <span className="font-semibold drop-shadow-sm">Get the Resume</span>
              <div className="w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out h-6">
                <DotLottieReact
                  src="https://lottie.host/91e26116-2e02-4baf-b68b-698eed7bd6ed/uPo6YVr1Oa.lottie"
                  loop
                  autoplay
                  width={24}
                  height={24}
                />
              </div>
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        onClick={(e) => handleScrollTo(e, "#about")}
        className="absolute z-[2] bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 cursor-pointer"
        style={{ width: '50px', height: '50px' }}
      >
        <DotLottieReact
            src="https://lottie.host/02ea0f83-ebc3-40b2-b381-17a8d8b711d3/2tBUg5ux5t.lottie"
            loop
            autoplay
        />
      </a>

      <div className="absolute bottom-0 left-0 right-0 z-[2] w-full py-8 md:py-12">
        <LogoCarousel />
      </div>
    </section>
  );
};

export default HeroSection;
