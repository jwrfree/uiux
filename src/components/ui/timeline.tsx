
import React from 'react';
import { ScrollAnimation } from './scroll-animation';

const timelineData = [
  {
    year: "2020",
    title: "Mechatronics Engineering",
    description: "Graduated with a degree in Mechatronics. This is where I learned to think in systems and got my first taste of industrial design, sparking an interest in how people interact with technology.",
    isLast: false,
  },
  {
    year: "2023",
    title: "UX Design Bootcamp",
    description: "Made the leap into design by completing an intensive UX bootcamp. This is where I formally learned the principles of human-centered design, user research, and prototyping.",
    isLast: false,
  },
  {
    year: "2023",
    title: "Waste Management Project",
    description: "Applied my skills to a real-world problem, designing a system to help a community shift from burning waste to recycling. It was my first major project with measurable social impact.",
    isLast: false,
  },
  {
    year: "2024",
    title: "Funeral Services App",
    description: "Took on the challenge of designing for a highly sensitive context. This project taught me the importance of empathy and compassion in design, creating a digital service to support grieving families.",
    isLast: false,
  },
  {
    year: "Now",
    title: "Open to New Opportunities",
    description: "Seeking a full-time UI/UX design role where I can continue to solve complex problems and create meaningful experiences.",
    isLast: true,
  },
];

const TimelineItem = ({ year, title, description, isLast, delay }: { year: string, title: string, description: string, isLast: boolean, delay: number }) => (
  <ScrollAnimation delay={delay}>
    <div className="flex items-start">
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center">
          <span className="font-mono text-sm text-muted-foreground mr-2">{year}</span>
          <div className="flex items-center">
            <div className="h-px w-4 bg-border"></div>
            <div className="h-3 w-3 rounded-full bg-primary border-2 border-background ring-2 ring-primary"></div>
            <div className="h-px w-4 bg-border"></div>
          </div>
        </div>
        {!isLast && (
          <div className="w-px h-24 bg-border ml-20 mt-1"></div>
        )}
      </div>
      <div className="pt-px pl-2">
        <p className="font-semibold text-text-dark">{title}</p>
        {description && <p className="text-sm text-text-secondary mt-1 max-w-sm">{description}</p>}
      </div>
    </div>
  </ScrollAnimation>
);

const Timeline = () => {
  return (
    <div className="max-w-md mx-auto">
      {timelineData.map((item, index) => (
        <TimelineItem key={index} {...item} delay={index * 150} />
      ))}
    </div>
  );
};

export default Timeline;
