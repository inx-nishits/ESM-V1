export function RouteScaffold({ route }: { route: string }) {
  return (
    <div className="site-container site-page">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Foundation scaffold
      </p>
      <p className="mt-2 font-mono text-sm text-foreground">{route}</p>
      <p className="mt-4 text-sm text-muted-foreground">
        Route registered — page implementation pending.
      </p>
    </div>
  );
}
