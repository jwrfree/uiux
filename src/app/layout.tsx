import type { Metadata, Viewport } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Footer from "@/components/sections/footer";

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
const siteName = "Wruhantojati Portfolio";
const defaultTitle = "Wruhantojati | Product Designer";
const unifiedDescription = "Wruhantojati is a mid-level product designer crafting humane, measurable experiences for civic, AI, and growth teams. Explore case studies, process, and outcomes.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wruhantojati",
  url: siteUrl,
  jobTitle: "Product Designer",
  image: `${siteUrl}/images/profile.jpg`,
  description: unifiedDescription,
  knowsAbout: [
    "Product Design",
    "Design Systems",
    "Behavior Change",
    "Interaction Design",
    "User Research",
  ],
  worksFor: [
    {
      "@type": "Organization",
      name: "Independent",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/your-profile/",
    "https://dribbble.com/your-profile",
    "https://www.behance.net/your-profile",
    "https://github.com/your-username"
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Wruhantojati",
  },
  description: unifiedDescription,
  keywords: [
    "Wruhantojati",
    "Product Designer",
    "UI/UX Designer",
    "Portfolio",
    "Case Studies",
    "Behavior Change Products",
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
    description: unifiedDescription,
    images: [
      {
        url: `${siteUrl}/og-cover.png`,
        width: 1200,
        height: 630,
        alt: "Wruhantojati - Product Designer",
      },
      {
        url: `${siteUrl}/images/profile.jpg`,
        width: 800,
        height: 800,
        alt: "Wruhantojati portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@wruhantojati",
    title: defaultTitle,
    description: unifiedDescription,
    images: [`${siteUrl}/og-cover.png`, `${siteUrl}/images/profile.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
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
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
