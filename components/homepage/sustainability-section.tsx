import Image from "next/image";
import { Leaf } from "lucide-react";
import { SectionHeader } from "./section-header";
import type { SustainabilityContent } from "@/types/cms";

interface SustainabilitySectionProps {
  content: SustainabilityContent;
}

export function SustainabilitySection({ content }: SustainabilitySectionProps) {
  return (
    <section className="site-section" aria-labelledby="sustainability-heading">
      <div className="site-container">
        <div className="grid items-center gap-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={content.image}
              alt="Sustainable PPE packaging and distribution"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="p-8 md:p-10 lg:p-12">
            <SectionHeader
              overline="Responsibility"
              headline={content.headline}
              subheadline={content.subheadline}
              headlineId="sustainability-heading"
            />
            <ul className="mt-8 space-y-5">
              {content.points.map((point) => (
                <li key={point.id} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--esm-coral-100)] text-accent">
                    <Leaf className="h-4 w-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-primary">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
