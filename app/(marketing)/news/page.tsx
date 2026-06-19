import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { MarketingPageHeader } from "@/components/cms/marketing-page-header";
import { PageHero } from "@/components/cms/page-hero";
import { Button } from "@/components/ui/button";
import { getNewsArticles } from "@/lib/cms/get-news";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "News",
  description: "Product updates and announcements from ESM Products.",
  path: "/news",
});

export default async function NewsIndexPage() {
  const articles = await getNewsArticles();

  return (
    <>
      <MarketingPageHeader title="News" slug="news" />
      <PageHero
        data={{
          overline: "Updates",
          headline: "News & announcements",
          subheadline: "Product launches, fulfillment updates, and company news for business accounts.",
        }}
        compact
      />

      <section className="site-section-compact">
        <div className="site-container">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
                  <div className="border-b border-border bg-[var(--esm-navy-50)] px-6 py-4">
                    {article.category && (
                      <p className="text-xs font-bold uppercase tracking-wider text-accent">
                        {article.category}
                      </p>
                    )}
                    <h2 className="mt-1 font-display text-lg font-extrabold text-primary group-hover:text-accent">
                      <Link href={`/news/${article.slug}`} className="after:absolute after:inset-0">
                        {article.title}
                      </Link>
                    </h2>
                  </div>
                  <div className="relative flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                      {formatDate(article.publishedAt)}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-xl border border-border bg-muted/30 px-6 py-10 text-center md:px-10">
            <h2 className="font-display text-xl font-extrabold text-primary">
              Want updates in your inbox?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Subscribe on the homepage for product announcements, pricing updates, and inventory alerts.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/#newsletter-heading">Subscribe on homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
