"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

const faqItems = [
  {
    value: "item-1",
    question: "What's your design process?",
    answer:
      "I start with research and discovery to deeply understand users and business goals. Then I move into wireframing and prototyping, followed by visual design and iteration based on feedback from stakeholders and user testing. I believe in continuous collaboration with product and engineering throughout the process.",
  },
  {
    value: "item-2",
    question: "What type of role are you seeking?",
    answer:
      "I'm looking for a senior UI/UX designer role where I can contribute to meaningful product work. I thrive in collaborative environments with cross-functional teams and am particularly interested in companies that value user research and design thinking. Open to remote or hybrid arrangements.",
  },
  {
    value: "item-3",
    question: "How do you handle feedback and iteration?",
    answer:
      "I view feedback as essential to creating great designs. I actively seek input from users, stakeholders, and team members throughout the design process. I'm comfortable presenting and defending design decisions while remaining open to alternative perspectives that better serve users and business goals.",
  },
  {
    value: "item-4",
    question: "What tools do you use?",
    answer:
      "I'm proficient in Figma, Adobe XD, and Sketch for design work. For prototyping, I use Figma, Framer, and Principle. I'm comfortable with collaboration tools like Miro, FigJam, and Notion. I also have experience with HTML/CSS and can work closely with developers to ensure design feasibility.",
  },
  {
    value: "item-5",
    question: "What's your experience with design systems?",
    answer:
      "I have extensive experience building and maintaining design systems from scratch. I understand the importance of consistency, scalability, and documentation. I've worked with both established systems and have created new component libraries that serve multiple product teams.",
  },
  {
    value: "item-6",
    question: "How do you approach user research?",
    answer:
      "I believe research should inform every design decision. I conduct user interviews, usability testing, competitive analysis, and work closely with data teams to understand user behavior. I translate research findings into actionable insights that guide the design process and help teams build with empathy.",
  },
];

const Faq = () => {
  return (
    <section className="bg-background py-20 sm:py-24 md:py-40 lg:py-48">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.35fr_0.65fr] md:gap-16">
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-balance bg-gradient-to-b from-gradient-text-start to-gradient-text-end bg-clip-text text-transparent md:text-[56px]">
            Frequently
            <br />
            asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem
                value={item.value}
                key={item.value}
                className="border-b border-border-subtle"
              >
                <AccordionTrigger className="group flex w-full items-center justify-between py-6 text-left hover:no-underline">
                  <span className="flex-1 pr-4 text-lg font-semibold text-text-dark md:text-xl">
                    {item.question}
                  </span>
                  <div className="ml-4 flex-shrink-0">
                    <Plus className="h-6 w-6 text-text-dark transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-10">
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;