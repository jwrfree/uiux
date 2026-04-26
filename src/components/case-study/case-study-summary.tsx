import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CaseStudyMetaItem = {
  label: string;
  value: string;
  icon: LucideIcon;
};

export type CaseStudyCta = {
  label: string;
  href: string;
};

interface CaseStudySummaryProps {
  meta: CaseStudyMetaItem[];
  outcome: React.ReactNode;
  outcomeNote?: React.ReactNode;
  primaryCta?: CaseStudyCta;
  secondaryCta?: CaseStudyCta;
}

export function CaseStudySummary({
  meta,
  outcome,
  outcomeNote,
  primaryCta,
  secondaryCta,
}: CaseStudySummaryProps) {
  return (
    <section
      aria-label="Project summary"
      className="rounded-3xl border border-border/70 bg-secondary/40 p-6 shadow-sm md:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">
        TL;DR for recruiters
      </p>
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
        <dl className="space-y-5 md:col-span-1">
          {meta.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <div>
                <dt className="text-sm font-semibold text-text-dark">{item.label}</dt>
                <dd className="text-base text-text-secondary">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-text-dark md:text-3xl">
            Outcome
          </h2>
          <div className="mt-3 text-lg leading-relaxed text-text-secondary">{outcome}</div>
          {outcomeNote ? (
            <p className="mt-4 text-sm italic text-text-secondary/80">{outcomeNote}</p>
          ) : null}
          {(primaryCta || secondaryCta) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {primaryCta && (
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="group rounded-full"
                >
                  <Link href={primaryCta.href} target="_blank" rel="noopener noreferrer">
                    <span className="font-medium drop-shadow-sm sm:font-semibold">
                      {primaryCta.label}
                    </span>
                    <ArrowUpRight
                      className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="group rounded-full"
                >
                  <Link href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
                    <span className="font-medium drop-shadow-sm sm:font-semibold">
                      {secondaryCta.label}
                    </span>
                    <ArrowUpRight
                      className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
