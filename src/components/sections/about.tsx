import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const stats = [
    { value: "3+", label: "years in product teams" },
    { value: "10K+", label: "people nudged toward better habits" },
    { value: "92%", label: "task success after redesigns" },
  ];

  const services = [
    {
      title: "Behavior research",
      description: "Qual interviews, diary studies, and Jobs-to-be-Done mapping for high-stakes problems.",
    },
    {
      title: "Systems & journeys",
      description: "Service blueprints, responsive UI kits, and measurable product narratives.",
    },
    {
      title: "Rapid prototyping",
      description: "End-to-end Figma flows, usability testing, and dev handoff that scales.",
    },
    {
      title: "Optimization & growth",
      description: "Experiment design, onboarding uplift, and KPI instrumentation with PMs.",
    },
  ];

  return (
    <section className="bg-background text-foreground py-20 sm:py-24 md:py-32 overflow-x-clip">
      <div className="container">
        <div id="about" className="flex flex-col">
          <div className="space-y-6">
            <h1 className="my-0 font-display text-[42px] md:text-[72px] font-medium leading-[1.15] -tracking-[0.02em] text-balance bg-gradient-to-b from-text-dark to-[rgba(35,37,34,0.4)] bg-clip-text text-transparent">
              I help mid-stage teams ship humane, measurable product experiences.
            </h1>
            <div className="grid gap-4 text-left">
              <div className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-sm">
                <p className="text-sm font-semibold text-text-dark">Cross-functional by default</p>
                <p className="text-base text-text-dark/70">Partnering with PMs, researchers, and engineers from discovery to release.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-sm">
                <p className="text-sm font-semibold text-text-dark">Quant & qual blended</p>
                <p className="text-base text-text-dark/70">Mixing behavior science, data, and motion craft to ship measurable outcomes.</p>
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="flex flex-col gap-8 md:gap-12 items-start justify-between md:max-w-[80%]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-border/70 bg-white/40 px-4 py-6 shadow-lg text-start">
                    <p className="text-3xl font-display font-semibold text-text-dark">{stat.value}</p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center font-medium leading-none -tracking-[0.025em] w-full">
                <div className="text-left">
                  <p className="text-[22px] lg:text-[28px] bg-gradient-to-b from-text-dark to-[rgba(35,37,34,0.4)] bg-clip-text text-transparent">
                    <span className="opacity-40">Preferred setup</span>
                    <br />
                    <span>Remote · Hybrid · Onsite</span>
                  </p>
                </div>
                <Button variant="secondary" size="xl" asChild className="group hover:shadow-2xl hover:shadow-primary/30 rounded-full w-full sm:w-auto">
                  <a href="/resume.pdf" download>
                    <span className="font-medium sm:font-semibold drop-shadow-sm">Download Resume</span>
                    <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                        <ArrowRight className="h-4 w-4" />
                    </div>
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-[32px] border border-border/70 bg-white/60/50 p-8 shadow-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-text-dark/70 mb-4">How I deliver</h3>
              <ul className="flex flex-col gap-4 list-none m-0 p-0">
                {services.map((service) => (
                  <li key={service.title} className="flex items-start gap-3">
                    <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-black/5 text-text-dark">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-body text-lg font-semibold text-text-dark">{service.title}</p>
                      <p className="text-base text-text-secondary">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
