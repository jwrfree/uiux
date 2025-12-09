
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '../ui/scroll-animation';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const AboutSection = () => {
  const stats = [
    { value: "3+", label: "years in product teams" },
    { value: "10K+", label: "people nudged toward better habits" },
    { value: "92%", label: "task success after redesigns" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    gsap.to(window, { duration: 1.5, scrollTo: target, ease: "power2.inOut" });
  };

  return (
    <section className="bg-background text-foreground py-20 sm:py-24 md:py-32 overflow-x-clip">
      <div className="container">
        <div id="about" className="flex flex-col items-center text-center">
          <div className="space-y-8 max-w-4xl">
            <ScrollAnimation>
                <h1 className="my-0 font-display text-[42px] md:text-[72px] font-medium leading-[1.15] -tracking-[0.02em] text-balance bg-gradient-to-b from-text-dark to-[rgba(35,37,34,0.4)] bg-clip-text text-transparent">
                I help civic and behavior-change teams deliver humane experiences backed by measurable outcomes.
                </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={150}>
                <p className="text-lg md:text-xl max-w-3xl mx-auto text-text-secondary">
                I believe the best digital tools are the ones that quietly empower people. My focus is on civic tech and behavior-change products because I&apos;m driven by the challenge of creating interfaces that aren&apos;t just easy to use, but also genuinely guide users toward positive actions. It&apos;s about designing with purpose.
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={300}>
                <div className="grid gap-4 text-left max-w-2xl mx-auto">
                <div className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-sm text-center">
                    <p className="text-sm font-semibold text-text-dark">Collaborating for Clarity</p>
                    <p className="text-base text-text-dark/70">I thrive in cross-functional teams, turning complex requirements into clear solutions.</p>
                </div>
                <div className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-sm text-center">
                    <p className="text-sm font-semibold text-text-dark">Designing with Intent</p>
                    <p className="text-base text-text-dark/70">I blend behavioral science and user data to ensure every feature is intuitive and impactful.</p>
                </div>
                </div>
            </ScrollAnimation>
          </div>
          <div className="mt-16 w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {stats.map((stat, index) => (
                <ScrollAnimation key={stat.label} delay={450 + index * 150}>
                    <div className="rounded-3xl border border-border/70 bg-white/40 px-4 py-6 shadow-lg text-center">
                        <p className="text-4xl font-display font-semibold text-text-dark">{stat.value}</p>
                        <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">{stat.label}</p>
                    </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
            <ScrollAnimation delay={900}>
                <Button asChild variant="link" className="mt-16 text-lg group">
                    <a href="#work" onClick={(e) => handleScrollTo(e, "#work")}>
                        See my work in action
                        <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                </Button>
            </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
