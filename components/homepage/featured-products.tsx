"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./section-header";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

import { cn } from "@/lib/utils";

interface FeaturedProductsProps {
  products: Product[];
  categories: Category[];
}

export function FeaturedProducts({ products, categories }: FeaturedProductsProps) {
  const categoryMap = new Map(categories.map((category) => [category.slug, category.name]));
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [progress, setProgress] = useState(0);

  // Card width + gap ~= 276px on sm
  const SCROLL_AMOUNT = 276 * 2; // scroll 2 cards at a time

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft: sl, scrollWidth, clientWidth } = el;
    setCanScrollPrev(sl > 4);
    setCanScrollNext(sl < scrollWidth - clientWidth - 4);
    setProgress(scrollWidth > clientWidth ? sl / (scrollWidth - clientWidth) : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  if (products.length === 0) return null;

  const scrollPrev = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };
  const scrollNext = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-zinc-50/50 py-16 md:py-24 relative overflow-hidden" aria-labelledby="featured-heading">
      <div className="site-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            overline="Featured"
            headline="Top picks for restock orders"
            subheadline="Best-selling SKUs with published case pricing — ready to add to cart or quote."
            headlineId="featured-heading"
          />
          <div className="hidden md:flex items-center gap-4 self-start md:self-auto">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full h-10 w-10 border-zinc-200 bg-white transition-all shadow-sm",
                  canScrollPrev ? "hover:bg-zinc-100 text-zinc-600" : "opacity-35 cursor-not-allowed"
                )}
                onClick={scrollPrev}
                disabled={!canScrollPrev}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full h-10 w-10 border-zinc-200 bg-white transition-all shadow-sm",
                  canScrollNext ? "hover:bg-zinc-100 text-zinc-600" : "opacity-35 cursor-not-allowed"
                )}
                onClick={scrollNext}
                disabled={!canScrollNext}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
            <Button variant="outline" className="shrink-0 rounded-full bg-white border-zinc-200 shadow-sm" asChild>
              <Link href="/shop">
                View all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-0.5 w-full rounded-full bg-zinc-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--esm-coral-500)] transition-all duration-200"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>

        <div className="mt-4 -mr-4 sm:-mr-6 lg:mr-[calc(-50vw+50%)]">
          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 gap-4 sm:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
          >
            {products.map((product) => (
              <div key={product.id} className="snap-start shrink-0 w-[240px] sm:w-[260px] flex pointer-events-auto">
                <div className={cn("w-full h-full", isDown ? "pointer-events-none" : "")}>
                  <ProductCard
                    product={product}
                    categoryName={categoryMap.get(product.categorySlug)}
                    compact
                  />
                </div>
              </div>
            ))}
            {/* Spacer */}
            <div className="shrink-0 w-1 sm:w-2 lg:w-[calc(50vw-50%-1.25rem)]" aria-hidden="true" />
          </div>
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Button variant="outline" className="w-full sm:w-auto rounded-full bg-white border-zinc-200 shadow-sm text-[var(--esm-navy-900)]" asChild>
            <Link href="/shop">
              View all products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
