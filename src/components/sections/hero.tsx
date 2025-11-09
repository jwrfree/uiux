"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

// Per instruction, using design tool logos. Assets unavailable, using text placeholders.
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

const HeroSection = () => {
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

      <div className="relative z-[2] container flex flex-col items-center justify-center h-full text-center py-20">
        <h1 className="font-display font-black text-white text-balance text-[2.5rem] leading-[1.1] md:text-[3.5rem] lg:text-[4.5rem] tracking-[-0.02em] max-w-4xl">
          Senior UI/UX Designer{" "}
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Seeking Full-Time Opportunities
          </span>
        </h1>
        <div className="mt-8 flex flex-row flex-wrap justify-center gap-3">
          <Link
            href="/#work" 
            className="inline-flex items-center justify-center px-6 py-5 rounded-full bg-primary text-primary-foreground font-medium text-base hover:opacity-90 transition-opacity leading-none"
          >
            View My Work
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center px-6 py-5 rounded-full bg-secondary text-secondary-foreground font-medium text-base hover:opacity-90 transition-opacity leading-none"
          >
            Download Resume
            <Download className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[2] w-full py-8 md:py-12">
        <LogoCarousel />
      </div>
    </section>
  );
};

export default HeroSection;