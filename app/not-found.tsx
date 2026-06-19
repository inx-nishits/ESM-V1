import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="site-container site-page">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="bg-[var(--esm-navy-900)] px-6 py-12 text-center md:px-10 md:py-14">
          <p className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-[var(--esm-coral-400)]">
            404
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-white md:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
            The page you are looking for does not exist, moved, or the link may be outdated.
          </p>
        </div>
        <div className="px-6 py-8 md:px-10">
          <p className="text-sm font-semibold text-primary">Try one of these instead</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Button asChild className="justify-start">
              <Link href="/shop">
                <Search className="h-4 w-4" />
                Browse products
              </Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/collections">View collections</Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/contact">Contact sales</Link>
            </Button>
            <Button variant="outline" asChild className="justify-start">
              <Link href="/faq">Read FAQ</Link>
            </Button>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
            >
              Back to homepage
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
