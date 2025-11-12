
import React from 'react';
import { ScrollAnimation } from './scroll-animation';

const timelineData = [
  {
    year: "2020",
    title: "Mechatronics Engineering",
    description: "Learned systems thinking",
    isLast: false,
  },
  {
    year: "2023",
    title: "UX Bootcamp",
    description: "Formalized design skills",
    isLast: false,
  },
  {
    year: "2023",
    title: "Waste Management",
    description: "First real-world impact",
    isLast: false,
  },
  {
    year: "2024",
    title: "Funeral Services",
    description: "Designing for empathy",
    isLast: false,
  },
  {
    year: "Now",
    title: "Open to opportunities",
    description: "",
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
          <div className="w-px h-16 bg-border ml-20 mt-1"></div>
        )}
      </div>
      <div className="pt-px pl-2">
        <p className="font-semibold text-text-dark">{title}</p>
        {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
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
