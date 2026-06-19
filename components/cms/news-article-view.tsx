import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { MarketingPageHeader } from "@/components/cms/marketing-page-header";
import { PageHero } from "@/components/cms/page-hero";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/types/cms";

interface NewsArticleViewProps {
  article: NewsArticle;
}

export function NewsArticleView({ article }: NewsArticleViewProps) {
  const hero = article.blocks.find((block) => block.type === "hero");
  const richTextBlocks = article.blocks.filter((block) => block.type === "rich_text");

  return (
    <>
      <MarketingPageHeader title="News" slug="news" />
      {hero?.type === "hero" ? (
        <PageHero data={hero.data} compact />
      ) : (
        <PageHero
          data={{
            overline: article.category ?? "News",
            headline: article.title,
            subheadline: article.excerpt,
          }}
          compact
        />
      )}

      <section className="site-section-compact">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" aria-hidden />
              {formatDate(article.publishedAt)}
              {article.category && (
                <>
                  <span aria-hidden>·</span>
                  <span className="font-semibold text-primary">{article.category}</span>
                </>
              )}
            </p>

            {richTextBlocks.map((block, index) =>
              block.type === "rich_text" ? (
                <div
                  key={`news-body-${index}`}
                  className="prose prose-neutral mt-8 max-w-none rounded-xl border border-border bg-card p-6 shadow-sm md:p-8 prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-p:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: block.data.html }}
                />
              ) : null,
            )}

            <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row">
              <Button variant="outline" asChild>
                <Link href="/news">All news</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  Contact sales
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
