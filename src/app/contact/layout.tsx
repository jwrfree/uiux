import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Me | Wruhantojati",
    description: "Let's connect. Whether you have a project in mind, a question, or just want to say hi, I'm open to new opportunities and collaborations. Reach out to discuss your next project or to learn more about my work.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}