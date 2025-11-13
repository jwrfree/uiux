
import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { ArrowUpRight, Calendar, User, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImages from '@/lib/placeholder-images.json';

const ProjectMettaPage = () => {
    const projectDetails = [
        { label: 'Role', value: 'UI/UX Designer', icon: User },
        { label: 'Timeline', value: '2 Weeks', icon: Calendar },
        { label: 'Tools', value: 'Figma', icon: Wrench },
    ];

    const finalDesigns = [
        placeholderImages.mettaFinal1,
        placeholderImages.mettaFinal2,
        placeholderImages.mettaFinal3,
        placeholderImages.mettaFinal4
    ];

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
                                Metta Restaurant Homepage Design
                            </h1>
                            <p className="text-lg md:text-xl text-text-dark-secondary">
                                Crafting an elegant, user-friendly homepage that reflects the restaurant's brand, showcases its unique offerings, and simplifies the reservation process.
                            </p>
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Project Details */}
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
                                    Metta is a new fine-dining restaurant in Yogyakarta, Indonesia, offering a modern take on Javanese cuisine. The target audience is discerning diners, tourists, and locals looking for a special occasion restaurant. The challenge was to translate the restaurant's sophisticated and serene brand identity into a digital experience that was both beautiful and functional.
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

                {/* Design Process Section */}
                <div className="bg-secondary">
                    <div className="container mx-auto px-4 py-24 md:py-32">
                        <ScrollAnimation>
                            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Design Process</h2>
                            <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">From Concept to Execution</p>
                        </ScrollAnimation>
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                            <ScrollAnimation delay={150}>
                                <div className="space-y-4">
                                    <h3 className="font-display font-semibold text-2xl text-text-dark">Information Architecture</h3>
                                    <p className="text-lg text-text-secondary">
                                        The goal was to create a clear and intuitive navigation structure. I started by mapping out the key information users would need: menu, story, contact, and reservations. This led to a simple, single-page-inspired layout with clear sections, ensuring users could find what they wanted without getting lost.
                                    </p>
                                </div>
                            </ScrollAnimation>
                             <ScrollAnimation delay={300}>
                                <div className="space-y-4">
                                    <h3 className="font-display font-semibold text-2xl text-text-dark">Wireframing</h3>
                                    <p className="text-lg text-text-secondary">
                                        I created low-fidelity wireframes in Figma to focus on the layout and flow. This allowed for quick iteration on the placement of key elements like the hero section, menu highlights, and the reservation CTA. The wireframes helped establish a visual hierarchy that guides the user’s eye down the page naturally.
                                    </p>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation delay={450}>
                                <div className="space-y-4">
                                     <h3 className="font-display font-semibold text-2xl text-text-dark">Visual Design</h3>
                                     <p className="text-lg text-text-secondary">
                                         The visual direction focused on elegance and minimalism. I chose a color palette of black, white, and a gold accent to evoke a sense of luxury. The typography pairs a modern serif for headings with a clean sans-serif for body text, creating a sophisticated and readable experience. High-quality imagery was crucial to showcase the food and ambiance.
                                     </p>
                                </div>
                            </ScrollAnimation>
                            <ScrollAnimation delay={600}>
                                <div className="space-y-4">
                                    <h3 className="font-display font-semibold text-2xl text-text-dark">Prototyping & Testing</h3>
                                    <p className="text-lg text-text-secondary">
                                        An interactive prototype was built in Figma to simulate the user journey. I conducted informal usability tests to validate the flow, especially the reservation process. The feedback led to minor adjustments in button placement and visual cues to make the experience even more intuitive.
                                    </p>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>

                {/* Final Designs Section */}
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

            </main>
            <CtaSection />
        </div>
    );
};

export default ProjectMettaPage;
