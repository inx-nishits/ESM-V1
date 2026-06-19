"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/lib/navigation/category-icons";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";

interface MegaMenuProps {
  categories: Category[];
  className?: string;
}

export function MegaMenu({ categories, className }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }, [clearCloseTimer]);

  const handleOpen = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  return (
    <div
      ref={containerRef}
      className={cn("relative hidden lg:block", className)}
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
      onFocus={handleOpen}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          scheduleClose();
        }
      }}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
          open
            ? "bg-secondary text-primary"
            : "text-foreground hover:bg-muted hover:text-primary",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        Shop
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 w-[720px] pt-2"
          role="menu"
          onMouseEnter={handleOpen}
          onMouseLeave={scheduleClose}
        >
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-xl">
            <div className="grid grid-cols-[1fr_220px]">
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Shop by Category
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-[var(--esm-coral-600)]"
                    onClick={() => setOpen(false)}
                  >
                    View all
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-1">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/collections/${category.slug}`}
                        className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted"
                        role="menuitem"
                        onClick={() => setOpen(false)}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--esm-navy-50)] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <CategoryIcon slug={category.slug} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold text-foreground group-hover:text-primary">
                              {category.name}
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground">
                              {category.number}
                            </span>
                          </span>
                          <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {category.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="flex flex-col justify-between bg-[var(--esm-navy-700)] p-6 text-white">
                <div>
                  <Badge variant="coral" className="mb-3 bg-[var(--esm-coral-500)] text-white">
                    B2B
                  </Badge>
                  <p className="font-display text-lg font-bold leading-tight">
                    Volume & contract pricing
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Case quantities, net terms, and dedicated account support for qualified
                    businesses.
                  </p>
                </div>
                <Button variant="default" size="sm" className="mt-6 w-full" asChild>
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Request a quote
                  </Link>
                </Button>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
