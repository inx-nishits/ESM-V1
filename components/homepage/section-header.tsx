import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  overline?: string;
  headline: string;
  subheadline?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  headlineId?: string;
}

export function SectionHeader({
  overline,
  headline,
  subheadline,
  align = "left",
  className,
  dark = false,
  headlineId,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        centered && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      {overline && (
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.2em]",
            dark ? "text-[var(--esm-coral-400)]" : "text-accent",
          )}
        >
          {overline}
        </p>
      )}
      <h2
        id={headlineId}
        className={cn(
          "font-display text-2xl font-extrabold tracking-tight md:text-3xl lg:text-4xl",
          overline && "mt-2",
          dark ? "text-white" : "text-primary",
        )}
      >
        {headline}
      </h2>
      {subheadline && (
        <p
          className={cn(
            "mt-3 text-sm sm:text-base leading-relaxed md:text-lg",
            dark ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {subheadline}
        </p>
      )}
    </div>
  );
}
