"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/components/ui/split-text";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const HeroSection = () => {
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
        >
          <source src="https://www.offmenu.design/videos/hero-video.webm" type="video/webm" />
          <source src="https://www.offmenu.design/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 w-full h-full z-[1] bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.6)]"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-[2] container flex flex-col items-center justify-center h-full text-center py-20 md:py-24 lg:py-32"
      >
        <h1 className="font-display font-black text-white text-balance text-[2.5rem] leading-[1.1] md:text-[3.5rem] lg:text-[4.5rem] tracking-[-0.02em] max-w-4xl">
          <motion.span 
            className="inline-block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
            variants={itemVariants}
           >
            Crafting Product Narratives People Feel
          </motion.span>
        </h1>
        <motion.p 
          className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
          variants={itemVariants}
        >
          I bridge research, strategy, and visual design to shape human-centered platforms that drive measurable business outcomes.
        </motion.p>
        <motion.div 
          className="mt-10 flex flex-row flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          <Button asChild variant="primary" size="xl" className="group rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 active:scale-95">
            <Link href="#work" onClick={(e) => handleScrollTo(e, "#work")}>
              Explore Case Studies
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="xl" className="group rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-secondary/50 active:scale-95">
            <a href="/resume.pdf" download>
              Get the Résumé
              <Download className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <a
        href="#about"
        onClick={(e) => handleScrollTo(e, "#about")}
        className="absolute z-[2] bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-center text-white/60 hover:text-white transition-all duration-300 ease-in-out group"
      >
        <span className="font-body text-xs tracking-widest uppercase animate-pulse group-hover:animate-none">
          Scroll
        </span>
        <ArrowDown className="w-6 h-6 transition-transform duration-300 ease-in-out transform group-hover:translate-y-1" />
      </a>

      <div className="absolute bottom-0 left-0 right-0 z-[2] w-full py-8 md:py-12">
        <LogoCarousel />
      </div>
    </section>
  );
};

export default HeroSection;
