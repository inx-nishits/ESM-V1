import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO_ALT, SITE_LOGO_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  /** default = white logo on navy badge (light header). onDark = white logo on dark backgrounds. */
  variant?: "default" | "onDark";
}

export function SiteLogo({ className, variant = "default" }: SiteLogoProps) {
  const onDark = variant === "onDark";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center transition-opacity hover:opacity-90",
        onDark
          ? "rounded-md px-1 py-0.5"
          : "rounded-md bg-[var(--esm-navy-900)] px-3 py-1.5 shadow-sm ring-1 ring-[var(--esm-navy-900)]/10",
        className,
      )}
      aria-label={`${SITE_LOGO_ALT} — Home`}
    >
      <Image
        src={SITE_LOGO_URL}
        alt={SITE_LOGO_ALT}
        width={300}
        height={300}
        priority
        sizes="(max-width: 768px) 120px, 140px"
        className="h-8 w-auto object-contain md:h-9"
      />
    </Link>
  );
}
