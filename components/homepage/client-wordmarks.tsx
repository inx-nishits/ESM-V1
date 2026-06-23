import { cn } from "@/lib/utils";
import type { ClientLogo } from "@/types/cms";
import { Sparkles } from "lucide-react";

interface ClientWordmarksProps {
  clients: ClientLogo[];
  className?: string;
  dark?: boolean;
}

export function ClientWordmarks({ clients, className, dark = false }: ClientWordmarksProps) {
  // Use 4 copies to ensure the marquee is wide enough for all screens
  // and seamlessly loops at translateX(-50%)
  const duplicated = [...clients, ...clients, ...clients, ...clients];

  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      {/* Fade masks for elegant scrolling edges */}
      <div className={cn(
        "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-48 bg-gradient-to-r to-transparent",
        dark ? "from-zinc-950" : "from-background"
      )} />
      <div className={cn(
        "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-48 bg-gradient-to-l to-transparent",
        dark ? "from-zinc-950" : "from-background"
      )} />
      
      <div className="flex items-center py-4">
        <ul className={cn("flex w-max items-center", "animate-marquee hover:[animation-play-state:paused]")}>
          {duplicated.map((client, index) => (
            <li key={`${client.id}-${index}`} className="flex items-center">
              <div
                className="group flex cursor-default items-center justify-center px-8 transition-all duration-300 hover:scale-110"
                title={client.name}
                aria-label={client.name}
              >
                <span className={cn(
                  "whitespace-nowrap font-display text-2xl sm:text-4xl font-black uppercase tracking-tighter transition-colors duration-300",
                  dark 
                    ? "text-zinc-600 group-hover:text-zinc-100" 
                    : "text-muted-foreground/40 group-hover:text-primary"
                )}>
                  {client.wordmark}
                </span>
              </div>
              <Sparkles className={cn("h-6 w-6 sm:h-8 sm:w-8 shrink-0", dark ? "text-accent/40" : "text-accent/30")} aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
