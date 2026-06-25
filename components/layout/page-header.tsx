import type { ReactNode } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title?: ReactNode;
  description?: ReactNode;
  breadcrumbs?: { name: string; href: string }[];
  overline?: string;
  heroImage?: string;
  children?: ReactNode;
  action?: ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  overline,
  heroImage,
  children,
  action,
}: PageHeaderProps) {
  return (
    <div>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="border-b border-border bg-muted/30">
          <div className="site-container py-2.5 md:py-3.5">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>
      )}

      {title && (
        <div
          className={cn(
            "relative overflow-hidden",
            heroImage ? "bg-[var(--esm-navy-900)]" : "bg-transparent"
          )}
        >
          {heroImage && (
            <>
              <Image
                src={heroImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--esm-navy-900)]/95 to-[var(--esm-navy-900)]/70" />
            </>
          )}

          <div
            className={cn(
              "relative site-container",
              heroImage ? "py-10 sm:py-14 md:py-20" : "pt-6 sm:pt-8"
            )}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {overline && (
                  <p
                    className={cn(
                      "text-xs font-bold uppercase tracking-[0.2em]",
                      heroImage
                        ? "text-[var(--esm-coral-400)]"
                        : "text-muted-foreground"
                    )}
                  >
                    {overline}
                  </p>
                )}
                <h1
                  className={cn(
                    "mt-2 max-w-2xl font-display text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl",
                    heroImage ? "text-white" : "text-primary"
                  )}
                >
                  {title}
                </h1>
                {description && (
                  <p
                    className={cn(
                      "mt-3 sm:mt-4 max-w-xl text-sm leading-relaxed sm:text-base md:text-lg",
                      heroImage ? "text-white/80" : "text-muted-foreground"
                    )}
                  >
                    {description}
                  </p>
                )}
                {children && <div className="mt-4">{children}</div>}
              </div>

              {action && <div className="shrink-0">{action}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
