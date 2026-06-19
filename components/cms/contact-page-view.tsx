import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContactForm,
  ContactInfoPanel,
  ContactProcessSteps,
} from "@/components/cms/contact-form";
import { MarketingPageHeader } from "@/components/cms/marketing-page-header";
import { PageHero } from "@/components/cms/page-hero";
import type { CmsPage, HeroBlock } from "@/types/cms";

interface ContactPageViewProps {
  page: CmsPage;
}

function getHeroBlock(page: CmsPage): HeroBlock {
  const hero = page.blocks.find((block) => block.type === "hero");
  if (hero?.type === "hero") return hero.data;

  return {
    overline: "Contact",
    headline: page.title,
    subheadline: "Reach our West Chicago sales team for quotes, account setup, and product guidance.",
  };
}

export function ContactPageView({ page }: ContactPageViewProps) {
  const hero = getHeroBlock(page);

  return (
    <>
      <MarketingPageHeader title={page.title} slug={page.slug} />
      <PageHero data={hero} />

      <section className="site-section-compact">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <aside className="lg:col-span-5 lg:pt-2">
              <ContactInfoPanel />
            </aside>
          </div>
        </div>
      </section>

      <ContactProcessSteps />

      <section className="site-section bg-[var(--esm-navy-900)]">
        <div className="site-container text-center">
          <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
            Prefer to browse first?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/75">
            Explore case-quantity PPE with published pricing — or start with our FDA Gear collection.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/shop">
                Shop all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/35 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              asChild
            >
              <Link href="/collections/fda-gear">Browse FDA Gear</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
