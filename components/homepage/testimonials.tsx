"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import type { Testimonial } from "@/types/cms";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (testimonials.length === 0) return;
      setActiveIndex((index + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  if (testimonials.length === 0) return null;

  const active = testimonials[activeIndex];

  return (
    <section className="bg-[var(--esm-navy-800)] site-section" aria-labelledby="testimonials-heading">
      <div className="site-container">
        <SectionHeader
          overline="Testimonials"
          headline="What procurement teams say"
          align="center"
          dark
          headlineId="testimonials-heading"
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 p-8 md:p-10">
            <Quote className="h-8 w-8 text-[var(--esm-coral-400)]" aria-hidden />
            <blockquote>
              <p className="mt-4 text-lg leading-relaxed text-white md:text-xl lg:text-2xl">
                &ldquo;{active.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-white/10 pt-6">
                <cite className="not-italic">
                  <p className="font-display text-lg font-bold text-white">{active.author}</p>
                  <p className="mt-1 text-sm text-white/70">
                    {active.role}
                  </p>
                  <Badge
                    variant="outline"
                    className="mt-3 border-white/20 bg-white/5 text-white/90"
                  >
                    {active.industry}
                  </Badge>
                </cite>
              </footer>
            </blockquote>
          </div>

          {testimonials.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => goTo(activeIndex - 1)}
                className="h-11 w-11 text-white hover:bg-white/10 hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex gap-2" role="tablist" aria-label="Testimonials">
                {testimonials.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    onClick={() => goTo(index)}
                    className={cn(
                      "flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 transition-all",
                      index === activeIndex ? "bg-white/15" : "hover:bg-white/10",
                    )}
                    aria-label={`Testimonial from ${item.author}`}
                    aria-selected={index === activeIndex}
                  >
                    <span
                      className={cn(
                        "block rounded-full transition-all",
                        index === activeIndex ? "h-2.5 w-6 bg-accent" : "h-2.5 w-2.5 bg-white/30",
                      )}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => goTo(activeIndex + 1)}
                className="h-11 w-11 text-white hover:bg-white/10 hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
