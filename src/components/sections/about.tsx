import { ArrowRight } from 'lucide-react';
import React from 'react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const services: string[] = [
    "User research & competitive analysis",
    "Wireframing & interactive prototyping",
    "Visual design & brand systems",
    "Responsive web & mobile interfaces",
    "Usability testing & optimization",
  ];

  return (
    <section className="bg-background text-foreground py-20 sm:py-24 md:py-32 overflow-x-clip">
      <div className="container">
        <div id="about" className="flex flex-col">
          <ScrollReveal
            as="h1"
            containerClassName="my-0"
            textClassName="font-display text-[40px] md:text-[64px] font-medium leading-[1.3] -tracking-[0.015em] text-balance"
          >
            UI/UX designer with 3 years of experience creating user-centered designs that drive business results and delight users.
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div className="flex flex-col gap-8 md:gap-12 items-start justify-between md:max-w-[80%]">
              <div className="flex flex-col gap-4">
                <p className="font-body text-base md:text-lg font-semibold leading-relaxed text-balance">
                  I'm looking for a collaborative team environment where design thinking and user research drive product decisions.
                </p>
                <p className="font-body text-base md:text-lg leading-relaxed opacity-60">
                  My approach combines deep user empathy with business acumen. I thrive in cross-functional teams, working alongside product managers and engineers to ship products that users love and that meet company goals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center font-medium leading-none -tracking-[0.025em]">
                <p className="text-[22px] lg:text-[28px] bg-gradient-to-b from-text-dark to-[rgba(35,37,34,0.4)] bg-clip-text text-transparent">
                  <span className="opacity-40">Open to</span>
                  <br />
                  <span>Remote & Hybrid</span>
                </p>
                <Button variant="primary" size="lg" asChild className="group hover:shadow-2xl hover:shadow-primary/30 rounded-full">
                  <a href="mailto:wruhantojati@gmail.com">
                    <span className="font-body font-medium leading-none">Get in Touch</span>
                    <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-1 transition-all duration-700 ease-in-out">
                        <ArrowRight size={16} />
                    </div>
                  </a>
                </Button>
              </div>
            </div>
            <ul className="flex flex-col gap-2 list-none m-0 p-0">
              {services.flatMap((service, index) => (
                <React.Fragment key={index}>
                  <li>
                    <hr className="border-t border-border m-0" />
                  </li>
                  <li className="flex items-center gap-3">
                    <ArrowRight className="size-6 text-foreground flex-shrink-0" />
                    <p className="font-body text-base md:text-lg font-semibold">
                      {service}
                    </p>
                  </li>
                </React.Fragment>
              ))}
              <li className="border-t border-border"></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
