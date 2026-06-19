import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CatalogPaginationProps {
  basePath: string;
  page: number;
  totalPages: number;
  searchParams?: Record<string, string>;
}

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string>,
): string {
  const params = new URLSearchParams(searchParams);
  if (page <= 1) params.delete("page");
  else params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function CatalogPagination({
  basePath,
  page,
  totalPages,
  searchParams,
}: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
  );

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      <Button variant="outline" size="icon" disabled={page <= 1} asChild={page > 1}>
        {page > 1 ? (
          <Link href={buildHref(basePath, page - 1, searchParams)} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      {pages.map((p, index) => {
        const prev = pages[index - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;

        return (
          <span key={p} className="flex items-center gap-1">
            {showEllipsis && <span className="px-2 text-muted-foreground">…</span>}
            <Link
              href={buildHref(basePath, p, searchParams)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "inline-flex h-10 min-w-10 items-center justify-center rounded-md px-3 text-sm font-semibold transition-colors",
                p === page
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-primary",
              )}
            >
              {p}
            </Link>
          </span>
        );
      })}

      <Button variant="outline" size="icon" disabled={page >= totalPages} asChild={page < totalPages}>
        {page < totalPages ? (
          <Link href={buildHref(basePath, page + 1, searchParams)} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  );
}
