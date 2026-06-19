"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/cms";

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number;
}

export function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          open={index === defaultOpenIndex}
          className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-base font-bold text-primary marker:content-none md:px-6 md:py-5 md:text-lg [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="border-t border-border px-5 pb-5 pt-3 md:px-6 md:pb-6">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

interface FaqSearchProps {
  query: string;
  onQueryChange: (value: string) => void;
  resultCount: number;
}

export function FaqSearchBar({ query, onQueryChange, resultCount }: FaqSearchProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-5">
      <label htmlFor="faq-search" className="text-sm font-semibold text-primary">
        Search questions
      </label>
      <input
        id="faq-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="e.g. shipping, MOQ, FDA Gear..."
        className={cn(
          "mt-2 flex h-11 w-full rounded-md border border-input bg-background px-4 text-sm shadow-xs",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      />
      {query.trim() && (
        <p className="mt-2 text-xs text-muted-foreground">
          {resultCount} {resultCount === 1 ? "match" : "matches"} found
        </p>
      )}
    </div>
  );
}
