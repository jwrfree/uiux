
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ScrollAnimation } from './scroll-animation';

interface Section {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -75% 0px', threshold: 0 }
    );

    const elements = sections.map(({ id }) => document.getElementById(id)).filter(el => el);
    elements.forEach((el) => observer.current?.observe(el!));

    return () => {
        elements.forEach((el) => observer.current?.unobserve(el!));
    };
  }, [sections]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Manually set active section on click for instant feedback
        setActiveSection(id); 
    }
  };

  return (
    <nav className="hidden lg:block sticky top-36">
        <ScrollAnimation>
            <div className="border rounded-2xl p-4 bg-secondary/50 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-4 text-text-dark">Table of Contents</h3>
                <ul className="space-y-2">
                {sections.map((section) => (
                    <li key={section.id}>
                    <Link
                        href={`#${section.id}`}
                        onClick={(e) => handleLinkClick(e, section.id)}
                        className={cn(
                        'block text-text-secondary transition-all duration-300 hover:text-primary hover:pl-2',
                        activeSection === section.id
                            ? 'text-primary font-semibold pl-2 border-l-2 border-primary'
                            : ''
                        )}
                    >
                        {section.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
        </ScrollAnimation>
    </nav>
  );
}

    