"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types/cms";

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused, next]);

  if (slides.length === 0) return null;

  const slide = slides[activeIndex];

  return (
    <section
      className="group/hero relative isolate overflow-hidden bg-[var(--esm-navy-900)]"
      aria-roledescription="carousel"
      aria-label="Promotional banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9] lg:max-h-[min(85vh,820px)]">
        {slides.map((item, index) => (
          <div
            key={item.id}
            id={`hero-slide-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`hero-slide-tab-${index}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={index !== activeIndex}
          >
            {item.video && index === activeIndex ? (
              <video
                key={item.video}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={item.image}
                preload="none"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                aria-hidden
              >
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={item.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            )}
          </div>
        ))}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/70 via-black/25 to-black/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[var(--esm-navy-900)]/80 via-[var(--esm-navy-900)]/35 to-transparent lg:max-w-[65%]"
          aria-hidden
        />

        <div className="absolute inset-0 z-[3] flex items-end pb-24 sm:items-center sm:pb-0">
          <div className="site-container">
            <div
              key={slide.id}
              className="max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-700 fill-mode-both"
            >
              <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-white/95 backdrop-blur-sm">
                {slide.overline}
              </p>

              <h1 className="mt-2 sm:mt-3 font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                {slide.headline}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-lg md:mt-5">
                {slide.subheadline}
              </p>

              <div className="mt-6 flex w-full flex-row gap-3 sm:items-center">
                <Button
                  variant="default"
                  size="lg"
                  className="flex-1 h-11 sm:h-12 sm:flex-none sm:min-w-[140px] rounded-lg px-2 sm:px-6 text-sm sm:text-base font-bold shadow-lg shadow-[var(--esm-coral-500)]/20"
                  asChild
                >
                  <Link href={slide.primaryCtaHref} className="flex items-center justify-center gap-1 sm:gap-2">
                    {slide.primaryCtaLabel}
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </Button>
                {slide.secondaryCtaLabel && slide.secondaryCtaHref && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 h-11 sm:h-12 sm:flex-none sm:min-w-[140px] rounded-lg border-2 border-white/30 bg-white/10 px-2 sm:px-6 text-sm sm:text-base font-bold text-white backdrop-blur-md hover:border-white/60 hover:bg-white/20 hover:text-white transition-all"
                    asChild
                  >
                    <Link href={slide.secondaryCtaHref} className="flex items-center justify-center">
                      {slide.secondaryCtaLabel}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={prev}
              className="absolute left-3 top-1/2 z-[4] hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 hover:text-white group-hover/hero:opacity-100 md:flex lg:left-6"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={next}
              className="absolute right-3 top-1/2 z-[4] hidden h-12 w-12 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 hover:text-white group-hover/hero:opacity-100 md:flex lg:right-6"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-[4] bg-gradient-to-t from-black/50 to-transparent px-4 pb-5 pt-8 md:px-8">
          <div className="site-container flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Banner slides">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  id={`hero-slide-tab-${index}`}
                  type="button"
                  role="tab"
                  onClick={() => goTo(index)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "h-2.5 w-8 bg-[var(--esm-coral-400)]"
                      : "h-2.5 w-2.5 bg-white/45 hover:bg-white/70",
                  )}
                  aria-label={`Slide ${index + 1}: ${item.headline}`}
                  aria-selected={index === activeIndex}
                  aria-controls={`hero-slide-panel-${index}`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  suppressHydrationWarning
                />
              ))}
            </div>

            <p className="hidden text-xs font-medium text-white/60 sm:block">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
          </div>

          <div className="site-container mt-3 h-0.5 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full bg-[var(--esm-coral-400)] transition-all duration-700 ease-linear"
              style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeIndex + 1} of {slides.length}: {slide.headline}
      </div>
    </section>
  );
}
