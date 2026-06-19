import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { FdaGearSpotlight } from "@/types/cms";
import type { Product } from "@/types/product";

interface FdaGearSpotlightSectionProps {
  content: FdaGearSpotlight;
  products: Product[];
}

function FdaSpotlightProduct({ product }: { product: Product }) {
  const primaryImage = product.images.find((img) => img.isPrimary) ?? product.images[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/15 md:p-5"
    >
      <div className="flex gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white/10 md:h-28 md:w-28">
          {primaryImage && (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="112px"
              className="object-cover"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Badge variant="coral" className="bg-accent/90 text-accent-foreground">
            Featured SKU
          </Badge>
          <h3 className="mt-2 line-clamp-2 font-display text-base font-bold text-white md:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-white/60">SKU {product.sku}</p>
          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              <p className="font-display text-xl font-extrabold text-white">
                {formatCurrency(product.basePrice)}
              </p>
              <p className="text-xs text-white/60">per case</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--esm-coral-400)]">
              View
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FdaGearSpotlightSection({
  content,
  products,
}: FdaGearSpotlightSectionProps) {
  return (
    <section className="relative overflow-hidden site-section" aria-labelledby="fda-heading">
      <div className="absolute inset-0">
        <Image
          src={content.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--esm-navy-900)]/92" />
      </div>

      <div className="relative site-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Badge variant="coral" className="bg-accent text-accent-foreground">
              {content.overline}
            </Badge>
            <h2
              id="fda-heading"
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl"
            >
              {content.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              {content.description}
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "21 CFR compliant materials",
                "Lot-coded cases for audit trails",
                "Engineered for food & cleanroom use",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--esm-coral-400)]" />
                  {item}
                </li>
              ))}
            </ul>
            <Button variant="default" size="lg" className="mt-8" asChild>
              <Link href={content.ctaHref}>
                {content.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {products.length > 0 && (
            <div className="max-w-md justify-self-center lg:justify-self-end">
              <FdaSpotlightProduct product={products[0]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
