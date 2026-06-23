import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ContactForm,
  ContactInfoPanel,
  ContactProcessSteps,
} from "@/components/cms/contact-form";
import type { CmsPage, HeroBlock } from "@/types/cms";
import Image from "next/image";

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
      <section className="relative overflow-hidden bg-[var(--esm-navy-900)] pt-6 pb-14 md:pt-8 md:pb-20 lg:pt-10 lg:pb-24">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--esm-navy-900)] to-transparent opacity-80" />
        
        <div className="relative site-container">
          {/* Integrated Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              <li>
                <span className="font-semibold text-white">{page.title}</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {hero.overline && (
              <p className="inline-flex items-center rounded-full border border-[var(--esm-coral-500)]/30 bg-[var(--esm-coral-500)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--esm-coral-400)] backdrop-blur-sm mb-4">
                {hero.overline}
              </p>
            )}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-sm">
              {hero.headline}
            </h1>
            {hero.subheadline && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl font-medium">
                {hero.subheadline}
              </p>
            )}
          </div>
        </div>
      </section>

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
