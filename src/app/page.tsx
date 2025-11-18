"use client";

import Header from '@/components/sections/header';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ProcessSection from '@/components/sections/process';
import ProjectsShowcase from '@/components/sections/projects-showcase';
import Faq from '@/components/sections/faq';
import CtaSection from '@/components/sections/cta';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <ProjectsShowcase />
        <Faq />
        <CtaSection />
      </main>
      {/* Footer is rendered globally in layout */}
    </div>
  );
}
