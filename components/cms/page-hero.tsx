import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroBlock } from "@/types/cms";

interface PageHeroProps {
  data: HeroBlock;
  compact?: boolean;
}

export function PageHero({ data, compact = false }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--esm-navy-900)]">
      {data.image && (
        <div className="absolute inset-0">
          <Image src={data.image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--esm-navy-900)]/95 via-[var(--esm-navy-900)]/85 to-[var(--esm-navy-900)]/70" />
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />
      <div
        className={
          compact
            ? "relative site-container py-12 md:py-16"
            : "relative site-container py-14 md:py-20 lg:py-24"
        }
      >
        {data.overline && (
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--esm-coral-400)] backdrop-blur-sm">
            {data.overline}
          </p>
        )}
        <h1
          className={
            compact
              ? "mt-3 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl"
              : "mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl"
          }
        >
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {data.subheadline}
          </p>
        )}
        {data.ctaLabel && data.ctaHref && (
          <Button className="mt-8" size="lg" asChild>
            <Link href={data.ctaHref}>
              {data.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
