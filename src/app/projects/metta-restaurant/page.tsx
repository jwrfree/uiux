
import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { ArrowUpRight, Calendar, User, Wrench, Zap, Gem, Repeat, CheckCircle, BarChart, Users, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImages from '@/lib/placeholder-images.json';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

    return (
        <div className="bg-background text-foreground">
            <Header />
            <main className="pt-32 md:pt-40 lg:pt-48">

                {/* Hero Section */}
                <div className="container mx-auto px-4">
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
                </div>

                {/* Project Overview */}
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
                        <div className="lg:col-span-1">
                            <ScrollAnimation>
                                <h2 className="font-display text-2xl font-bold mb-4">Project Info</h2>
                            </ScrollAnimation>
                            <div className="space-y-4">
                                {projectDetails.map((detail, index) => (
                                    <ScrollAnimation key={index} delay={150 * (index + 1)}>
                                        <div className="flex items-center">
                                            <detail.icon className="h-6 w-6 text-primary mr-3" />
                                            <div>
                                                <h4 className="font-semibold text-text-dark">{detail.label}</h4>
                                                <p className="text-text-secondary">{detail.value}</p>
                                            </div>
                                        </div>
                                    </ScrollAnimation>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-3 prose lg:prose-lg text-text-secondary text-lg max-w-none">
                            <ScrollAnimation delay={300}>
                                <h2 className="font-display text-2xl font-bold mb-4">Overview</h2>
                                <p>
                                    Metta is an innovative web platform dedicated to presenting a variety of world cuisines to culinary lovers. The challenge was to design a homepage that could attract the target audience and facilitate the reservation process easily, while reflecting Metta's identity as a premium multi-cuisine restaurant.
                                </p>
                            </ScrollAnimation>
                            <ScrollAnimation delay={450}>
                                <Button asChild variant="primary" size="lg" className="group rounded-full mt-6">
                                    <Link href="https://www.figma.com/proto/X6VnVA261sm4YAlS5Yq2Sj/Metta-Restaurant?page-id=0%3A1&node-id=1-2&viewport=261%2C264%2C0.1&t=sC6wWn6xH3s0E7j8-1&scaling=min-zoom&content-scaling=fixed" target="_blank" rel="noopener noreferrer">
                                        <span>View Live Prototype</span>
                                        <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>
                                </Button>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>

                {/* Context and Challenge */}
                <div className="bg-secondary">
                    <div className="container mx-auto px-4 py-24 md:py-32">
                        <ScrollAnimation>
                            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Context & Challenge</h2>
                        </ScrollAnimation>
                        <div className="max-w-3xl mx-auto text-center">
                            <ScrollAnimation delay={150}>
                                <p className="text-xl md:text-2xl text-text-dark font-medium mb-8">
                                How can we design a homepage that attracts our target audience, simplifies reservations, and solidifies Metta’s identity as a premium multi-cuisine restaurant?
                                </p>
                            </ScrollAnimation>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <ScrollAnimation delay={300}>
                                    <div>
                                        <h4 className="font-semibold text-xl text-text-dark mb-2 flex items-center"><BarChart className="h-5 w-5 mr-2 text-primary"/>Business Goals</h4>
                                        <ul className="list-disc list-inside text-lg text-text-secondary space-y-1">
                                            <li>Increase conversion rate for online reservations.</li>
                                            <li>Build a brand image as a premium culinary destination.</li>
                                            <li>Attract a target audience that values quality and culinary diversity.</li>
                                        </ul>
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation delay={450}>
                                    <div>
                                        <h4 className="font-semibold text-xl text-text-dark mb-2 flex items-center"><Users className="h-5 w-5 mr-2 text-primary"/>User Goals</h4>
                                        <ul className="list-disc list-inside text-lg text-text-secondary space-y-1">
                                            <li>Find restaurant information quickly and easily.</li>
                                            <li>Preview the menu and popular dishes.</li>
                                            <li>Make reservations with a smooth and efficient process.</li>
                                            <li>Understand the atmosphere and value proposition of the restaurant.</li>
                                        </ul>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </div>
                </div>
                
                 {/* Research & Discovery */}
                <div className="container mx-auto px-4 py-24 md:py-32">
                    <ScrollAnimation>
                        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Research & Discovery</h2>
                        <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">Understanding the landscape to build a research-backed design strategy.</p>
                    </ScrollAnimation>
                     <div className="max-w-4xl mx-auto space-y-16">
                        <ScrollAnimation>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Competitive Analysis</CardTitle>
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
                                    <CardTitle>User Personas</CardTitle>
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
                </div>

                {/* Design Process Section */}
                <div className="bg-secondary">
                    <div className="container mx-auto px-4 py-24 md:py-32">
                        <ScrollAnimation>
                            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Design Process</h2>
                            <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">From Research to Refinement</p>
                        </ScrollAnimation>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                            {[
                                { icon: Gem, title: 'Research & Discovery', description: 'Competitive analysis, trend research, and persona development to understand the landscape and user needs.' },
                                { icon: Zap, title: 'Design & Prototyping', description: 'Creating wireframes, a visual mood board, and a cohesive design system for colors, typography, and iconography in Figma.' },
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
                    </div>
                </div>

                {/* Key Decisions */}
                <div className="container mx-auto px-4 py-24 md:py-32">
                    <ScrollAnimation>
                        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16 text-center">Key Design Decisions</h2>
                    </ScrollAnimation>
                    <div className="max-w-4xl mx-auto space-y-8">
                        <ScrollAnimation delay={150}>
                            <div className="bg-secondary p-8 rounded-3xl shadow-lg">
                                <h3 className="font-semibold text-2xl text-text-dark mb-2">Skipped Dark Mode</h3>
                                <p className="text-lg text-text-secondary">
                                    Although premium restaurants often favor dark themes, I prioritized delivering core features over this aesthetic choice. This avoided significant accessibility work and allowed focus on mobile-first design, high-quality imagery, and clear CTAs, while a gold accent maintained a premium feel.
                                </p>
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation delay={300}>
                            <div className="bg-secondary p-8 rounded-3xl shadow-lg">
                                <h3 className="font-semibold text-2xl text-text-dark mb-2">Sticky Navigation with Persistent CTA</h3>
                                <p className="text-lg text-text-secondary">
                                    To cater to the "Busy Professional" persona who values efficiency, a sticky navigation bar with a "Reserve Now" button was implemented. This sacrifices minor screen real estate but significantly reduces cognitive load and provides a constant, easy path to conversion.
                                </p>
                            </div>
                        </ScrollAnimation>
                        <ScrollAnimation delay={450}>
                            <div className="bg-secondary p-8 rounded-3xl shadow-lg">
                                <h3 className="font-semibold text-2xl text-text-dark mb-2">Food-First Visual Hierarchy</h3>
                                <p className="text-lg text-text-secondary">
                                    Recognizing that visual appeal is a primary decision factor, the design prioritizes high-quality food photography. This approach instantly communicates the value proposition and is more persuasive than copy alone, catering to both user personas.
                                </p>
                            </div>
                        </ScrollAnimation>
                    </div>
                </div>

                {/* Final Designs Section */}
                <div className="bg-secondary">
                    <div className="container mx-auto px-4 py-24 md:py-32">
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
                    </div>
                </div>
                
                 {/* Reflection */}
                <div className="container mx-auto px-4 py-24 md:py-32">
                    <div className="container mx-auto px-4">
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
                    </div>
                </div>
            </main>
            <CtaSection />
        </div>
    );
};

export default ProjectMettaPage;

    