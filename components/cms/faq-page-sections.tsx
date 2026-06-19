"use client";

import { useMemo, useState } from "react";
import { FaqAccordion, FaqSearchBar } from "./faq-accordion";
import type { FaqGroupBlock } from "@/types/cms";

interface FaqPageSectionsProps {
  groups: FaqGroupBlock[];
}

export function FaqPageSections({ groups }: FaqPageSectionsProps) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(normalized) ||
            item.answer.toLowerCase().includes(normalized),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const resultCount = filteredGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section className="site-section-compact">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FaqSearchBar query={query} onQueryChange={setQuery} resultCount={resultCount} />
            <nav className="mt-6 hidden space-y-1 lg:block" aria-label="FAQ categories">
              {groups.map((group) =>
                group.title ? (
                  <a
                    key={group.title}
                    href={`#${slugify(group.title)}`}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    {group.title}
                  </a>
                ) : null,
              )}
            </nav>
          </aside>

          <div className="space-y-12">
            {filteredGroups.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
                <p className="font-display text-lg font-bold text-primary">No matches found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a different keyword or contact our team for help.
                </p>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.title ?? "faq-group"} id={group.title ? slugify(group.title) : undefined}>
                  {group.title && (
                    <h2 className="mb-5 font-display text-xl font-extrabold text-primary md:text-2xl">
                      {group.title}
                    </h2>
                  )}
                  <FaqAccordion items={group.items} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
