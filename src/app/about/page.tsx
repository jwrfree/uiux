

import CtaSection from "@/components/sections/cta";
import Header from "@/components/sections/header";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { CheckCircle, Users, Repeat, Settings, TestTube, Briefcase, Bike, Coffee, Sparkles } from "lucide-react";
import Image from "next/image";
import Timeline from "@/components/ui/timeline";

const AboutPage = () => {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 lg:py-32 pt-32 md:pt-40 lg:pt-48">
        <div className="flex flex-col items-center">
            <ScrollAnimation>
                <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight mb-12 text-center">
                About Me
                </h1>
            </ScrollAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
            <ScrollAnimation delay={150}>
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl max-w-md mx-auto md:max-w-none">
                <Image
                    src="https://i.imgur.com/P7sZTw4.png"
                    alt="Wruhantojati - UI/UX Designer"
                    fill
                    className="object-cover"
                />
                </div>
            </ScrollAnimation>
          
          <div className="prose lg:prose-lg text-text-secondary max-w-2xl text-lg">
            <ScrollAnimation delay={300}>
                <p>
                    I'm Wruhantojati, a UI/UX designer based in Yogyakarta, Indonesia. I believe great design isn't just about making things look good—it's about understanding people, their struggles, and designing solutions that genuinely improve their lives.
                </p>
            </ScrollAnimation>
            <ScrollAnimation delay={450}>
                <p>
                    For the past 2+ years, I've been designing for problems that matter: from helping 10,000+ users shift from burning waste to recycling, to supporting families through grief with compassionate digital services.
                </p>
            </ScrollAnimation>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-24 md:mt-32">
          <ScrollAnimation>
            <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4 text-center">My Story</h2>
            <p className="text-lg md:text-xl text-text-secondary mb-12 text-center">How I Got Here</p>
          </ScrollAnimation>
          <Timeline />
        </div>

        <div className="max-w-5xl mx-auto mt-24 md:mt-32">
            <ScrollAnimation>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4 text-center">How I Approach Design</h2>
              <p className="text-lg md:text-xl text-text-secondary mb-12 text-center">My Design Philosophy</p>
            </ScrollAnimation>
            <div className="prose prose-lg lg:prose-xl text-text-secondary max-w-none mx-auto">
                <ScrollAnimation delay={150}>
                    <p>I don't design for "users"—I design for people. Real people with complicated lives, limited time, and very real problems.</p>
                </ScrollAnimation>
                <ScrollAnimation delay={300}>
                    <p>This means:</p>
                </ScrollAnimation>
                <ul className="space-y-4 !pl-0 text-left grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-8">
                <ScrollAnimation delay={450}>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-text-dark">Starting with empathy, but validating with data:</span> I spend time understanding what people need, then use research and testing to make sure I'm solving the right problems.
                    </span>
                  </li>
                </ScrollAnimation>
                <ScrollAnimation delay={600}>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-text-dark">Thinking in systems, not just screens:</span> My engineering background taught me that everything connects. A small change in one part can ripple through the entire experience.
                    </span>
                  </li>
                </ScrollAnimation>
                <ScrollAnimation delay={750}>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-text-dark">Designing for constraints, not ideal scenarios:</span> Real projects have budgets, deadlines, and technical limitations. Good design works within reality, not despite it.
                    </span>
                  </li>
                </ScrollAnimation>
                <ScrollAnimation delay={900}>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                    <span>
                      <span className="font-semibold text-text-dark">Prioritizing behavior change over interface polish:</span> Beautiful interfaces matter, but changing how 10,000 people manage waste matters more.
                    </span>
                  </li>
                </ScrollAnimation>
              </ul>
            </div>
        </div>

        <div className="max-w-5xl mx-auto mt-24 md:mt-32">
            <ScrollAnimation>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4 text-center">What I Bring</h2>
              <p className="text-lg md:text-xl text-text-secondary mb-12 text-center">Skills & Approach</p>
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
                  <div className="bg-white/30 dark:bg-black/10 p-6 rounded-2xl h-full flex flex-col shadow-lg">
                    <skill.icon className="h-8 w-8 text-primary mb-4" />
                    <h4 className="font-semibold text-xl mb-2 text-text-dark">{skill.title}</h4>
                    <p className="text-text-secondary">{skill.description}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
             <ScrollAnimation delay={450}>
                <div className="mt-12 text-center">
                    <h4 className="font-semibold text-xl mb-4 text-text-dark">Tools I Use</h4>
                    <p className="text-lg text-text-secondary">
                        Figma • FigJam • Maze • Optimal Workshop • HTML/CSS/JS basics
                    </p>
                </div>
            </ScrollAnimation>
        </div>

        <div className="max-w-5xl mx-auto mt-24 md:mt-32">
            <ScrollAnimation>
                <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-4 text-center">Beyond Design</h2>
                <p className="text-lg md:text-xl text-text-secondary mb-12 text-center">Outside of Work</p>
            </ScrollAnimation>
            <div className="prose prose-lg lg:prose-xl text-text-secondary max-w-3xl mx-auto">
                <ScrollAnimation delay={150}>
                    <p>When I'm not designing, you'll find me cycling around Yogyakarta, exploring the city's streets and finding new perspectives—literally and figuratively. I'm always experimenting with new design tools and sharpening my skills, whether it's a new Figma plugin or diving into prototyping techniques.</p>
                </ScrollAnimation>
                <ScrollAnimation delay={300}>
                    <p>I also believe the best ideas come when you slow down. You'll often catch me at a local coffee shop, enjoying a good brew while sketching ideas or just observing how people interact with the world around them.</p>
                </ScrollAnimation>
                <ScrollAnimation delay={450}>
                    <p>I'm convinced that being a good designer means being curious about life beyond screens. Every conversation, ride through the city, or quiet moment with coffee shapes how I see problems and craft solutions.</p>
                </ScrollAnimation>
            </div>
        </div>

      </main>
      <CtaSection />
    </div>
  );
};

export default AboutPage;
