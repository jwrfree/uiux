'use client';

import Header from '@/components/sections/header';
import HeroSection from '@/components/sections/hero';
import dynamic from 'next/dynamic';

const AboutSection = dynamic(() => import('@/components/sections/about'));
const ProcessSection = dynamic(() => import('@/components/sections/process'));
const ProjectsShowcase = dynamic(() => import('@/components/sections/projects-showcase'));
const Faq = dynamic(() => import('@/components/sections/faq'));
const CtaSection = dynamic(() => import('@/components/sections/cta'));

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
