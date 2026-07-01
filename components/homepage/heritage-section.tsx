import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeritageContent } from "@/types/cms";

interface HeritageSectionProps {
  content: HeritageContent;
}

const milestones = [
  { year: "1998", label: "Founded in West Chicago" },
  { year: "2005", label: "Expanded to full PPE catalog" },
  { year: "Today", label: "Trusted B2B partner nationwide" },
];

export function HeritageSection({ content }: HeritageSectionProps) {
  return (
    <section
      className="relative overflow-hidden bg-[var(--esm-navy-900)] site-section-compact"
      aria-labelledby="heritage-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[480px] w-[480px] rounded-full bg-[var(--esm-coral-500)]/10 blur-3xl"
        aria-hidden
      />

      <div className="site-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--esm-coral-400)]">
              {content.overline}
            </p>
            <h2
              id="heritage-heading"
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
            >
              {content.headline}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              {content.body}
            </p>

            <ul className="mt-8 space-y-4 border-l border-white/15 pl-5">
              {milestones.map((item) => (
                <li key={item.year} className="relative">
                  <span className="absolute -left-[1.375rem] top-1.5 h-2 w-2 rounded-full bg-[var(--esm-coral-400)]" />
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--esm-coral-400)]">
                    {item.year}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-white/85">{item.label}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link href="/about">
                  About ESM
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/35 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl sm:aspect-[4/3] lg:aspect-[3/2]">
              <Image
                src={content.image}
                alt="ESM Products warehouse and PPE inventory in West Chicago"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--esm-navy-900)]/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-5 left-4 right-4 rounded-lg border border-white/15 bg-[var(--esm-navy-800)]/95 p-4 shadow-xl backdrop-blur-md sm:left-6 sm:right-auto sm:max-w-[280px] lg:-bottom-6 lg:-left-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--esm-coral-500)]/20 text-[var(--esm-coral-400)]">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/55">Headquarters</p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-white">
                    1130 Carolina Drive Unit A
                    <br />
                    West Chicago, IL 60185
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 -top-3 hidden rounded-lg border border-white/15 bg-white px-4 py-3 shadow-lg lg:block xl:-right-4">
              <p className="flex items-center gap-2 font-display text-sm font-extrabold text-[var(--esm-navy-700)]">
                <Award className="h-4 w-4 text-[var(--esm-coral-500)]" aria-hidden />
                WBE Certified
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">Since 1998</p>
            </div>
          </div>
        </div>

        <div className="mt-12 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--esm-navy-800)] to-[var(--esm-navy-900)] shadow-2xl">
          {/* Subtle glow accent */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { value: "1998", label: "Year Founded", icon: <Award className="h-4 w-4" />, suffix: "" },
              { value: "6", label: "PPE Categories", icon: null, suffix: "+" },
              { value: "1", label: "Day Standard Ship Time", icon: <Truck className="h-4 w-4" />, suffix: " day" },
              { value: "WBE", label: "Certified Supplier", icon: <Award className="h-4 w-4" />, suffix: "" },
            ].map((item, i) => (
              <div key={i} className="group flex flex-col items-center justify-center px-6 py-8 text-center transition-colors hover:bg-white/5">
                <p className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl drop-shadow-lg">
                  {item.value}
                  {item.suffix && (
                    <span className="text-[var(--esm-coral-400)]">{item.suffix}</span>
                  )}
                </p>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 group-hover:text-white/70 transition-colors">
                  {item.icon && (
                    <span className="text-[var(--esm-coral-400)]">{item.icon}</span>
                  )}
                  {item.label}
                </p>
                {/* Coral underline accent on hover */}
                <div className="mt-3 h-0.5 w-0 bg-[var(--esm-coral-400)] rounded-full transition-all duration-500 group-hover:w-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
