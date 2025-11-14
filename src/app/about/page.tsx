

import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { CheckCircle, Users, Repeat, Settings, TestTube, Briefcase, Bike, Coffee, Sparkles } from "lucide-react";
import Image from "next/image";
import Timeline from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-32 md:pt-40 lg:pt-48">
        <div className="container mx-auto px-4 pb-16 md:pb-24 lg:pb-32">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <ScrollAnimation>
                    <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight mb-4 bg-gradient-to-r from-stone-800 to-stone-200 bg-clip-text text-transparent">
                        Designing for People, Not Just Pixels
                    </h1>
                    <p className="text-xl md:text-2xl text-text-dark-secondary">
                        I turn messy human problems into measurable outcomes—balancing empathy, behavior science, and product goals.
                    </p>
                </ScrollAnimation>
            </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
                <ScrollAnimation delay={150}>
                    <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto md:max-w-none animate-[levitate_6s_ease-in-out_infinite]">
                      <Image
                        src="/img_profile_jati.jpg"
                        alt="Wruhantojati - UI/UX Designer"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                </ScrollAnimation>
            
              <div className="prose lg:prose-lg text-text-secondary max-w-2xl text-lg">
                <ScrollAnimation delay={300}>
                    <p className="text-2xl font-semibold text-text-dark">
                        I'm Wruhantojati, a UI/UX designer based in Yogyakarta, Indonesia. 
                    </p>
                </ScrollAnimation>
                <ScrollAnimation delay={450}>
                    <p>
                        I believe great design isn&apos;t just about making things look good—it&apos;s about understanding people, their struggles, and designing solutions that genuinely improve their lives. Over the last 3 years I&apos;ve designed for problems that matter: from helping 10,000+ users shift from burning waste to recycling, to supporting families through grief with compassionate digital services.
                    </p>
                </ScrollAnimation>
                <ScrollAnimation delay={550}>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { value: "10K+", label: "households nudged toward sustainable waste behavior" },
                      { value: "92%", label: "task success rate after redesigning a grief-support workflow" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-md">
                        <p className="text-4xl font-display font-semibold text-text-dark">{stat.value}</p>
                        <p className="mt-2 text-base text-text-secondary">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </ScrollAnimation>
              </div>
            </div>
        </div>

        <div className="bg-secondary">
            <div className="container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-5xl mx-auto">
                  <ScrollAnimation>
                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">My Story</h2>
                    <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">How I Got Here</p>
                  </ScrollAnimation>
                  <Timeline />
                </div>
            </div>
        </div>
        
        <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-5xl mx-auto">
                <ScrollAnimation>
                  <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">How I Approach Design</h2>
                  <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">My Design Philosophy</p>
                </ScrollAnimation>
                <div className="prose prose-lg lg:prose-xl text-text-secondary max-w-none mx-auto text-center">
                    <ScrollAnimation delay={150}>
                        <p className="text-2xl font-medium text-text-dark">I don't design for "users"—I design for people. Real people with complicated lives, limited time, and very real problems.</p>
                    </ScrollAnimation>
                    <ScrollAnimation delay={300}>
                        <p>This means:</p>
                    </ScrollAnimation>
                    <ul className="space-y-4 !pl-0 text-left grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12">
                    <ScrollAnimation delay={450}>
                      <li className="flex items-start">
                        <CheckCircle className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
                        <span>
                          <span className="font-semibold text-text-dark text-xl">Starting with empathy, but validating with data:</span> I spend time understanding what people need, then use research and testing to make sure I'm solving the right problems.
                        </span>
                      </li>
                    </ScrollAnimation>
                    <ScrollAnimation delay={600}>
                      <li className="flex items-start">
                        <CheckCircle className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
                        <span>
                          <span className="font-semibold text-text-dark text-xl">Thinking in systems, not just screens:</span> My engineering background taught me that everything connects. A small change in one part can ripple through the entire experience.
                        </span>
                      </li>
                    </ScrollAnimation>
                    <ScrollAnimation delay={750}>
                      <li className="flex items-start">
                        <CheckCircle className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
                        <span>
                          <span className="font-semibold text-text-dark text-xl">Designing for constraints, not ideal scenarios:</span> Real projects have budgets, deadlines, and technical limitations. Good design works within reality, not despite it.
                        </span>
                      </li>
                    </ScrollAnimation>
                    <ScrollAnimation delay={900}>
                      <li className="flex items-start">
                        <CheckCircle className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
                        <span>
                          <span className="font-semibold text-text-dark text-xl">Prioritizing behavior change over interface polish:</span> Beautiful interfaces matter, but changing how 10,000 people manage waste matters more.
                        </span>
                      </li>
                    </ScrollAnimation>
                  </ul>
                </div>
            </div>
        </div>

        <div className="bg-secondary">
            <div className="container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-5xl mx-auto">
                    <ScrollAnimation>
                     <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">What I Bring</h2>
                      <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">Skills & Approach</p>
                    </ScrollAnimation>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { icon: Users, title: 'User Research', description: 'Understanding needs through interviews, surveys, and contextual inquiry—especially in sensitive or complex environments.' },
                        { icon: Repeat, title: 'Behavior Change Design', description: 'Creating incentive systems and reducing friction to shift user habits and drive measurable impact.' },
                        { icon: Settings, title: 'Systems Thinking', description: 'Mapping complex stakeholder relationships and designing solutions that balance competing needs.' },
                        { icon: TestTube, title: 'Prototyping & Testing', description: 'Building interactive prototypes and validating decisions through user testing and iteration.' },
                        { icon: Briefcase, title: 'Cross-Functional Collaboration', description: 'Bridging design and development with technical understanding and clear communication.' },
                      ].map((skill, index) => (
                        <ScrollAnimation key={skill.title} delay={150 * (index + 1)}>
                          <div className="bg-background/50 dark:bg-black/20 p-8 rounded-3xl h-full flex flex-col shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                            <skill.icon className="h-10 w-10 text-primary mb-6" />
                            <h4 className="font-semibold text-2xl mb-3 text-text-dark">{skill.title}</h4>
                            <p className="text-text-secondary text-lg">{skill.description}</p>
                          </div>
                        </ScrollAnimation>
                      ))}
                    </div>
                     <ScrollAnimation delay={450}>
                        <div className="mt-16 text-center">
                            <h4 className="font-semibold text-xl mb-4 text-text-dark">Tools I Use</h4>
                            <p className="text-lg text-text-secondary">
                                Figma • FigJam • Maze • Optimal Workshop • HTML/CSS/JS basics
                            </p>
                     </div>
                    </ScrollAnimation>
                </div>
                <ScrollAnimation delay={600}>
                  <div className="mt-20 flex flex-col items-center gap-6 text-center">
                    <p className="text-xl text-text-dark max-w-2xl">
                      Want a deeper look? Browse the case studies I&apos;ve shipped or grab the one-page resume for a quick download.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Button asChild variant="primary" size="xl" className="group rounded-full">
                        <Link href="/#work">
                          <span className="font-semibold drop-shadow-sm">View Case Studies</span>
                          <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        </Link>
                      </Button>
                      <Button asChild variant="frosted" size="xl" className="group rounded-full">
                        <Link href="/resume.pdf" download>
                          <span className="font-semibold drop-shadow-sm">Download Resume</span>
                          <div className="w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 group-hover:ml-2 transition-all duration-700 ease-in-out">
                            <Sparkles className="h-4 w-4" />
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>
            </div>
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto">
                <ScrollAnimation>
                    <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-4 text-center">Beyond Design</h2>
                    <p className="text-lg md:text-xl text-text-secondary mb-16 text-center">A Glimpse Into My World</p>
                </ScrollAnimation>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <ScrollAnimation delay={150}>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-secondary mb-6"><Bike className="h-10 w-10 text-primary" /></div>
                            <h4 className="font-semibold text-xl mb-2 text-text-dark">Cycling Yogyakarta</h4>
                            <p className="text-lg text-text-secondary">Exploring the city's streets, finding new perspectives—literally and figuratively.</p>
                        </div>
                    </ScrollAnimation>
                     <ScrollAnimation delay={300}>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-secondary mb-6"><Coffee className="h-10 w-10 text-primary" /></div>
                            <h4 className="font-semibold text-xl mb-2 text-text-dark">Coffee & Contemplation</h4>
                            <p className="text-lg text-text-secondary">Slowing down with a good brew, sketching ideas, and observing human interaction.</p>
                        </div>
                    </ScrollAnimation>
                     <ScrollAnimation delay={450}>
                        <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center h-20 w-20 rounded-full bg-secondary mb-6"><Sparkles className="h-10 w-10 text-primary" /></div>
                            <h4 className="font-semibold text-xl mb-2 text-text-dark">Constant Curiosity</h4>
                            <p className="text-lg text-text-secondary">Experimenting with new design tools, plugins, and prototyping techniques to stay sharp.</p>
                        </div>
                    </ScrollAnimation>
                </div>
                <ScrollAnimation delay={600}>
                    <p className="text-xl text-center text-text-dark mt-20 max-w-3xl mx-auto">I'm convinced that being a good designer means being curious about life beyond screens. Every conversation, ride, or quiet moment shapes how I see problems and craft solutions.</p>
                </ScrollAnimation>
            </div>
        </div>

      </main>
      <CtaSection />
    </div>
  );
};

export default AboutPage;
