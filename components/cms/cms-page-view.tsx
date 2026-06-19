import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { FaqPageSections } from "@/components/cms/faq-page-sections";
import { LegalSidebar } from "@/components/cms/legal-sidebar";
import { MarketingPageHeader } from "@/components/cms/marketing-page-header";
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
        <section className="border-y border-border bg-[var(--esm-navy-50)] py-10 md:py-12">
          <div className="site-container">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {block.data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card px-4 py-5 text-center shadow-sm md:px-6 md:py-6"
                >
                  <p className="font-display text-2xl font-extrabold text-primary md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:text-sm">
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
        <section className="site-section-compact">
          <div className="site-container">
            <div
              className={cn(
                "prose prose-neutral max-w-none rounded-xl border border-border bg-card p-6 shadow-sm md:p-8 lg:p-10",
                "prose-headings:font-display prose-headings:font-bold prose-headings:text-primary",
                "prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground",
                legalSlugs.includes(pageSlug) && "lg:max-w-none",
              )}
              dangerouslySetInnerHTML={{ __html: block.data.html }}
            />
          </div>
        </section>
      );

    case "faq_group":
      return null;

    case "cta_band":
      return (
        <section className="site-section bg-[var(--esm-navy-900)]">
          <div className="site-container text-center">
            <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
              {block.data.headline}
            </h2>
            {block.data.subheadline && (
              <p className="mx-auto mt-3 max-w-xl text-white/75">{block.data.subheadline}</p>
            )}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={block.data.primaryCtaHref}>{block.data.primaryCtaLabel}</Link>
              </Button>
              {block.data.secondaryCtaLabel && block.data.secondaryCtaHref && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  asChild
                >
                  <Link href={block.data.secondaryCtaHref}>{block.data.secondaryCtaLabel}</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      );

    case "image_text":
      return (
        <section className="site-section-compact">
          <div className="site-container">
            <div
              className={cn(
                "grid items-center gap-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:grid-cols-2",
                block.data.imagePosition === "left" && "lg:[direction:rtl] lg:*:[direction:ltr]",
              )}
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px]">
                <Image
                  src={block.data.image}
                  alt={block.data.headline}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10 lg:p-12">
                <h2 className="font-display text-2xl font-extrabold text-primary md:text-3xl">
                  {block.data.headline}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{block.data.body}</p>
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
        <MarketingPageHeader title={page.title} slug={page.slug} />
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
        <MarketingPageHeader title={page.title} slug={page.slug} />
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
      <MarketingPageHeader title={page.title} slug={page.slug} />
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
