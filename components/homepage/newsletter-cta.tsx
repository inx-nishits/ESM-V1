"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterCtaProps {
  headline: string;
  subheadline: string;
}

export function NewsletterCta({ headline, subheadline }: NewsletterCtaProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      className="relative border-t-4 border-accent bg-gradient-to-b from-[var(--esm-navy-700)] to-[var(--esm-navy-900)] site-section"
      aria-labelledby="newsletter-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(247,125,77,0.12),transparent_55%)]" />
      <div className="relative site-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="newsletter-heading"
            className="font-display text-2xl font-extrabold tracking-tight text-white md:text-3xl"
          >
            {headline}
          </h2>
          <p className="mt-3 text-base text-white/75 md:text-lg">{subheadline}</p>

          {submitted ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-4 text-sm font-medium text-white">
              <CheckCircle2 className="h-5 w-5 text-[var(--esm-coral-400)]" />
              Thanks — we&apos;ll be in touch with business account updates.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Work email address"
                className="h-12 border-white/25 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-[var(--esm-coral-400)] focus-visible:ring-[var(--esm-coral-400)] sm:max-w-md sm:flex-1"
                aria-label="Work email address"
              />
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="shrink-0 bg-accent hover:bg-[var(--esm-coral-600)]"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/50">
            Business accounts only. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
