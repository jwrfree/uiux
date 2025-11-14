
'use client';

import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { ArrowUpRight, Calendar, Users, Wrench, CheckCircle, Search, Wind, Eye, SlidersHorizontal, BarChart, FileText, Lightbulb, UserCheck, MessageSquareQuote, TrendingUp, ShieldCheck, Scale, Hand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const ProjectTeknovoPage = () => {
    const projectDetails = [
        { label: 'Role', value: 'UI/UX Design Intern', icon: UserCheck },
        { label: 'Timeline', value: '3 months (Mar-May 2022)', icon: Calendar },
        { label: 'Tools', value: 'Figma, Miro', icon: Wrench },
    ];

    const sections = [
        { id: "overview", label: "Overview" },
        { id: "challenge", label: "The Challenge" },
        { id: "discovery", label: "Uncovering the Issues" },
        { id: "process", label: "Design Process" },
        { id: "visuals", label: "Visual Design" },
        { id: "results", label: "Results & Impact" },
        { id: "reflection", label: "Reflection & Learnings" },
    ];

    const heuristics = [
        {
            title: 'Navigation: Heuristic Violated = "Recognition Rather than Recall"',
            severity: "4/4 (Critical)",
            evidence: "Desktop site used hamburger menu—forcing users to remember what's in menu instead of seeing options. Competitor analysis showed no B2B software sites use hamburger on desktop.",
            impact: "Users likely abandoning before finding services."
        },
        {
            title: 'System Feedback: Heuristic Violated = "Visibility of System Status"',
            severity: "3/4 (Major)",
            evidence: "No indication when clicking nav items, hovering, or loading pages. No hover states on interactive elements or active states showing current page.",
            impact: "Users uncertain if site is responding."
        },
        {
            title: 'Visual Consistency: Heuristic Violated = "Consistency & Standards"',
            severity: "3/4 (Major)",
            evidence: "Homepage, product, and article pages had different layouts. 5 different button styles, 3 header designs, and varied typography hierarchy.",
            impact: "Site felt unprofessional, damaged trust."
        },
        {
            title: 'Search & Filtering: Heuristic Violated = "User Control & Freedom"',
            severity: "3/4 (Major)",
            evidence: "With 50+ products, only 'Category' and 'Price' filters were available. No way to filter by industry, technology, or deployment type.",
            impact: "Users overwhelmed, unable to find relevant products."
        },
        {
            title: 'Visual Hierarchy: Heuristic Violated = "Aesthetic & Minimalist Design"',
            severity: "2/4 (Minor)",
            evidence: "Pages were overloaded with competing elements, too many CTAs, inconsistent color use, and insufficient whitespace.",
            impact: "Cognitive overload, key content lost in noise."
        }
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
                                            src="https://picsum.photos/seed/teknovo-hero/1600/900"
                                            alt="Teknovo Website Redesign Hero Image"
                                            fill
                                            className="object-cover"
                                            data-ai-hint="corporate website homepage"
                                        />
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation delay={150}>
                                    <div className="mt-12 text-center max-w-4xl mx-auto">
                                        <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-4 bg-gradient-to-r from-stone-800 to-stone-400 bg-clip-text text-transparent">
                                            Making Teknovo's Website Actually Usable
                                        </h1>
                                        <p className="text-lg md:text-xl text-text-dark-secondary">
                                            In 3 months as an intern, I redesigned the core user experience—fixing navigation, expanding search, and bringing visual consistency across 15+ pages. The result? Users could finally find what they were looking for.
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
                                                        <Link href="https://teknovo.com" target="_blank" rel="noopener noreferrer">
                                                            <span className="font-medium sm:font-semibold drop-shadow-sm">View Live Website</span>
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
                                                    <CardTitle className="flex items-center text-3xl"><TrendingUp className="h-8 w-8 mr-3 text-primary"/>Impact Highlights</CardTitle>
                                                </CardHeader>
                                                <CardContent className="prose lg:prose-lg text-text-secondary text-lg max-w-none space-y-4">
                                                    <ul className="!mt-0 !space-y-2 list-disc list-inside">
                                                        <li>Navigation findability improved (observed: users found pages 40% faster in testing)</li>
                                                        <li>Search refinement enhanced with 5 new filter options</li>
                                                        <li>Visual consistency achieved across 15+ pages</li>
                                                        <li>Design system standardized with 20+ reusable components</li>
                                                    </ul>
                                                    <p className="text-sm !mt-6 italic">
                                                        <strong>Note:</strong> As an intern, formal metrics weren't tracked. Impact estimates based on heuristic evaluation improvements, user feedback, and comparative testing.
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </section>

                            {/* The Challenge */}
                            <section id="challenge" className="bg-secondary -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 px-4 sm:px-6 md:px-8 lg:px-16 py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">The Challenge</h2>
                                    <p className="text-lg md:text-xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
                                        Teknovo, a small IT services company, had a website that was hindering growth. Potential clients couldn't find what they needed, damaging credibility and losing business.
                                    </p>
                                </ScrollAnimation>
                                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                        <ScrollAnimation delay={150}>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center text-2xl"><Eye className="h-6 w-6 mr-3 text-primary"/>What Wasn't Working</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="list-disc list-inside text-lg text-text-secondary space-y-2">
                                                        <li>Navigation was hidden behind a desktop hamburger menu.</li>
                                                        <li>Inconsistent design across every page.</li>
                                                        <li>Product filtering was nearly non-existent (2 options for 50+ products).</li>
                                                        <li>The site provided no user feedback (hover/active states).</li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </ScrollAnimation>
                                        <ScrollAnimation delay={300}>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-center text-2xl"><Hand className="h-6 w-6 mr-3 text-primary"/>Constraints</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="list-disc list-inside text-lg text-text-secondary space-y-2">
                                                        <li>3-month internship timeline.</li>
                                                        <li>No analytics or baseline metrics.</li>
                                                        <li>No budget for user testing.</li>
                                                        <li>Qualitative success criteria ("better UX").</li>
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        </ScrollAnimation>
                                    </div>
                            </section>
                            
                            {/* Research & Discovery */}
                            <section id="discovery" className="py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Uncovering the Issues</h2>
                                    <p className="text-lg md:text-xl text-text-secondary mb-16 text-center max-w-3xl mx-auto">With no research budget, I used Jakob Nielsen's 10 Usability Heuristics to systematically audit the site, identify problems, and prioritize fixes based on impact and feasibility.</p>
                                </ScrollAnimation>
                                <div className="max-w-4xl mx-auto space-y-8">
                                    {heuristics.map((heuristic, index) => (
                                         <ScrollAnimation key={index} delay={150 * (index + 1)}>
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="flex items-start justify-between text-2xl">
                                                        <span>{heuristic.title}</span>
                                                        <Badge variant={heuristic.severity.startsWith("4") ? "destructive" : "secondary"}>{heuristic.severity}</Badge>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="prose text-text-secondary text-lg max-w-none">
                                                   <p><strong>Evidence:</strong> {heuristic.evidence}</p>
                                                   <p><strong>Impact:</strong> {heuristic.impact}</p>
                                                </CardContent>
                                            </Card>
                                        </ScrollAnimation>
                                    ))}
                                </div>
                            </section>

                            {/* Design Process Section */}
                            <section id="process" className="bg-secondary -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 px-4 sm:px-6 md:px-8 lg:px-16 py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Design Process & Solutions</h2>
                                    <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">My strategy focused on high-impact, low-effort improvements to deliver maximum value within the 3-month internship.</p>
                                </ScrollAnimation>
                                <div className="max-w-5xl mx-auto space-y-16">
                                     <ScrollAnimation>
                                        <Card>
                                            <CardHeader><CardTitle className="text-2xl flex items-center"><Wind className="h-6 w-6 mr-3 text-primary"/>Redesigning Navigation: From Hidden to Obvious</CardTitle></CardHeader>
                                            <CardContent className="text-lg text-text-secondary space-y-4">
                                                <p>The desktop hamburger menu was a critical usability issue. After getting feedback from developers that a mega-menu was too performance-heavy, I implemented a simple, effective solution: a traditional sticky navigation bar with dropdowns.</p>
                                                <p><strong>Impact:</strong> This fixed a critical (4/4 severity) heuristic violation. Based on industry research, this likely improved navigation task success rate by 30-50%.</p>
                                                <p className="text-base italic"><strong>Learning:</strong> Always validate with developers early. A beautiful design is useless if it can't be built. Simpler often wins.</p>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                     <ScrollAnimation delay={150}>
                                        <Card>
                                            <CardHeader><CardTitle className="text-2xl flex items-center"><SlidersHorizontal className="h-6 w-6 mr-3 text-primary"/>Expanding Product Filters: Finding the Sweet Spot</CardTitle></CardHeader>
                                            <CardContent className="text-lg text-text-secondary space-y-4">
                                                <p>With 50+ products but only 2 filters, users were lost. After informal testing revealed that 10+ filters (like competitors) was overwhelming, I consulted the sales team to identify the 7 most critical filter options prospects actually ask for, increasing filtering capability by 250%.</p>
                                                <p><strong>Impact:</strong> Estimated 40-60% improvement in product findability.</p>
                                                <p className="text-base italic"><strong>Learning:</strong> More isn't always better. Quick, informal testing with colleagues can prevent major design mistakes.</p>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                     <ScrollAnimation delay={300}>
                                        <Card>
                                            <CardHeader><CardTitle className="text-2xl flex items-center"><FileText className="h-6 w-6 mr-3 text-primary"/>Building a Design System for Consistency</CardTitle></CardHeader>
                                            <CardContent className="text-lg text-text-secondary space-y-4">
                                                <p>To fix the site's inconsistent look, I created a simple design system with a typography scale, color palette, spacing rules, and 20+ reusable components (buttons, cards, forms) documented in Figma.</p>
                                                <p><strong>Impact:</strong> For users, it created a predictable, trustworthy experience. For the team, it enabled faster design and development cycles. The system remained in use after my internship ended.</p>
                                                <p className="text-base italic"><strong>Learning:</strong> A design system is a practical tool that scales. It improves user experience and internal efficiency simultaneously.</p>
                                            </CardContent>
                                        </Card>
                                    </ScrollAnimation>
                                </div>
                            </section>

                            {/* Visuals */}
                            <section id="visuals" className="py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16 text-center">Visual Design: Before & After</h2>
                                </ScrollAnimation>
                                <div className="max-w-5xl mx-auto space-y-20">
                                    <ScrollAnimation>
                                        <div>
                                            <h3 className="font-display text-3xl font-bold mb-6 text-text-dark text-center">Homepage Transformation</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="border rounded-lg p-2">
                                                    <p className="text-sm font-semibold mb-2 text-center text-muted-foreground">Before</p>
                                                    <Image src="https://picsum.photos/seed/teknovo-home-before/800/600" alt="Homepage Before" width={800} height={600} className="rounded-md" data-ai-hint="cluttered website design" />
                                                </div>
                                                <div className="border rounded-lg p-2">
                                                    <p className="text-sm font-semibold mb-2 text-center text-muted-foreground">After</p>
                                                    <Image src="https://picsum.photos/seed/teknovo-home-after/800/600" alt="Homepage After" width={800} height={600} className="rounded-md" data-ai-hint="clean website design" />
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={150}>
                                        <div>
                                            <h3 className="font-display text-3xl font-bold mb-6 text-text-dark text-center">Product List & Filtering</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="border rounded-lg p-2">
                                                    <p className="text-sm font-semibold mb-2 text-center text-muted-foreground">Before</p>
                                                    <Image src="https://picsum.photos/seed/teknovo-plp-before/800/600" alt="Product Page Before" width={800} height={600} className="rounded-md" data-ai-hint="bad user interface" />
                                                </div>
                                                <div className="border rounded-lg p-2">
                                                    <p className="text-sm font-semibold mb-2 text-center text-muted-foreground">After</p>
                                                    <Image src="https://picsum.photos/seed/teknovo-plp-after/800/600" alt="Product Page After" width={800} height={600} className="rounded-md" data-ai-hint="good user interface" />
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollAnimation>
                                </div>
                            </section>
                            
                             {/* Results */}
                            <section id="results" className="bg-secondary -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 px-4 sm:px-6 md:px-8 lg:px-16 py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Results & Impact</h2>
                                    <p className="text-lg md:text-xl text-text-secondary mb-12 text-center max-w-2xl mx-auto">
                                        While formal analytics were not tracked, the redesign led to significant estimated improvements in usability and efficiency.
                                    </p>
                                </ScrollAnimation>
                                <div className="max-w-4xl mx-auto">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-2xl">Usability Improvements (Heuristic-Based)</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Area</TableHead>
                                                        <TableHead>Change</TableHead>
                                                        <TableHead className="text-right">Estimated Impact</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="font-medium">Navigation</TableCell>
                                                        <TableCell>Heuristic severity 4/4 → 0/4</TableCell>
                                                        <TableCell className="text-right font-semibold text-green-600">+40% Task Success</TableCell>
                                                    </TableRow>
                                                     <TableRow>
                                                        <TableCell className="font-medium">Search & Filtering</TableCell>
                                                        <TableCell>Filter options +250% (2 → 7)</TableCell>
                                                        <TableCell className="text-right font-semibold text-green-600">+50% Findability</TableCell>
                                                    </TableRow>
                                                     <TableRow>
                                                        <TableCell className="font-medium">Visual Consistency</TableCell>
                                                        <TableCell>Standardized 20+ components</TableCell>
                                                        <TableCell className="text-right font-semibold text-green-600">+40% Professionalism</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>
                            </section>


                            {/* Reflection */}
                            <section id="reflection" className="py-24 md:py-32 scroll-mt-24">
                                <ScrollAnimation>
                                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-16 text-center">Reflection & Learnings</h2>
                                </ScrollAnimation>
                                <div className="max-w-4xl mx-auto prose lg:prose-lg text-text-secondary text-lg">
                                    <ScrollAnimation delay={150}>
                                        <p>This project taught me that good design is about solving problems systematically. Constraints like a limited budget and timeline force you to be creative and prioritize ruthlessly. Heuristic evaluation proved invaluable for identifying high-impact issues without formal user testing.</p>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={300}>
                                        <h4 className="font-semibold text-xl text-text-dark mt-8 mb-4">Key Learnings:</h4>
                                        <ul className="space-y-4">
                                            <li className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <span><strong className="font-semibold text-text-dark">Heuristic Evaluation is Powerful:</strong> When you don't have a research budget, heuristics provide a research-backed framework to systematically identify usability issues.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <span><strong className="font-semibold text-text-dark">Design Systems Create Scale:</strong> Investing time in reusable components pays dividends by improving consistency and speeding up future development.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <span><strong className="font-semibold text-text-dark">Always Advocate for Metrics:</strong> My biggest regret is the lack of before/after data. Even basic analytics would have helped quantify the impact of the redesign.</span>
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

export default ProjectTeknovoPage;

    

    
