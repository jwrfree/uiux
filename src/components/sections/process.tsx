import React from 'react';
import { Gem, Zap, Repeat } from 'lucide-react';

const processData = [
  {
    icon: Gem,
    title: "Research & Discovery",
    description: "I start every project by deeply understanding your users, business goals, and competitive landscape. Through interviews, surveys, and analytics, I uncover insights that drive smart design decisions.",
    stat: "20+",
    statUnit: "Hours",
    statLabel: "Average research time per project",
  },
  {
    icon: Zap,
    title: "Design & Iteration",
    description: "Rapid prototyping and constant iteration are at the heart of my process. I create interactive prototypes in Figma, test with real users, and refine until we achieve the perfect experience.",
    stat: "5-7",
    statUnit: "Days",
    statLabel: "Per design sprint cycle",
  },
  {
    icon: Repeat,
    title: "Testing & Refinement",
    description: "Great design is never finished. I continuously test, gather feedback, and optimize based on real user behavior and data. The result? Experiences that truly resonate with your audience.",
    stat: "95%",
    statUnit: null,
    statLabel: "Client satisfaction rate",
  },
];

const ProcessSection = () => {
    return (
        <section className="py-20 lg:py-40 bg-background text-foreground relative overflow-clip">
            <div 
                aria-hidden="true" 
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            >
                <div className="text-[clamp(18rem,25vw,25rem)] font-medium leading-none text-secondary/60 whitespace-nowrap -z-10">
                    Process
                </div>
            </div>

            <div className="container relative z-10">
                <h2 className="text-4xl md:text-5xl font-medium !leading-tight text-center max-w-4xl mx-auto text-balance text-text-dark-secondary">
                    My approach is <span className="text-text-dark">collaborative</span> and the results are <span className="text-text-dark">user-centered.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-24 md:gap-y-0 md:gap-x-8 lg:gap-x-16 mt-24 md:mt-32">
                    {processData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="mb-8">
                                    <Icon className="w-16 h-16 text-gray-400" strokeWidth={1} />
                                </div>
                                <div className="flex flex-col items-center gap-4 flex-grow">
                                  <h3 className="text-lg font-semibold text-text-dark">{item.title}</h3>
                                  <p className="text-base text-text-dark-secondary leading-relaxed max-w-[320px]">
                                      {item.description}
                                  </p>
                                </div>
                                <div className="mt-8 pt-8">
                                    <p className="text-[120px] font-medium leading-none text-text-dark">
                                        {item.stat}
                                        {item.statUnit && <span className="text-7xl align-middle"> {item.statUnit}</span>}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-3 max-w-[140px] mx-auto">
                                        {item.statLabel}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;