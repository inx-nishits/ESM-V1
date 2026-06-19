"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">An unexpected error occurred.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md bg-accent px-6 py-2 text-sm font-semibold text-accent-foreground"
      >
        Try again
      </button>
    </div>
  );
}
