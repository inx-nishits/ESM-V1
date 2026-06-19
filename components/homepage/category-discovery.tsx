import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import type { Category } from "@/types/category";

interface CategoryDiscoveryProps {
  categories: Category[];
}

export function CategoryDiscovery({ categories }: CategoryDiscoveryProps) {
  return (
    <section className="site-section" aria-labelledby="categories-heading">
      <div className="site-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            overline="Catalog"
            headline="Shop by protection category"
            subheadline="Six core categories covering hand, face, head, body, foot, and FDA-compliant gear — all available in case quantities."
            headlineId="categories-heading"
          />
          <Button variant="outline" className="shrink-0 self-start md:self-auto" asChild>
            <Link href="/collections">
              All collections
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <li
              key={category.slug}
              className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{ animationDelay: `${index * 75}ms`, animationDuration: "600ms" }}
            >
              <Link
                href={`/collections/${category.slug}`}
                className="group relative block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--esm-navy-900)]/90 via-[var(--esm-navy-900)]/30 to-transparent" />
                  <span className="absolute left-4 top-4 font-mono text-xs font-medium text-white/70">
                    {category.number}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="font-display text-lg font-bold text-white md:text-xl">
                    {category.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/75">{category.description}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--esm-coral-400)]">
                    {category.productCount} products
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
