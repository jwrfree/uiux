"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ScrollAnimation } from "../ui/scroll-animation";

interface Project {
  title: string;
  image: string;
  alt: string;
  link: string;
  tags: string[];
  summary: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

const projectsData: Project[] = [
  {
    title: "Teknovo Website Redesign",
    image: "/images/img-card-teknovo.webp",
    alt: "Teknovo IT services marketing site redesign",
    link: "/projects/teknovo",
    tags: ["Web", "B2B", "Internship"],
    summary: "In 3 months as an intern, I redesigned the core user experience—fixing navigation, expanding search, and bringing visual consistency across 15+ pages.",
  },
  {
    title: "Metta Restaurant Homepage",
    image: "/images/img-card-metta.webp",
    alt: "Metta Restaurant responsive homepage concept",
    link: "/projects/metta-restaurant",
    tags: ["Web", "F&B", "Concept"],
    summary: "A homepage design proposal for a multi-cuisine restaurant platform, aimed at increasing reservation conversions and establishing a premium brand image.",
  },
  /*
  {
    title: "Bukunest Bookstore App",
    image: "/images/img-card-bukunest.webp",
    alt: "Bukunest mobile bookstore concept screens",
    link: "/projects/midfunnel",
    tags: ["Mobile", "Concept"],
    titleColor: "#67E8F9",
  },
  {
    title: "Skilvul Personal Brand Site",
    image: "/images/img-card-skilvul.webp",
    alt: "Content-focused personal brand website layout",
    link: "/projects/sahilbloom",
    tags: ["Web", "Branding"],
    titleColor: "#FCD34D",
    stats: [{ value: "60%", label: "Longer Session Time" }],
  },
  {
    title: "Vidio Design System",
    image: "/images/img-card-vidio.webp",
    alt: "Design system documentation for Vidio product",
    link: "/projects/utility",
    tags: ["Design System", "Product"],
    titleColor: "#F472B6",
  },
  {
    title: "AI Assistant Interface",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/super-thumb_2x-6.webp",
    alt: "Accessible AI assistant interface in dark mode",
    link: "/projects/super",
    tags: ["Product", "AI/ML"],
    titleColor: "#A78BFA",
  },
  */
];

const ProjectCard = ({ project, delay }: { project: Project, delay: number }) => {
  const titleClass =
    "font-medium text-[clamp(1.4rem,2.4vw,2.6rem)] leading-tight -tracking-[0.015em] text-balance max-w-[30ch] text-foreground";

  return (
    <ScrollAnimation
      delay={delay}
      className="lg:hover:!opacity-100 lg:group-hover/grid:opacity-60 transition-opacity duration-300"
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          transition: { type: "tween", ease: "easeInOut", duration: 0.5 },
        }}
      >
        <Link href={project.link} className="group/card block space-y-4">
          <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-bg-card aspect-[4/3]">
            <Image
              src={project.image}
              alt={project.alt}
              width={1600}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out lg:group-hover/card:scale-105"
            />

            {/* Desktop overlay */}
            <div className="hidden lg:block absolute inset-0 z-10 rounded-2xl md:rounded-[2rem] border-2 border-white/40 bg-white/20 dark:border-black/30 dark:bg-black/20 backdrop-blur-2xl lg:translate-y-full lg:group-hover/card:translate-y-0 transition-transform duration-500 ease-in-out" />
            <div className="hidden lg:flex absolute inset-0 z-20 p-6 md:p-8 flex-col justify-between opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-500 ease-in-out">
              <div className="flex flex-col gap-4">
                <h3 className={titleClass}>{project.title}</h3>
                <p className="text-base text-foreground/80 leading-relaxed">
                  {project.summary}
                </p>
                {project.stats && (
                  <div className="mt-4 flex flex-col gap-3 text-base text-foreground/70 sm:flex-row sm:gap-8">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <span className="font-semibold text-foreground">{stat.value}</span>{" "}
                        <span className="opacity-70">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            <div className="flex flex-row items-center justify-between gap-4 text-base">
              <div className="flex items-center gap-1 font-medium">
                <span>View Case Study</span>
                <ArrowRight className="h-4 w-4 transition-transform lg:group-hover/card:translate-x-1" />
              </div>
                <div className="flex flex-wrap justify-end gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-xs uppercase tracking-wide"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile & tablet details */}
          <div className="lg:hidden px-1 text-foreground flex flex-col gap-3">
            <h3 className="font-semibold text-xl leading-tight text-balance text-foreground">
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-2 text-foreground">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs uppercase tracking-wide"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm font-medium text-foreground pt-1">
              <span className="inline-flex items-center gap-1">
                View Case Study
                <ArrowRight className="h-4 w-4" />
              </span>
              {project.stats && (
                <div className="text-right text-xs text-foreground/70">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="font-semibold text-foreground">{stat.value}</span>{" "}
                      <span>{stat.label}</span>
                    </div>
                  ))}\
                </div>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </ScrollAnimation>
  );
};

const ProjectsShowcase = () => {
  return (
    <section
      id="work"
      className="bg-background py-20 sm:py-24 md:py-32 overflow-x-clip"
    >
      <div className="container relative">
        <div className="pointer-events-none absolute inset-x-0 -top-20 -z-0 flex justify-center sm:-top-28 md:-top-36 lg:-top-48">
          <ScrollAnimation>
            <div
                className="text-[32vw] lg:text-[18vw] font-medium leading-none text-foreground/5 -tracking-[0.025em]"
                aria-hidden="true"
            >
                My Works
            </div>
          </ScrollAnimation>
        </div>

        <div
          className="group/grid relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-14"
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} delay={index * 150} />
          ))}\
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
