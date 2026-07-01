import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.35)]"
    >
      {/* Top image area — square so portrait product photos show in full */}
      <div className="relative w-full aspect-square overflow-hidden bg-zinc-50">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt}
            fill
            sizes="420px"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {/* Featured badge overlay */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent/30">
          <Star className="h-3 w-3 fill-white" />
          Featured SKU
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-400">SKU {product.sku}</p>
        <h3 className="mt-1.5 font-display text-lg font-extrabold leading-tight text-zinc-900 line-clamp-2 group-hover:text-[var(--esm-coral-600)] transition-colors">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-zinc-50 px-4 py-3">
          <div>
            <p className="font-display text-2xl font-extrabold text-zinc-900">
              {formatCurrency(product.basePrice)}
            </p>
            <p className="text-xs text-zinc-500">per case</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-lg bg-[var(--esm-coral-500)] px-4 py-2 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all duration-200 group-hover:bg-[var(--esm-coral-600)] group-hover:shadow-accent/40">
            View
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Trust micro-badges */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
            <ShieldCheck className="h-3 w-3" /> FDA Compliant
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 text-[10px] font-semibold text-sky-700">
            <Truck className="h-3 w-3" /> Ships in 1 Day
          </span>
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
    <section className="relative overflow-hidden site-section-compact" aria-labelledby="fda-heading">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <Image
          src={content.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--esm-navy-900)]/97 via-[var(--esm-navy-900)]/90 to-[var(--esm-navy-800)]/85" />
        {/* Glow blobs */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[var(--esm-coral-500)]/10 blur-[60px]" />
      </div>

      <div className="relative site-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* Left: Text content */}
          <div>
            {/* Pill badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              {content.overline}
            </div>

            <h2
              id="fda-heading"
              className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {content.headline}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {content.description}
            </p>

            {/* Feature checklist */}
            <ul className="mt-8 space-y-3">
              {[
                "21 CFR compliant materials",
                "Lot-coded cases for full audit trails",
                "Engineered for food & cleanroom use",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent ring-1 ring-accent/30">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" className="h-12 px-7 shadow-lg shadow-accent/25" asChild>
                <Link href={content.ctaHref}>
                  {content.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/25 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>

          {/* Right: Product card */}
          {products.length > 0 && (
            <div className="max-w-sm w-full mx-auto lg:mx-0 lg:ml-auto">
              <FdaSpotlightProduct product={products[0]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
