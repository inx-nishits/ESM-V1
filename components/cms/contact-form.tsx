"use client";

import { ArrowRight, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SITE_EMAIL, SITE_PHONE } from "@/lib/constants";

const inquiryTypes = [
  "Request a quote",
  "Set up a business account",
  "Product question",
  "Order support",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-12 text-center shadow-sm md:px-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--esm-coral-100)] text-accent">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <p className="mt-5 font-display text-xl font-bold text-primary">Message received</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Our sales team will respond within one business day. For urgent orders, call{" "}
          <a href={`tel:${SITE_PHONE.replace(/\D/g, "")}`} className="font-semibold text-accent">
            {SITE_PHONE}
          </a>
          .
        </p>
        <Button className="mt-8" variant="outline" asChild>
          <Link href="/shop">Browse catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div>
        <h2 className="font-display text-xl font-extrabold text-primary md:text-2xl">
          Send us a message
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your company details and we&apos;ll route your request to the right specialist.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName">
          <Input id="firstName" name="firstName" required autoComplete="given-name" />
        </Field>
        <Field label="Last name" htmlFor="lastName">
          <Input id="lastName" name="lastName" required autoComplete="family-name" />
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Company" htmlFor="company">
          <Input id="company" name="company" required autoComplete="organization" />
        </Field>
        <Field label="Inquiry type" htmlFor="inquiryType">
          <Select name="inquiryType" required defaultValue="">
            <SelectTrigger id="inquiryType" className="h-11">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {inquiryTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Work email" htmlFor="email">
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
      </div>

      <Field label="How can we help?" htmlFor="message" className="mt-4">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Include SKU, case quantities, or delivery timeline if requesting a quote."
          className={cn(
            "flex w-full rounded-md border border-input bg-background px-4 py-3 text-sm shadow-xs",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        />
      </Field>

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        Send message
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactInfoPanel() {
  const cards = [
    {
      icon: Phone,
      title: "Call sales",
      body: SITE_PHONE,
      href: `tel:${SITE_PHONE.replace(/\D/g, "")}`,
      cta: "Call now",
    },
    {
      icon: Mail,
      title: "Email",
      body: SITE_EMAIL,
      href: `mailto:${SITE_EMAIL}`,
      cta: "Send email",
    },
    {
      icon: MapPin,
      title: "West Chicago HQ",
      body: "1130 Carolina Drive Unit A\nWest Chicago, IL 60185",
      href: "https://maps.google.com/?q=1130+Carolina+Drive+Unit+A+West+Chicago+IL+60185",
      cta: "Get directions",
      external: true,
    },
    {
      icon: Clock,
      title: "Business hours",
      body: "Monday–Friday\n8:00 AM – 5:00 PM Central",
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--esm-navy-50)] text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {card.title}
                </p>
                <p className="mt-1 whitespace-pre-line text-sm font-semibold leading-relaxed text-primary">
                  {card.body}
                </p>
                {card.href && (
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline"
                  >
                    {card.cta}
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="rounded-xl border border-[var(--esm-coral-200)] bg-[var(--esm-coral-50)]/50 p-5">
        <p className="font-display text-sm font-bold text-primary">Need answers fast?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse ordering, shipping, and FDA Gear questions in our FAQ.
        </p>
        <Button variant="outline" size="sm" className="mt-4 bg-background" asChild>
          <Link href="/faq">View FAQ</Link>
        </Button>
      </div>
    </div>
  );
}

export function ContactProcessSteps() {
  const steps = [
    {
      step: "01",
      title: "Tell us what you need",
      body: "Share SKUs, case quantities, and delivery location — or ask about account setup.",
    },
    {
      step: "02",
      title: "Get a tailored response",
      body: "Our West Chicago team replies same business day with pricing, lead times, and documentation.",
    },
    {
      step: "03",
      title: "Place your first order",
      body: "Checkout online, by phone, or email once your business account is approved.",
    },
  ];

  return (
    <section className="border-t border-border bg-muted/30 site-section-compact">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">What to expect</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-primary md:text-3xl">
            Simple, responsive B2B support
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((item) => (
            <li
              key={item.step}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="font-mono text-xs font-bold text-[var(--esm-coral-500)]">
                {item.step}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
