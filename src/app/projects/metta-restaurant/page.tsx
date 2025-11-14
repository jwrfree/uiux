

'use client';

import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { ArrowUpRight, Calendar, User, Wrench, Zap, Gem, Repeat, CheckCircle, BarChart, Users, Target, Search, Palette, TestTube, Lightbulb, UsersRound, MessageSquareQuote, FileText, TrendingUp, ShieldCheck, Scale } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImages from '@/lib/placeholder-images.json';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableOfContents } from "@/components/ui/table-of-contents";

const ProjectMettaPage = () => {
    const projectDetails = [
        { label: 'Role', value: 'Web Designer', icon: User },
        { label: 'Timeline', value: 'July 2024 (2 weeks)', icon: Calendar },
        { label: 'Tools', value: 'Figma, Miro, Adobe Photoshop', icon: Wrench },
    ];

    const finalDesigns = [
        placeholderImages.mettaFinal1,
        placeholderImages.mettaFinal2,
        placeholderImages.mettaFinal3,
        placeholderImages.mettaFinal4
    ];

    const competitorLogos = {
        cheesecake: "https://logo.clearbit.com/thecheesecakefactory.com",
        pfchangs: "https://logo.clearbit.com/pfchangs.com",
        nobu: "https://logo.clearbit.com/noburestaurants.com"
    }

    const sections = [
        { id: "overview", label: "Overview" },
        { id: "context", label: "Context & Challenge" },
        { id: "research", label: "Research & Discovery" },
        { id: "design-process", label: "Design Process" },
        { id: "key-decisions", label: "Key Decisions" },
        { id: "final-designs", label: "Final Designs" },
        { id: "reflection", label: "Reflection" },
    ];

    return (
        <div className="bg-background text-foreground">
            <Header />
            <main className="pt-32 md:pt-40 lg:pt-48">
                <div className="container mx-auto px-4">
                    <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
                        <div className="lg:order-2">
                             <TableOfContents sections={sections} />
                        </div>
                        <div className="lg:order-1">
                            {/* Hero Section */}
                            <section id="hero" className="mb-16 md:mb-24">
                                <ScrollAnimation>
                                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                                        <Image
                                            src={placeholderImages.mettaHero.src}
                                            alt="Metta Restaurant Website Hero Image"
                                            fill
                                            className="object-cover"
                                            data-ai-hint={placeholderImages.mettaHero.hint}
                                        />
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation delay={150}>
                                    <div className="mt-12 text-center max-w-4xl mx-auto">
                                        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-4 bg-gradient-to-r from-stone-800 to-stone-400 bg-clip-text text-transparent">
                                            Metta Restaurant Homepage Redesign
                                        </h1>
                                        <p className="text-lg md:text-xl text-text-dark-secondary">
                                            A homepage design proposal for a multi-cuisine restaurant platform, aimed at increasing reservation conversions and establishing a premium brand image.
                                        </p>
                                    </div>
                                </ScrollAnimation>
                            </section>

                            {/* Project Overview */}
                            <section id="overview" className="py-16 md:py-24 scroll-mt-24">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                                    <div className="lg:col-span-1">
                                        <ScrollAnimation>
                                            <h2 className="font-display text-3xl font-bold mb-6 text-text-dark">Project Info</h2>
                                        </ScrollAnimation>
                                        <div className="space-y-6">
                                            {projectDetails.map((detail, index) => (
                                                <ScrollAnimation key={index} delay={150 * (index + 1)}>
                                                    <div className="flex items-center">
                                                        <detail.icon className="h-7 w-7 text-primary mr-4" />
                                                        <div>
                                                            <h4 className="font-semibold text-lg text-text-dark">{detail.label}</h4>
                                                            <p className="text-lg text-text-secondary">{detail.value}</p>
                                                        </div>
                                                    </div>
                                                </ScrollAnimation>
                                            ))}
                                            <ScrollAnimation delay={600}>
                                                <div className="flex flex-col gap-4 mt-6">
                                                    <Button asChild variant="primary" size="xl" className="group rounded-full w-full">
                                                        <Link href="https://www.figma.com/proto/X6VnVA261sm4YAlS5Yq2Sj/Metta-Restaurant?page-id=0%3A1&node-id=1-2&viewport=261%2C264%2C0.1&t=sC6wWn6xH3s0E7j8-1&scaling=min-zoom&content-scaling=fixed" target="_blank" rel="noopener noreferrer">
                                                            <span className="font-semibold drop-shadow-sm">View Live Prototype</span>
                                                            <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                                                                <ArrowUpRight className="h-4 w-4" />
                                                            </div>
                                                        </Link>
                                                    </Button>
                                                    <Button asChild variant="secondary" size="xl" className="group rounded-full w-full">
                                                        <Link href="https://docs.google.com/presentation/d/1B7tvfGhHVD2aq9Y8bqC69iqzOsb0tOva_tajPwPVACE/edit?usp=drive_web" target="_blank" rel="noopener noreferrer">
                                                            <span className="font-semibold drop-shadow-sm">View Slide Deck</span>
                                                            <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                                                                <ArrowUpRight className="h-4 w-4" />
                                                            </div>
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </ScrollAnimation>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-2">
                                        <ScrollAnimation delay={300}>
                                            <Card className="bg-secondary/50">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center text-3xl"><Zap className="h-8 w-8 mr-3 text-primary"/>Impact Snapshot</CardTitle>
                                                </CardHeader>
                                                <CardContent className="prose lg:prose-lg text-text-secondary text-lg max-w-none space-y-6">
                                                    <div>
                                                        <h4 className="font-semibold text-text-dark !mb-2">Business Impact</h4>
                                                        <ul className="!mt-0 !space-y-1">
                                                            <li>Designed to increase reservation conversion through research-backed UX patterns.</li>
                                                            <li>Addressed critical gap: 90% of diners research restaurants online before visiting, yet most sites fail to convert.</li>
                                                            <li>Solution positioned Metta as premium multi-cuisine destination vs generic single-cuisine competitors.</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-text-dark !mb-2">Key Metrics Leveraged</h4>
                                                        <ul className="!mt-0 !space-y-1">
                                                            <li><strong className="text-text-dark">57% of restaurant traffic is mobile</strong> → Prioritized mobile-first responsive design.</li>
                                                            <li><strong className="text-text-dark">94% more engagement with high-quality imagery</strong> → Food-first visual hierarchy.</li>
                                                            <li><strong className="text-text-dark">68% higher conversion with persistent CTAs</strong> (industry benchmark) → Implemented sticky navigation with "Reserve Now" button.</li>
                                                        </ul>
                                                    </div>
                                                     <div>
                                                        <h4 className="font-semibold text-text-dark !mb-2">Problem Solved</h4>
                                                        <p className="!mt-0">Metta needed to differentiate in crowded multi-cuisine market while facilitating seamless reservations. Initial brief lacked clear value proposition and booking flow optimization.</p>
                                                     </div>
                                                     <div>
                                                        <h4 className="font-semibold text-text-dark !mb-2">My Approach</h4>
                                                        <p className="!mt-0">Research-driven redesign combining competitive analysis (12 trend analysis + 3 in-depth competitor audits), dual-persona strategy, and iterative expert review to create conversion-focused homepage that balances exploratory storytelling with efficient decision-making.</p>
                                                     </div>
                                                     <div>
                                                        <h4 className="font-semibold text-text-dark !mb-2">Outcome</h4>
                                                        <p className="!mt-0">Delivered a complete design system and 7-section homepage optimized for two user types: adventurous foodies and busy professionals. Incorporated all feedback from three UX experts and ensured WCAG 2.1 AA compliance.</p>
                                                     </div>
                                                </CardContent>
                                            </Card>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </section>

                            {/* Context and Challenge */}
                            <section id="context" className="bg-secondary -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 px-4 sm:px-6 md:px-8 lg:px-16 py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Context & Challenge</h2>
                                </ScrollAnimation>
                                <div className="max-w-3xl mx-auto">
                                     <ScrollAnimation delay={150}>
                                        <p className="text-xl md:text-2xl text-text-dark font-medium mb-8 text-center">
                                        Bagaimana mendesain homepage yang dapat menarik target audience dan memfasilitasi proses reservasi dengan mudah, sambil mencerminkan identitas Metta sebagai restoran multi-cuisine berkelas premium?
                                        </p>
                                    </ScrollAnimation>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                        <ScrollAnimation delay={300}>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center text-2xl"><Target className="h-6 w-6 mr-3 text-primary"/>Business Goals</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="list-disc list-inside text-lg text-text-secondary space-y-2">
                                                        <li>Meningkatkan conversion rate untuk reservasi online.</li>
                                                        <li>Membangun brand image sebagai destinasi kuliner berkelas premium.</li>
                                                        <li>Menarik target audience yang menghargai kualitas dan keberagaman kuliner.</li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </ScrollAnimation>
                                        <ScrollAnimation delay={450}>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center text-2xl"><Users className="h-6 w-6 mr-3 text-primary"/>User Goals</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="list-disc list-inside text-lg text-text-secondary space-y-2">
                                                        <li>Menemukan informasi restoran dengan cepat dan mudah.</li>
                                                        <li>Melihat preview menu dan hidangan populer.</li>
                                                        <li>Melakukan reservasi dengan proses yang smooth dan efisien.</li>
                                                        <li>Memahami atmosfer dan value proposition restoran.</li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Research & Discovery */}
                            <section id="research" className="py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Research & Discovery</h2>
                                    <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">Understanding the landscape to build a research-backed design strategy.</p>
                                </ScrollAnimation>
                                <div className="max-w-5xl mx-auto space-y-16">
                                    <ScrollAnimation>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center text-2xl"><Search className="h-6 w-6 mr-3 text-primary"/>Competitive Analysis</CardTitle>
                                            </CardHeader>
                                            <CardContent className="prose lg:prose-lg text-text-secondary text-lg max-w-none">
                                                <p>I analyzed 3 high-end multi-cuisine restaurants to identify strengths, weaknesses, and opportunities. This informed Metta's strategic positioning.</p>
                                                <div className="grid grid-cols-3 gap-8 my-8 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <Image src={competitorLogos.cheesecake} alt="The Cheesecake Factory Logo" width={64} height={64} className="h-16 w-16 object-contain"/>
                                                        <p className="font-semibold mt-2">The Cheesecake Factory</p>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <Image src={competitorLogos.pfchangs} alt="P.F. Chang's Logo" width={64} height={64} className="h-16 w-16 object-contain"/>
                                                        <p className="font-semibold mt-2">P.F. Chang's</p>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <Image src={competitorLogos.nobu} alt="Nobu Logo" width={64} height={64} className="h-16 w-16 object-contain"/>
                                                        <p className="font-semibold mt-2">Nobu</p>
                                                    </div>
                                                </div>
                                                <p><strong className="font-semibold text-text-dark">Key Takeaway:</strong> Metta's unique position is as a premium, multi-cuisine experience that combines Nobu's sophisticated aesthetic with P.F. Chang's storytelling, while offering curated variety that avoids the Cheesecake Factory's overwhelming menu breadth.</p>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={150}>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center text-2xl"><Users className="h-6 w-6 mr-3 text-primary"/>User Personas</CardTitle>
                                            </CardHeader>
                                            <CardContent className="prose lg:prose-lg text-text-secondary text-lg max-w-none">
                                                <p>Based on research, I developed two primary personas to guide design decisions, ensuring the final product catered to both exploratory and efficiency-driven users.</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                                    <div>
                                                        <h4 className="font-semibold text-text-dark">Sarah, the "Adventurous Foodie"</h4>
                                                        <p className="text-base">Spends 15-20 minutes exploring, values high-quality visuals and storytelling. Her goal is discovery.</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-text-dark">James, the "Busy Professional"</h4>
                                                        <p className="text-base">Makes decisions in 5-7 minutes, values efficiency, clarity, and easy booking. His goal is a confident, quick decision.</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                </div>
                            </section>

                            {/* Design Process Section */}
                            <section id="design-process" className="bg-secondary -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 px-4 sm:px-6 md:px-8 lg:px-16 py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Design Process</h2>
                                    <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">From Research to Refinement</p>
                                </ScrollAnimation>
                                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                                    {[
                                        { icon: Search, title: 'Research & Discovery', description: 'Competitive analysis, trend research, and persona development to understand the landscape and user needs.' },
                                        { icon: Palette, title: 'Design & Prototyping', description: 'Creating wireframes, a visual mood board, and a cohesive design system for colors, typography, and iconography in Figma.' },
                                        { icon: Repeat, title: 'Expert Review & Iteration', description: 'Submitting the design for expert critique, gathering feedback from 3 UX/UI professionals, and iterating on the design for improvement.' },
                                    ].map((item, index) => (
                                        <ScrollAnimation key={index} delay={150 * (index + 1)}>
                                            <div className="text-center">
                                                <div className="flex justify-center mb-6">
                                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-background/50">
                                                        <item.icon className="h-8 w-8 text-primary" />
                                                    </div>
                                                </div>
                                                <h3 className="font-display font-semibold text-2xl text-text-dark mb-2">{item.title}</h3>
                                                <p className="text-lg text-text-secondary">{item.description}</p>
                                            </div>
                                        </ScrollAnimation>
                                    ))}
                                </div>
                            </section>

                            {/* Key Decisions */}
                            <section id="key-decisions" className="py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16 text-center">Key Design Decisions</h2>
                                </ScrollAnimation>
                                <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
                                    <ScrollAnimation delay={150}>
                                        <Card>
                                            <CardHeader><CardTitle className="text-2xl flex items-center"><Scale className="h-6 w-6 mr-3 text-primary"/>Trade-off: Skipped Dark Mode</CardTitle></CardHeader>
                                            <CardContent className="text-lg text-text-secondary">
                                                <p>Although premium restaurants often favor dark themes, I prioritized delivering core features over this aesthetic choice. This avoided significant accessibility work and allowed focus on mobile-first design, high-quality imagery, and clear CTAs, while a gold accent maintained a premium feel.</p>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={300}>
                                        <Card>
                                            <CardHeader><CardTitle className="text-2xl flex items-center"><TrendingUp className="h-6 w-6 mr-3 text-primary"/>Conversion Boost: Sticky Navigation</CardTitle></CardHeader>
                                            <CardContent className="text-lg text-text-secondary">
                                                <p>To cater to the "Busy Professional" persona who values efficiency, a sticky navigation bar with a "Reserve Now" button was implemented. This sacrifices minor screen real estate but significantly reduces cognitive load and provides a constant, easy path to conversion.</p>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={450}>
                                        <Card>
                                            <CardHeader><CardTitle className="text-2xl flex items-center"><ShieldCheck className="h-6 w-6 mr-3 text-primary"/>User-Centric: Food-First Hierarchy</CardTitle></CardHeader>
                                            <CardContent className="text-lg text-text-secondary">
                                                <p>Recognizing that visual appeal is a primary decision factor, the design prioritizes high-quality food photography. This approach instantly communicates the value proposition and is more persuasive than copy alone, catering to both user personas.</p>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                </div>
                            </section>

                            {/* Final Designs Section */}
                            <section id="final-designs" className="bg-secondary -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 px-4 sm:px-6 md:px-8 lg:px-16 py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16 text-center">Final Designs</h2>
                                </ScrollAnimation>
                                <div className="grid grid-cols-1 gap-8">
                                    {finalDesigns.map((image, index) => (
                                        <ScrollAnimation key={index} delay={150 * (index + 1)}>
                                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border">
                                                <Image
                                                    src={image.src}
                                                    alt={`Final design ${index + 1}`}
                                                    fill
                                                    className="object-cover object-top"
                                                    data-ai-hint={image.hint}
                                                />
                                            </div>
                                        </ScrollAnimation>
                                    ))}
                                </div>
                            </section>
                            
                            {/* Reflection */}
                            <section id="reflection" className="py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16 text-center">Reflection & Learnings</h2>
                                </ScrollAnimation>
                                <div className="max-w-4xl mx-auto prose lg:prose-lg text-text-secondary text-lg">
                                    <ScrollAnimation delay={150}>
                                        <p>This project was a valuable exercise in balancing aesthetic goals with user-centric functionality under tight constraints. The research-driven approach proved essential, as insights from competitive analysis directly informed key design decisions, such as prioritizing a mobile-first layout and a food-first visual hierarchy.</p>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={300}>
                                        <p>One of the main challenges was the lack of direct user testing. To mitigate this, I relied on established UX patterns and sought feedback from multiple UX experts, which led to crucial iterations on design system consistency and value proposition clarity. This taught me that even without formal testing, leveraging expert reviews and documented best practices can significantly elevate a design.</p>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={450}>
                                        <h4 className="font-semibold text-xl text-text-dark mt-8 mb-4">Key Learnings:</h4>
                                        <ul className="space-y-4">
                                            <li className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <span><strong className="font-semibold text-text-dark">Ruthless Consistency is Key:</strong> Small inconsistencies in a design system (like button radius or color usage) can diminish the perceived quality. A tight, well-defined system is crucial for a professional finish and smoother development handoff.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <span><strong className="font-semibold text-text-dark">Clarity Over Ambiguity:</strong> A value proposition must be understood within seconds. Iterating on the hero copy to be explicit about the offering ("Multi-Cuisine Fine Dining") was a critical change that eliminated user confusion.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <span><strong className="font-semibold text-text-dark">Prioritize for Impact:</strong> When faced with constraints, every design decision must be a strategic trade-off. Choosing to implement a sticky navigation CTA over a purely aesthetic dark mode was a decision to prioritize measurable conversion goals over visual trends.</span>
                                            </li>
                                        </ul>
                                    </ScrollAnimation>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <CtaSection />
        </div>
    );
};

export default ProjectMettaPage;

    
