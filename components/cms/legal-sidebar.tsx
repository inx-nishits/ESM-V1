import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CmsPageSlug } from "@/types/cms";

const legalLinks: { slug: CmsPageSlug; label: string }[] = [
  { slug: "terms", label: "Terms & Conditions" },
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "disclaimer", label: "Disclaimer" },
];

interface LegalSidebarProps {
  activeSlug: CmsPageSlug;
  className?: string;
}

export function LegalSidebar({ activeSlug, className }: LegalSidebarProps) {
  return (
    <nav
      className={cn("rounded-xl border border-border bg-card p-4 shadow-sm md:p-5", className)}
      aria-label="Legal documents"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Policies</p>
      <ul className="mt-3 space-y-1">
        {legalLinks.map((link) => (
          <li key={link.slug}>
            <Link
              href={`/${link.slug}`}
              className={cn(
                "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeSlug === link.slug
                  ? "bg-[var(--esm-navy-50)] text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-primary",
              )}
              aria-current={activeSlug === link.slug ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        Questions about our policies?{" "}
        <Link href="/contact" className="font-semibold text-accent hover:underline">
          Contact sales
        </Link>
      </p>
    </nav>
  );
}
