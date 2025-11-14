import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Wruhantojati - UI/UX Designer Portfolio",
  description: "Portfolio of Wruhantojati, a UI/UX designer with 3 years of experience crafting modern and engaging user experiences. Explore my projects and case studies.",
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
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
