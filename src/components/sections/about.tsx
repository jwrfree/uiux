
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const stats = [
    { value: "3+", label: "years in product teams" },
    { value: "10K+", label: "people nudged toward better habits" },
    { value: "92%", label: "task success after redesigns" },
  ];

  return (
    <section className="bg-background text-foreground py-20 sm:py-24 md:py-32 overflow-x-clip">
      <div className="container">
        <div id="about" className="flex flex-col items-center text-center">
          <div className="space-y-6 max-w-4xl">
            <h1 className="my-0 font-display text-[42px] md:text-[72px] font-medium leading-[1.15] -tracking-[0.02em] text-balance bg-gradient-to-b from-text-dark to-[rgba(35,37,34,0.4)] bg-clip-text text-transparent">
              I help civic and behavior-change teams deliver humane experiences backed by measurable outcomes.
            </h1>
            <div className="grid gap-4 text-left max-w-2xl mx-auto">
              <div className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-sm text-center">
                <p className="text-sm font-semibold text-text-dark">A natural collaborator</p>
                <p className="text-base text-text-dark/70">Partnering with PMs, researchers, and engineers from discovery to release.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-white/70 px-4 py-3 shadow-sm text-center">
                <p className="text-sm font-semibold text-text-dark">Blending quant & qual</p>
                <p className="text-base text-text-dark/70">Mixing behavior science, data, and motion craft to deliver measurable results.</p>
              </div>
            </div>
          </div>
          <div className="mt-16 w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-border/70 bg-white/40 px-4 py-6 shadow-lg text-center">
                  <p className="text-4xl font-display font-semibold text-text-dark">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
