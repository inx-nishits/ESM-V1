export function HomepageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="min-h-[480px] bg-[var(--esm-navy-900)] md:min-h-[560px]" />

      <div className="border-b border-border bg-card">
        <div className="mx-auto site-container grid gap-6 py-8 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-4">
              <div className="h-12 w-12 rounded-lg bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto site-container space-y-16 py-16">
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="h-10 w-2/3 max-w-md rounded bg-muted" />
          <div className="h-4 w-full max-w-lg rounded bg-muted" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="aspect-[16/10] rounded-lg bg-muted" />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="aspect-[4/3] rounded-lg bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
