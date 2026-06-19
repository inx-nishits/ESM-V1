import { getHomepageIcon } from "@/lib/homepage/icon-map";
import { SectionHeader } from "./section-header";
import type { WhyEsmContent } from "@/types/cms";

interface WhyEsmSectionProps {
  content: WhyEsmContent;
}

export function WhyEsmSection({ content }: WhyEsmSectionProps) {
  return (
    <section className="bg-[var(--esm-navy-50)] site-section" aria-labelledby="why-esm-heading">
      <div className="site-container">
        <SectionHeader
          overline={content.overline}
          headline={content.headline}
          subheadline={content.subheadline}
          align="center"
          headlineId="why-esm-heading"
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => {
            const Icon = getHomepageIcon(item.icon);
            return (
              <li
                key={item.id}
                className="rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
