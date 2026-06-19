import { getHomepageIcon } from "@/lib/homepage/icon-map";
import { cn } from "@/lib/utils";
import type { TrustBadge } from "@/types/cms";

interface TrustBadgesProps {
  badges: TrustBadge[];
}

export function TrustBadges({ badges }: TrustBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <section className="border-b border-border bg-card" aria-label="Trust indicators">
      <div className="site-container py-6 md:py-8">
        <ul className="flex flex-col divide-y divide-border lg:flex-row lg:divide-x lg:divide-y-0">
          {badges.map((badge, index) => {
            const Icon = getHomepageIcon(badge.icon);
            return (
              <li
                key={badge.id}
                className={cn(
                  "flex flex-1 items-center gap-4 py-5 first:pt-0 last:pb-0 lg:px-6 lg:py-0",
                  index === 0 && "lg:pl-0",
                  index === badges.length - 1 && "lg:pr-0",
                )}
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--esm-navy-50)] text-primary ring-1 ring-[var(--esm-navy-100)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-primary md:text-base">
                    {badge.label}
                  </p>
                  <p className="mt-0.5 hidden text-sm leading-snug text-muted-foreground sm:block">
                    {badge.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
