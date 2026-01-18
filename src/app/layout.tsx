import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Footer from "@/components/sections/footer";

const siteUrl = "https://wruhantojati.com";
const siteName = "Wruhantojati | UI/UX Designer Portfolio";
const defaultTitle = "Wruhantojati | UI/UX Designer";
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wruhantojati",
  url: siteUrl,
  jobTitle: "UI/UX Designer",
  image: `${siteUrl}/images/profile.webp`,
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
    template: "%s | Wruhantojati",
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
  authors: [{ name: "Wruhantojati" }],
  creator: "Wruhantojati",
  publisher: "Wruhantojati",
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
        alt: "Wruhantojati - UI/UX Designer Portfolio",
      },
      {
        url: `${siteUrl}/images/profile.webp`,
        width: 800,
        height: 800,
        alt: "A portrait of Wruhantojati",
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
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="lazyOnload"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Footer />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
