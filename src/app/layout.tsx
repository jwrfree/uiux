import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import DevTooling from "@/components/dev-tooling";
import { SITE } from "@/lib/site";

const siteUrl = SITE.url;
const siteName = `${SITE.name} | UI/UX Designer Portfolio`;
const defaultTitle = `${SITE.name} | UI/UX Designer`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: siteUrl,
  jobTitle: "UI/UX Designer",
  image: `${siteUrl}/images/profile.webp`,
  email: SITE.email,
  description:
    "Mid-level UI/UX designer specializing in creating intuitive, user-centric, and visually compelling digital experiences.",
  knowsAbout: [
    "UI/UX Design",
    "User-Centered Design",
    "Interaction Design",
    "User Research",
    "Prototyping",
    "Design Systems",
  ],
  sameAs: [SITE.linkedin, SITE.behance, SITE.dribbble],
  worksFor: [
    {
      "@type": "Organization",
      name: "Independent",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Portfolio of Wruhantojati, a mid-level UI/UX designer focused on creating intuitive and impactful digital experiences. Explore case studies, design process, and professional work.",
  keywords: [
    "Wruhantojati",
    "UI/UX Designer",
    "User Experience Designer",
    "User Interface Designer",
    "Portfolio",
    "Case Studies",
    "Design Systems",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_US",
    siteName,
    title: defaultTitle,
    description:
      "A UI/UX designer dedicated to blending user research, strategy, and visual design to create human-centric products.",
    images: [
      {
        url: `${siteUrl}/og-cover.svg`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} - UI/UX Designer Portfolio`,
      },
      {
        url: `${siteUrl}/images/profile.webp`,
        width: 800,
        height: 800,
        alt: `A portrait of ${SITE.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@wruhantojati",
    title: defaultTitle,
    description:
      "A UI/UX designer dedicated to blending user research, strategy, and visual design to create human-centric products.",
    images: [`${siteUrl}/og-cover.svg`, `${siteUrl}/images/profile.webp`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <DevTooling />
      </body>
    </html>
  );
}
