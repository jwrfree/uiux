import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Linkedin } from "lucide-react";

interface MarkdownRendererProps {
  text: string;
}

interface ProjectDetails {
  title: string;
  image: string;
  tags: string[];
  summary: string;
  link: string;
}

const PROJECTS_MAP: Record<string, ProjectDetails> = {
  "/projects/teknovo": {
    title: "Teknovo Website Redesign",
    image: "/images/img-card-teknovo.webp",
    tags: ["Web", "B2B", "Internship"],
    summary: "Redesigned the core B2B user experience to improve navigation and search flow.",
    link: "/projects/teknovo",
  },
  "/projects/metta-restaurant": {
    title: "Metta Restaurant Homepage",
    image: "/images/img-card-metta.webp",
    tags: ["Web", "F&B", "Concept"],
    summary: "A premium homepage concept designed to increase reservation conversions.",
    link: "/projects/metta-restaurant",
  },
};

const CONTACT_INFO = {
  email: "wruhantojati@gmail.com",
  linkedin: "https://linkedin.com/in/wrjati",
  linkedinLabel: "linkedin.com/in/wrjati",
};

const CONTACT_TAG = "[SHOW_CONTACT]";

function ContactCard() {
  return (
    <div className="mt-3 pt-2 border-t border-border/30">
      <p className="text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">
        Get in Touch
      </p>
      <div className="flex flex-col gap-2">
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="group/contact flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-all duration-200 active:scale-[0.99]"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary flex-shrink-0">
            <Mail className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate group-hover/contact:text-primary transition-colors">
              {CONTACT_INFO.email}
            </p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Email</p>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover/contact:text-primary group-hover/contact:translate-x-0.5 transition-all flex-shrink-0" />
        </a>

        <a
          href={CONTACT_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group/contact flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-all duration-200 active:scale-[0.99]"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary flex-shrink-0">
            <Linkedin className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate group-hover/contact:text-primary transition-colors">
              {CONTACT_INFO.linkedinLabel}
            </p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider">LinkedIn</p>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover/contact:text-primary group-hover/contact:translate-x-0.5 transition-all flex-shrink-0" />
        </a>
      </div>
    </div>
  );
}

export function MarkdownRenderer({ text }: MarkdownRendererProps) {
  if (!text) return null;

  // Detect and strip [SHOW_CONTACT] tag before processing
  const showContact = text.includes(CONTACT_TAG);
  const cleanText = text.replace(CONTACT_TAG, "").trim();

  const lines = cleanText.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  let key = 0;

  // Track matched projects to display visual cards at the end of the message
  const matchedProjects: ProjectDetails[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key++}`} className="list-disc pl-5 mb-2 mt-1 space-y-1">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  const parseInlineStyles = (content: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remainingText = content;
    let inlineKey = 0;

    while (remainingText) {
      const boldMatch = remainingText.match(/\*\*([\s\S]*?)\*\*/);
      const linkMatch = remainingText.match(/\[([^\]]+)\]\(([^)]+)\)/);

      const boldIndex = boldMatch && boldMatch.index !== undefined ? boldMatch.index : Infinity;
      const linkIndex = linkMatch && linkMatch.index !== undefined ? linkMatch.index : Infinity;

      if (boldIndex === Infinity && linkIndex === Infinity) {
        parts.push(<span key={inlineKey++}>{remainingText}</span>);
        break;
      }

      if (boldIndex < linkIndex && boldMatch) {
        if (boldIndex > 0) {
          parts.push(<span key={inlineKey++}>{remainingText.substring(0, boldIndex)}</span>);
        }
        parts.push(
          <strong key={inlineKey++} className="font-semibold text-foreground">
            {boldMatch[1]}
          </strong>
        );
        remainingText = remainingText.substring(boldIndex + boldMatch[0].length);
      } else if (linkMatch) {
        if (linkIndex > 0) {
          parts.push(<span key={inlineKey++}>{remainingText.substring(0, linkIndex)}</span>);
        }

        const href = linkMatch[2];
        const label = linkMatch[1];

        // Detect if link points to one of our projects
        if (PROJECTS_MAP[href]) {
          if (!matchedProjects.some(p => p.link === href)) {
            matchedProjects.push(PROJECTS_MAP[href]);
          }
        }

        const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.includes("linkedin.com");

        parts.push(
          <Link
            key={inlineKey++}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-primary hover:underline font-medium underline-offset-2 break-all"
          >
            {label}
          </Link>
        );
        remainingText = remainingText.substring(linkIndex + linkMatch[0].length);
      }
    }

    return parts;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");

    if (isBullet) {
      const content = trimmed.substring(2);
      const parsedContent = parseInlineStyles(content);
      currentListItems.push(
        <li key={`li-${i}`} className="text-sm leading-relaxed text-foreground">
          {parsedContent}
        </li>
      );
    } else {
      flushList();

      if (trimmed === "") {
        if (i > 0 && i < lines.length - 1 && lines[i - 1].trim() !== "" && lines[i + 1].trim() !== "") {
          renderedElements.push(<div key={`space-${i}`} className="h-2" />);
        }
      } else {
        const parsedContent = parseInlineStyles(line);
        renderedElements.push(
          <p key={`p-${i}`} className="text-sm leading-relaxed mb-1.5 last:mb-0">
            {parsedContent}
          </p>
        );
      }
    }
  }

  flushList();

  return (
    <div className="space-y-3 break-words">
      <div className="space-y-0.5">{renderedElements}</div>

      {/* Visual interactive project cards */}
      {matchedProjects.length > 0 && (
        <div className="flex flex-col gap-2.5 mt-3 pt-2 border-t border-border/30">
          {matchedProjects.map((project) => (
            <Link
              key={project.link}
              href={project.link}
              className="group/pcard flex flex-col sm:flex-row gap-3 overflow-hidden rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-all duration-300 shadow-2xs hover:shadow-xs active:scale-[0.99]"
            >
              {/* Image Preview Container */}
              <div className="relative w-full sm:w-[120px] aspect-[16/9] sm:aspect-square overflow-hidden flex-shrink-0 bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover/pcard:scale-105"
                />
              </div>

              {/* Card Meta & Detail */}
              <div className="flex flex-col justify-between p-3 sm:pl-0 sm:pr-3 flex-1 min-w-0">
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-semibold tracking-wider uppercase bg-secondary/80 text-secondary-foreground border border-border/30 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xs font-semibold text-foreground line-clamp-1 group-hover/pcard:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-primary mt-2">
                  <span>View Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/pcard:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Smart Contact Card — rendered when AI includes [SHOW_CONTACT] tag */}
      {showContact && <ContactCard />}
    </div>
  );
}
