"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// CheckIcon component for the pricing card features
const FeatureCheckIcon = () => (
  <div className="flex-shrink-0 pt-1">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="white" fillOpacity="0.1"/>
      <path d="M7.5 10.5L9.5 12.5L13.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const Pricing = () => {
  const [activePlan, setActivePlan] = useState<"monthly" | "custom">("monthly");

  return (
    <section id="pricing" className="relative py-16 md:py-20 lg:py-[120px] bg-background overflow-x-clip">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 flex justify-center pointer-events-none">
        <h2 
          className="text-[clamp(200px,30vw,400px)] font-medium leading-none text-center text-black/5 whitespace-nowrap"
          aria-hidden="true"
        >
          Pricing
        </h2>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-x-12 xl:gap-x-20 gap-y-16 items-start">
          
          <div className="flex flex-col gap-12 justify-between h-full">
            <h3 className="text-4xl md:text-[56px] leading-[1.1] font-medium text-balance bg-gradient-to-b from-text-dark to-text-dark/40 bg-clip-text text-transparent">
              My pricing is transparent, just like my process.
            </h3>
            
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-secondary">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-center">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/images/the5typesofwealth_2x-7.png"
                    alt="The 5 Types of Wealth book cover"
                    width={45}
                    height={64}
                    className="h-16 w-auto rounded-lg shadow-sm"
                  />
                  <div>
                    <p className="text-lg font-medium text-balance text-text-dark">The 5 Types of Wealth</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-text-dark text-balance">
                  "Working with this designer was a game-changer for our product. The attention to detail and user-focused approach delivered results that exceeded our expectations."
                </p>
              </div>
              <div className="flex flex-row gap-3 items-center mt-2">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/bc92d5a2-14ee-4285-94ac-5ada736f5089-offmenu-design/assets/icons/sahilbloom_2x-1.jpg"
                  alt="Sahil Bloom"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="text-base text-muted-foreground">
                  Sahil Bloom — Author, The 5 Types of Wealth
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-row flex-wrap gap-2">
              <button
                onClick={() => setActivePlan("monthly")}
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 transition-all duration-300 font-medium text-sm ${
                  activePlan === 'monthly'
                    ? 'bg-gradient-to-b from-primary to-[#191b18] text-primary-foreground'
                    : 'bg-accent text-accent-foreground ring-1 ring-inset ring-border hover:bg-card'
                }`}
              >
                <span>Monthly</span>
                <span className={activePlan === 'monthly' ? 'text-primary-foreground/60' : 'text-muted-foreground'}>$3,000/mo</span>
              </button>
              <button
                onClick={() => setActivePlan("custom")}
                className={`flex items-center justify-center gap-3 rounded-full px-4 py-3 transition-all duration-300 font-medium text-sm ${
                  activePlan === 'custom'
                    ? 'bg-gradient-to-b from-primary to-[#191b18] text-primary-foreground'
                    : 'bg-accent text-accent-foreground ring-1 ring-inset ring-border hover:bg-card'
                }`}
              >
                <span>Custom</span>
                <span className='text-muted-foreground'>Starts at $8,000</span>
              </button>
            </div>
            
            {activePlan === 'monthly' ? (
              <div className="rounded-3xl md:rounded-[48px] bg-gradient-to-b from-[#232522] to-[#191B18] p-8 md:p-12 text-primary-foreground flex flex-col gap-8 md:gap-12 h-full">
                <h3 className="text-2xl md:text-3xl font-semibold">Monthly Design Retainer</h3>
                
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-3">
                    <FeatureCheckIcon />
                    <p className="text-base md:text-lg">Ongoing design support for your product</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <FeatureCheckIcon />
                    <p className="text-base md:text-lg">Unlimited design requests & revisions</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <FeatureCheckIcon />
                    <p className="text-base md:text-lg">Fast turnaround with regular updates</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <FeatureCheckIcon />
                    <p className="text-base md:text-lg">Direct communication via Slack or email</p>
                  </li>
                </ul>

                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mt-auto">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl lg:text-4xl font-medium tracking-tight">$3,000</p>
                      <p className="text-base md:text-lg opacity-60">per month</p>
                    </div>
                    <p className="text-sm opacity-60 mt-1">billed monthly</p>
                  </div>
                  <a
                    href="/bookacall"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-background to-secondary text-secondary-foreground px-6 py-5 font-medium transition-transform hover:scale-105 w-full md:w-auto"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl md:rounded-[48px] border border-border bg-secondary p-8 md:p-12 text-foreground flex flex-col gap-8 md:gap-12 h-full justify-center items-center text-center">
                 <h3 className="text-2xl md:text-3xl font-semibold">Custom Project</h3>
                 <p className="text-base md:text-lg max-w-xs text-muted-foreground">For larger projects with specific deliverables. Perfect for complete product redesigns, design systems, or multi-phase initiatives.</p>
                 <a
                    href="/bookacall"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-primary to-[#191b18] text-primary-foreground px-6 py-5 font-medium transition-transform hover:scale-105 w-full md:w-auto mt-4"
                 >
                    <span>Book a Call</span>
                    <ArrowRight size={16} />
                 </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;