import { cn } from "@/lib/utils";
import type { ClientLogo } from "@/types/cms";

interface ClientWordmarksProps {
  clients: ClientLogo[];
  className?: string;
}

function Wordmark({ client }: { client: ClientLogo }) {
  return (
    <div
      className="flex h-14 shrink-0 items-center justify-center rounded-md border border-border/60 bg-card px-5 shadow-sm"
      title={client.name}
      aria-label={client.name}
    >
      <span className="whitespace-nowrap font-display text-sm font-extrabold tracking-tight text-primary/55 md:text-base">
        {client.wordmark}
      </span>
    </div>
  );
}

export function ClientWordmarks({ clients, className }: ClientWordmarksProps) {
  const duplicated = [...clients, ...clients];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <ul className="hidden flex-wrap items-center justify-end gap-3 lg:flex">
        {clients.map((client) => (
          <li key={client.id}>
            <Wordmark client={client} />
          </li>
        ))}
      </ul>

      <div className="lg:hidden">
        <ul className={cn("flex w-max gap-4", "animate-marquee")}>
          {duplicated.map((client, index) => (
            <li key={`${client.id}-${index}`}>
              <Wordmark client={client} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
