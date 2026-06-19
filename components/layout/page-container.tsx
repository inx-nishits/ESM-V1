import { cn } from "@/lib/utils";

type PageContainerElement = "div" | "section" | "article" | "main" | "header" | "footer";

export interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: PageContainerElement;
  /** default = 1280px site grid; narrow = forms/checkout; prose = long-form text */
  size?: "default" | "narrow" | "prose";
  /** Vertical padding preset — use on page roots; sections use PageSection instead */
  padY?: "page" | "compact" | "none";
}

const sizeClasses = {
  default: "max-w-[var(--container-max)]",
  narrow: "max-w-4xl",
  prose: "max-w-3xl",
} as const;

const padYClasses = {
  page: "py-12 md:py-16 lg:py-20",
  compact: "py-10 md:py-14",
  none: "",
} as const;

/** @deprecated Use className="site-container" directly */
export function pageShellClassName(className?: string) {
  return cn("site-container", className);
}

export function PageContainer({
  as: Component = "div",
  size = "default",
  padY = "none",
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <Component
      className={cn(
        "site-container",
        size === "narrow" && "max-w-4xl",
        size === "prose" && "max-w-3xl",
        padYClasses[padY],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
