import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/seo/json-ld";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground">{item.name}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-primary">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
