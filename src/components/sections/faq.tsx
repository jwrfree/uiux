"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollAnimation } from "../ui/scroll-animation";
const faqItems = [
  {
    value: "item-1",
    question: "What industries have you shipped for recently?",
    answer:
      "I partner with civic tech, behavior-change, fintech, and F&B teams. Recent case studies include Teknovo’s B2B platform, Metta’s omnichannel dining flow, and an AI ops assistant for compliance leads. Each brief blends research-heavy discovery with measurable product goals.",
  },
  {
    value: "item-2",
    question: "How do you kick off a new engagement?",
    answer:
      "Week 0 is for alignment: stakeholder interviews, KPI framing, and a research plan. The first sprint usually covers 3–5 user interviews, baseline analytics, and artifacts like journey maps or service blueprints so everyone agrees on the problem before pixels.",
  },
  {
    value: "item-3",
    question: "How do you collaborate with product and engineering?",
    answer:
      "I work embedded with PM/eng squads—running async standups, sharing Loom walkthroughs, and handing off annotated Figma specs plus motion prototypes. For Teknovo, this kept copy, CMS, and dev in sync, while the Vidio system used tokens + code-ready documentation to speed QA.",
  },
  {
    value: "item-4",
    question: "What metrics do you optimize for?",
    answer:
      "Every project ships with a success metric. Examples: +37% onboarding completion for a civic tool, +60% session time for a mentor brand site, and 18% fewer checkout drop-offs for Bukunest. I rely on Mixpanel, GA4, and in-product telemetry to validate design bets.",
  },
  {
    value: "item-5",
    question: "Are you open to remote, hybrid, or onsite roles?",
    answer:
      "Yes. I’m based in Indonesia but comfortable overlapping with APAC and partial EU hours. I’m available for full-time roles and long-form contracts, and can travel for key workshops or quarterly planning when needed.",
  },
  {
    value: "item-6",
    question: "How soon can you start and what’s your timeline?",
    answer:
      "I can start within 2–3 weeks and can ramp up faster if the team needs support sooner. A typical sprint cadence is 5–7 business days for ideation through prototype, plus an extra week for testing and refinements. Larger engagements include quarterly roadmap reviews to keep outcomes tied to business goals.",
  },
];

const Faq = () => {
  return (
    <section className="bg-background py-20 sm:py-24 md:py-40 lg:py-48">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.35fr_0.65fr] md:gap-16">
          <ScrollAnimation>
            <h2 className="font-display text-5xl font-medium leading-[1.1] tracking-tight text-balance bg-gradient-to-b from-gradient-text-start to-gradient-text-end bg-clip-text text-transparent md:text-7xl">
                Your Questions,
                <br />
                Answered
            </h2>
          </ScrollAnimation>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <ScrollAnimation key={item.value} delay={150 * (index + 1)}>
                <AccordionItem
                    value={item.value}
                    className="border-b border-border-subtle"
                >
                    <AccordionTrigger className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-all duration-300 hover:no-underline">
                    <span className="flex-1 pr-4 text-xl font-semibold text-text-dark md:text-2xl">
                        {item.question}
                    </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pr-10 text-lg leading-relaxed text-muted-foreground md:text-xl transition-all duration-300 data-[state=closed]:translate-y-2 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100">
                    {item.answer}
                    </AccordionContent>
                </AccordionItem>
              </ScrollAnimation>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
