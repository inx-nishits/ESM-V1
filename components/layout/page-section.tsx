import { cn } from "@/lib/utils";
import { PageContainer } from "./page-container";

export interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** default = primary marketing sections; compact = trust strip, sub-sections */
  spacing?: "default" | "compact" | "none";
  /** When true, wraps children in PageContainer (most sections) */
  contained?: boolean;
  containerClassName?: string;
}

const spacingClasses = {
  default: "site-section lg:py-24",
  compact: "py-10 md:py-14 lg:py-16",
  none: "",
} as const;

export function PageSection({
  spacing = "default",
  contained = true,
  containerClassName,
  className,
  children,
  ...props
}: PageSectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)} {...props}>
      {contained ? (
        <PageContainer className={containerClassName}>{children}</PageContainer>
      ) : (
        children
      )}
    </section>
  );
}
