"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Eye, X, Users, Sparkles, Check } from "lucide-react";

import { ProductCard } from "@/components/commerce/product-card";
import { FaqPageSections } from "@/components/cms/faq-page-sections";
import { LegalSidebar } from "@/components/cms/legal-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { PageHero } from "@/components/cms/page-hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CmsBlock, CmsPage, CmsPageSlug } from "@/types/cms";
import type { Product } from "@/types/product";

interface CmsPageViewProps {
  page: CmsPage;
  products?: Product[];
}

const legalSlugs: CmsPageSlug[] = ["terms", "privacy", "disclaimer"];

function CmsBlockRenderer({
  block,
  products,
  pageSlug: _pageSlug,
  onImageClick,
}: {
  block: CmsBlock;
  products?: Product[];
  pageSlug: CmsPageSlug;
  onImageClick?: (url: string, alt: string) => void;
}) {
  switch (block.type) {
    case "hero":
      return <PageHero data={block.data} />;

    case "stat_row":
      return (
        <section className="site-section relative overflow-hidden bg-[var(--esm-navy-900)]">
          <div className="absolute left-1/2 top-0 h-[500px] w-full max-w-[1000px] -translate-x-1/2 opacity-20 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--esm-coral-400)] to-[#4F46E5] blur-3xl mix-blend-screen" />
          </div>
          
          <div className="site-container relative z-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-0 md:divide-x md:divide-white/10">
              {block.data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center justify-center text-center"
                >
                  <p className="font-display text-4xl font-extrabold tracking-tight text-white transition-transform duration-500 group-hover:scale-110 md:text-5xl lg:text-6xl drop-shadow-lg">
                    {stat.value}
                  </p>
                  <div className="mt-5 mb-4 h-1 w-8 rounded-full bg-[var(--esm-coral-400)] transition-all duration-500 group-hover:w-16 shadow-[0_0_10px_var(--esm-coral-400)]" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 md:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "rich_text":
      return (
        <section className="site-section relative">
          <div className="site-container">
            <div className="mx-auto max-w-4xl">
              <div
                className={cn(
                  "prose prose-neutral prose-lg max-w-none",
                  "prose-headings:font-display prose-headings:font-bold prose-headings:text-primary",
                  "prose-p:text-[#4B5563] prose-p:leading-relaxed prose-strong:text-foreground prose-li:text-muted-foreground",
                  "border-l-[6px] border-[var(--esm-coral-400)] pl-6 md:pl-10"
                )}
                dangerouslySetInnerHTML={{ __html: block.data.html }}
              />
            </div>
          </div>
        </section>
      );

    case "faq_group":
      return null;

    case "cta_band":
      return (
        <section className="site-section site-container">
          <div className="relative overflow-hidden rounded-[2rem] bg-[var(--esm-navy-900)] px-6 py-16 shadow-2xl sm:px-12 md:px-16 lg:px-20 lg:py-20">
            {/* Decorative Coral Accent */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[var(--esm-coral-500)]/10 to-transparent pointer-events-none" />
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--esm-coral-500)]/20 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {block.data.headline}
                </h2>
                {block.data.subheadline && (
                  <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80 lg:mx-0 md:text-xl">
                    {block.data.subheadline}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col gap-4 sm:flex-row w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-base font-bold shadow-lg transition-transform hover:scale-105" asChild>
                  <Link href={block.data.primaryCtaHref}>{block.data.primaryCtaLabel}</Link>
                </Button>
                {block.data.secondaryCtaLabel && block.data.secondaryCtaHref && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 border-white/20 bg-white/5 px-8 text-base font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <Link href={block.data.secondaryCtaHref}>{block.data.secondaryCtaLabel}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      );

    case "image_text": {
      // Split the body into sentences to create bullet lists for long descriptions
      const cleanBody = block.data.body.replace(/\.{3}/g, "…");
      const sentences = cleanBody
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const leadSentence = sentences[0] || "";
      const bulletSentences = sentences.slice(1);

      return (
        <section className="py-20 lg:py-28 overflow-hidden bg-white odd:bg-neutral-50/50 border-y border-neutral-100/30">
          <div className="site-container">
            <div
              className={cn(
                "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
                block.data.imagePosition === "left" && "lg:[direction:rtl] lg:*:[direction:ltr]",
              )}
            >
              {/* Image Column */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-square overflow-hidden rounded-3xl border border-neutral-200/60 p-2 bg-white shadow-xl shadow-neutral-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <Image
                      src={block.data.image}
                      alt={block.data.headline}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--esm-coral-50)] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--esm-coral-600)]">
                    ESM Advantage
                  </span>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-5xl leading-[1.1]">
                    {block.data.headline}
                  </h2>
                  <div className="h-1 w-20 bg-[var(--esm-coral-400)] rounded-full shadow-sm" />
                </div>

                <div className="space-y-6">
                  {leadSentence && (
                    <p className="text-lg font-bold text-neutral-800 leading-relaxed md:text-xl">
                      {leadSentence}
                    </p>
                  )}

                  {bulletSentences.length > 0 ? (
                    <ul className="grid gap-4">
                      {bulletSentences.map((sentence, idx) => (
                        <li key={idx} className="flex items-start gap-3 group">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                            <Check className="h-3 w-3" />
                          </span>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {sentence}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    // Fallback for single sentence paragraphs
                    <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
                      {cleanBody}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    case "product_grid": {
      const gridProducts = products?.filter((p) => block.data.productIds.includes(p.id)) ?? [];
      if (gridProducts.length === 0) return null;
      return (
        <section className="site-section-compact">
          <div className="site-container">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridProducts.map((product) => (
                <li key={product.id} className="h-full">
                  <ProductCard product={product} compact />
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    }

    case "image_gallery": {
      const certImages = block.data.images.slice(0, 5);
      const teamImages = block.data.images.slice(5);

      return (
        <section className="site-section bg-neutral-50/50 py-16">
          <div className="site-container space-y-16">
            {/* Certifications Group */}
            <div className="space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  Compliance & Quality
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                  Verified Certifications & Training
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  ESM Products holds accredited compliance credentials to meet USDA, food plant safety, and corporate diversity spend requirements.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:gap-6">
                {certImages.map((img, idx) => (
                  <div
                    key={`cert-${idx}`}
                    onClick={() => onImageClick?.(img.image, img.alt)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-4 border border-border shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                        <Award className="h-3 w-3" />
                        Accredited
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>

                    <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-neutral-50 p-2 flex items-center justify-center">
                      <Image
                        src={img.image}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.03] p-1"
                      />
                      {/* Zoom overlay */}
                      <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-1.5">
                        <Eye className="h-5 w-5 animate-bounce" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Enlarge View</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs font-semibold text-primary line-clamp-2 text-center min-h-[2rem]">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team / Operations Group */}
            <div className="space-y-8 pt-6 border-t border-neutral-200/60">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                  <Users className="h-4 w-4" />
                  Our Team & Culture
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                  Logistics & Operational Excellence
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Meet the people driving the same-day B2B fulfillment and service infrastructure that keeps food plants compliant.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {teamImages.map((img, idx) => (
                  <div
                    key={`team-${idx}`}
                    onClick={() => onImageClick?.(img.image, img.alt)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-border shadow-xs hover:shadow-lg hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={img.image}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Zoom overlay */}
                      <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                          <Eye className="h-4 w-4" />
                          View Photo
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          ESM Operations
                        </span>
                        <p className="text-sm font-bold text-primary">
                          {img.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}

export function CmsPageView({ page, products }: CmsPageViewProps) {
  const [activeImage, setActiveImage] = useState<{ url: string; alt: string } | null>(null);
  const isLegalPage = legalSlugs.includes(page.slug);
  const firstFaqIndex = page.blocks.findIndex((block) => block.type === "faq_group");
  const hasFaqGroups = firstFaqIndex >= 0;
  const faqGroups = page.blocks
    .filter((block): block is Extract<CmsBlock, { type: "faq_group" }> => block.type === "faq_group")
    .map((block) => block.data);

  const lightboxElement = activeImage && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in cursor-pointer"
      onClick={() => setActiveImage(null)}
    >
      <button
        className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
        onClick={() => setActiveImage(null)}
      >
        <X className="h-6 w-6" />
      </button>
      <div
        className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-2 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-auto max-h-[75vh] min-h-[320px] w-[80vw] max-w-[900px]">
          <Image
            src={activeImage.url}
            alt={activeImage.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        <div className="mt-4 px-4 pb-2 text-center">
          <p className="text-sm font-semibold text-white/90">{activeImage.alt}</p>
        </div>
      </div>
    </div>
  );

  if (isLegalPage) {
    const richTextBlocks = page.blocks.filter((block) => block.type === "rich_text");
    const nonRichBlocks = page.blocks.filter((block) => block.type !== "rich_text");

    return (
      <>
        <PageHeader 
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: page.title, href: `/${page.slug}` },
          ]} 
        />
        {nonRichBlocks.map((block, index) => (
          <CmsBlockRenderer
            key={`${block.type}-${index}`}
            block={block}
            products={products}
            pageSlug={page.slug}
            onImageClick={(url, alt) => setActiveImage({ url, alt })}
          />
        ))}
        {richTextBlocks.length > 0 && (
          <section className="site-section-compact">
            <div className="site-container">
              <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
                <LegalSidebar activeSlug={page.slug} className="h-fit lg:sticky lg:top-24" />
                <div className="space-y-8">
                  {richTextBlocks.map((block, index) => (
                    <div
                      key={`rich-${index}`}
                      className="prose prose-neutral max-w-none rounded-xl border border-border bg-card p-6 shadow-sm md:p-8 lg:p-10 prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: block.data.html }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        {lightboxElement}
      </>
    );
  }

  if (hasFaqGroups) {
    const blocksBeforeFaq = page.blocks.slice(0, firstFaqIndex);
    const blocksAfterFaq = page.blocks.slice(
      firstFaqIndex + faqGroups.length,
    );

    return (
      <>
        <PageHeader 
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: page.title, href: `/${page.slug}` },
          ]} 
        />
        {blocksBeforeFaq.map((block, index) => (
          <CmsBlockRenderer
            key={`${block.type}-${index}`}
            block={block}
            products={products}
            pageSlug={page.slug}
            onImageClick={(url, alt) => setActiveImage({ url, alt })}
          />
        ))}
        <FaqPageSections groups={faqGroups} />
        {blocksAfterFaq.map((block, index) => (
          <CmsBlockRenderer
            key={`${block.type}-${index}`}
            block={block}
            products={products}
            pageSlug={page.slug}
            onImageClick={(url, alt) => setActiveImage({ url, alt })}
          />
        ))}
        {lightboxElement}
      </>
    );
  }

  return (
    <>
      <PageHeader 
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: page.title, href: `/${page.slug}` },
        ]} 
      />
      {page.blocks.map((block, index) => (
        <CmsBlockRenderer
          key={`${block.type}-${index}`}
          block={block}
          products={products}
          pageSlug={page.slug}
          onImageClick={(url, alt) => setActiveImage({ url, alt })}
        />
      ))}
      {lightboxElement}
    </>
  );
}
