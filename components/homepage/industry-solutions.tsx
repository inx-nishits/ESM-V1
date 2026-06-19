import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import type { IndustrySolution } from "@/types/cms";

interface IndustrySolutionsProps {
  solutions: IndustrySolution[];
}

export function IndustrySolutions({ solutions }: IndustrySolutionsProps) {
  return (
    <section className="site-section" aria-labelledby="industry-heading">
      <div className="site-container">
        <SectionHeader
          overline="Industries"
          headline="Solutions by sector"
          subheadline="Curated PPE assortments aligned to the compliance and workflow requirements of your industry."
          align="center"
          headlineId="industry-heading"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => (
            <li key={solution.id}>
              <Link
                href={solution.href}
                className="group relative block h-full min-h-[280px] overflow-hidden rounded-lg border border-border shadow-sm transition-shadow hover:shadow-lg"
              >
                <Image
                  src={solution.image}
                  alt={solution.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--esm-navy-900)] via-[var(--esm-navy-900)]/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-lg font-bold text-white">{solution.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-white/75">{solution.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--esm-coral-400)]">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
