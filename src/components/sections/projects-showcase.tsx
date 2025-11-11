"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  image: string;
  link: string;
  tags: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

const projectsData: Project[] = [
  {
    title: "Mobile banking app redesign focused on improving user onboarding and core features",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/ditto-thumb_2x-1.webp",
    link: "/projects/ditto",
    tags: "Product Design, Mobile",
    stats: [
      { value: "45%", label: "Faster Onboarding" },
      { value: "4.8★", label: "App Store Rating" },
    ],
  },
  {
    title: "SaaS dashboard redesign that improved user engagement and feature discoverability",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/flex-thumb_2x-2.webp",
    link: "/projects/flex",
    tags: "UI/UX Design, Web",
  },
  {
    title: "E-commerce checkout flow optimization through extensive user testing and iteration",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/midfunnel-thumb_2x-3.webp",
    link: "/projects/midfunnel",
    tags: "Product Design, Research",
  },
  {
    title: "Personal brand website with focus on content hierarchy and reading experience",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/sahil-thumb_2x-4.webp",
    link: "/projects/sahilbloom",
    tags: "Web Design, Branding",
    stats: [{ value: "60%", label: "Longer Session Time" }],
  },
  {
    title: "Complete design system creation for consistency across product and marketing",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/utility-thumb_2x-5.webp",
    link: "/projects/utility",
    tags: "Design Systems, Branding",
  },
  {
    title: "AI-powered interface with emphasis on accessibility standards and inclusive design",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/super-thumb_2x-6.webp",
    link: "/projects/super",
    tags: "Product Design, AI/ML",
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
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03, transition: { type: "tween", ease: "easeInOut", duration: 0.5 } }}
    >
      <Link
        href={project.link}
        className="group relative block overflow-hidden rounded-2xl md:rounded-[2rem] bg-bg-card aspect-[4/3]"
      >
        <Image
          src={project.image}
          alt={project.title}
          width={1600}
          height={1200}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/85 via-white/60 to-white/25 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(17,25,40,0.18)] md:bg-gradient-to-t md:from-white/75 md:via-white/55 md:to-white/20 md:backdrop-blur-xl md:border-none md:shadow-none md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
        <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between text-foreground md:text-foreground opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-[clamp(1.5rem,2.5vw,2.75rem)] leading-none -tracking-[0.015em] text-balance max-w-[30ch]">
              {project.title}
            </h3>
            {project.stats && (
              <div className="mt-4 md:mt-8 flex flex-col sm:flex-row gap-x-12 gap-y-4 text-base">
                {project.stats.map((stat, i) => (
                  <div key={i}>
                    <span className="font-medium">{stat.value} </span>
                    <span className="opacity-50">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-row items-center justify-between gap-4 text-base">
            <div className="flex items-center gap-1 font-medium">
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
            <span className="opacity-50 text-right">{project.tags}</span>
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
        <div className="absolute -top-20 sm:-top-28 md:-top-36 lg:-top-48 inset-x-0 flex justify-center -z-0 pointer-events-none">
          <div className="text-[32vw] lg:text-[18vw] font-medium text-foreground/[0.05] leading-none select-none -tracking-[0.025em]" aria-hidden="true">
            My Works
          </div>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
