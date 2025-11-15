"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Project {
  title: string;
  image: string;
  alt: string;
  link: string;
  tags: string[];
  titleColor: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

const projectsData: Project[] = [
  {
    title: "Teknovo Website Redesign",
    image: "/img-card-teknovo.png",
    alt: "Teknovo IT services marketing site redesign",
    link: "/projects/teknovo",
    tags: ["Web", "B2B", "Internship"],
    titleColor: "#C0FF6A",
  },
  {
    title: "Metta Restaurant Homepage",
    image: "/img-card-metta.jpg",
    alt: "Metta Restaurant responsive homepage concept",
    link: "/projects/metta-restaurant",
    tags: ["Web", "F&B", "Concept"],
    titleColor: "#A7F3D0",
  },
  {
    title: "Bukunest Bookstore App",
    image: "/img-card-bukunest.jpg",
    alt: "Bukunest mobile bookstore concept screens",
    link: "/projects/midfunnel",
    tags: ["Mobile", "Concept"],
    titleColor: "#67E8F9",
  },
  {
    title: "Skilvul Personal Brand Site",
    image: "/img-card-skilvul.png",
    alt: "Content-focused personal brand website layout",
    link: "/projects/sahilbloom",
    tags: ["Web", "Branding"],
    titleColor: "#FCD34D",
    stats: [{ value: "60%", label: "Longer Session Time" }],
  },
  {
    title: "Vidio Design System",
    image: "/img-card-vidio.png",
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
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.5,
    },
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  const titleStyle = {
    color: project.titleColor,
    WebkitTextFillColor: project.titleColor,
    transition: "color 300ms ease",
  } as React.CSSProperties;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.03,
        transition: { type: "tween", ease: "easeInOut", duration: 0.5 },
      }}
      className="md:hover:!opacity-100 md:group-hover/grid:opacity-60 transition-opacity duration-300"
    >
      <Link
        href={project.link}
        className="group/card relative block overflow-hidden rounded-2xl md:rounded-[2rem] bg-bg-card aspect-[4/3]"
      >
        <Image
          src={project.image}
          alt={project.alt}
          width={1600}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover/card:scale-105"
        />

        {/* Mobile overlay */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-2/5 z-10 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-2/5 z-20 p-6 flex flex-col justify-end">
          <h3
            className="font-medium text-[clamp(1.25rem,4vw,1.75rem)] leading-tight -tracking-[0.01em] text-balance max-w-[28ch]"
            style={titleStyle}
          >
            {project.title}
          </h3>
        </div>

        {/* Desktop overlay */}
        <div className="hidden md:block absolute inset-0 z-10 rounded-2xl md:rounded-[2rem] border-2 border-white/40 bg-white/20 dark:border-black/30 dark:bg-black/20 backdrop-blur-2xl md:translate-y-full md:group-hover/card:translate-y-0 transition-transform duration-500 ease-in-out" />
        <div className="hidden md:flex absolute inset-0 z-20 p-6 md:p-8 flex-col justify-between opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 ease-in-out">
          <div className="flex flex-col gap-4">
            <h3
              className="font-medium text-[clamp(1.4rem,2.4vw,2.6rem)] leading-tight -tracking-[0.015em] text-balance max-w-[30ch]"
              style={titleStyle}
            >
              {project.title}
            </h3>
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
              <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-1" />
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
      </Link>
    </motion.div>
  );
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProjectsShowcase = () => {
  return (
    <section
      id="work"
      className="bg-background py-20 sm:py-24 md:py-32 overflow-x-clip"
    >
      <div className="container relative">
        <div className="pointer-events-none absolute inset-x-0 -top-20 -z-0 flex justify-center sm:-top-28 md:-top-36 lg:-top-48">
          <div
            className="text-[32vw] lg:text-[18vw] font-medium leading-none text-foreground/5 -tracking-[0.025em]"
            aria-hidden="true"
          >
            My Works
          </div>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="group/grid relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
