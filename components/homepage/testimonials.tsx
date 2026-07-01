"use client";

import { Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/cms";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const industryColors: Record<string, string> = {
  "Food Processing": "bg-orange-50 text-orange-700 border-orange-200",
  Healthcare: "bg-sky-50 text-sky-700 border-sky-200",
  Government: "bg-violet-50 text-violet-700 border-violet-200",
  Industrial: "bg-amber-50 text-amber-700 border-amber-200",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-[var(--esm-coral-100)] text-[var(--esm-coral-600)]",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section
      className="site-section-compact bg-white"
      aria-labelledby="testimonials-heading"
    >
      <div className="site-container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-extrabold tracking-tight text-primary sm:text-4xl"
          >
            What procurement teams say
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
            Trusted by food processors, healthcare systems, and government agencies across North America.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, _i) => (
            <div
              key={item.id}
              className={cn(
                "group relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg hover:border-[var(--esm-coral-200)]"
              )}
            >
              {/* Decorative large quote mark */}
              <div className="absolute top-5 right-6 text-[var(--esm-coral-100)] select-none pointer-events-none">
                <Quote className="h-14 w-14 fill-current" aria-hidden />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-[var(--esm-coral-400)] text-[var(--esm-coral-400)]"
                    aria-hidden
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1">
                <p className="text-base leading-relaxed text-foreground/85 relative z-10">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 ring-white shadow-sm",
                    getAvatarColor(item.author)
                  )}
                  aria-hidden
                >
                  {getInitials(item.author)}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-primary truncate">
                    {item.author}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.role}
                  </p>
                </div>
                <div className="ml-auto shrink-0">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                      industryColors[item.industry] ??
                        "bg-zinc-50 text-zinc-600 border-zinc-200"
                    )}
                  >
                    {item.industry}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust line */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Serving <span className="font-semibold text-primary">150+</span> enterprise accounts across North America
        </p>
      </div>
    </section>
  );
}
