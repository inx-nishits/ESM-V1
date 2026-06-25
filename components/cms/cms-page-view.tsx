import Image from "next/image";
import Link from "next/link";

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
  pageSlug,
}: {
  block: CmsBlock;
  products?: Product[];
  pageSlug: CmsPageSlug;
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

    case "image_text":
      return (
        <section className="bg-[var(--esm-navy-50)]">
          <div className="w-full">
            <div
              className={cn(
                "grid items-center lg:grid-cols-2",
                block.data.imagePosition === "left" && "lg:[direction:rtl] lg:*:[direction:ltr]",
              )}
            >
              <div className="relative aspect-square lg:aspect-auto lg:h-[650px] overflow-hidden">
                <Image
                  src={block.data.image}
                  alt={block.data.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.5s] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="flex flex-col justify-center px-6 py-16 sm:px-12 md:px-16 lg:px-24 xl:px-32">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl lg:text-5xl">
                  {block.data.headline}
                </h2>
                <div className="mt-8 h-1 w-16 bg-[var(--esm-coral-400)] rounded-full shadow-sm" />
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {block.data.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      );

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

    default:
      return null;
  }
}

export function CmsPageView({ page, products }: CmsPageViewProps) {
  const isLegalPage = legalSlugs.includes(page.slug);
  const firstFaqIndex = page.blocks.findIndex((block) => block.type === "faq_group");
  const hasFaqGroups = firstFaqIndex >= 0;
  const faqGroups = page.blocks
    .filter((block): block is Extract<CmsBlock, { type: "faq_group" }> => block.type === "faq_group")
    .map((block) => block.data);

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
          />
        ))}
        <FaqPageSections groups={faqGroups} />
        {blocksAfterFaq.map((block, index) => (
          <CmsBlockRenderer
            key={`${block.type}-${index}`}
            block={block}
            products={products}
            pageSlug={page.slug}
          />
        ))}
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
        />
      ))}
    </>
  );
}
