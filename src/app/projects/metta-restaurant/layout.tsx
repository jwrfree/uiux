import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Metta Restaurant Case Study | Wruhantojati",
    description: "A UI/UX case study on the homepage redesign for Metta Restaurant. See how Wruhantojati used competitive analysis and dual-persona strategy to create a conversion-focused design, aiming to increase online reservations for a premium, multi-cuisine platform.",
    alternates: {
        canonical: "/projects/metta-restaurant",
    },
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}