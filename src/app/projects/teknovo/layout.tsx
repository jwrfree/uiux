import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Teknovo Website Redesign Case Study | Wruhantojati",
    description: "As a UI/UX intern, Wruhantojati overhauled the unusable Teknovo website. This case study details the process of using heuristic evaluation to fix critical navigation flaws, expand product filtering by 250%, and build a design system from scratch—all within a 3-month timeline with no research budget.",
    alternates: {
        canonical: "/projects/teknovo",
    },
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}