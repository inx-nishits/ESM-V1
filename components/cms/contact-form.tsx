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
    <form onSubmit={handleSubmit}>
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
            <SelectTrigger id="inquiryType" className="h-11 w-full">
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
            "flex w-full rounded-lg border-2 border-transparent bg-muted/50 px-4 py-3 text-sm shadow-sm transition-colors",
            "hover:border-border focus-visible:border-primary focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10",
          )}
        />
      </Field>

      <Button type="submit" size="lg" className="mt-8 h-14 w-full text-base font-bold sm:w-auto px-10 transition-transform hover:scale-105">
        Send message
        <ArrowRight className="h-4 w-4 ml-2" />
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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">Direct Contacts</h3>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-white/70">Skip the form and reach out directly.</p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="group flex items-start gap-4 sm:gap-5">
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--esm-coral-400)] transition-colors group-hover:bg-[var(--esm-coral-500)] group-hover:text-white">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-white/60">
                  {card.title}
                </p>
                <p className="mt-0.5 sm:mt-1 whitespace-pre-line text-sm sm:text-base font-medium leading-relaxed text-white">
                  {card.body}
                </p>
                {card.href && (
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="mt-2 inline-flex text-sm font-bold text-[var(--esm-coral-400)] hover:text-white transition-colors"
                  >
                    {card.cta} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
        <p className="font-display text-base font-bold text-white">Need answers fast?</p>
        <p className="mt-2 text-sm text-white/70">
          Browse ordering, shipping, and FDA Gear questions in our FAQ.
        </p>
        <Button variant="outline" className="mt-5 h-11 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white w-full" asChild>
          <Link href="/faq">Visit FAQ</Link>
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
    <section className="bg-[var(--esm-navy-50)] py-12 sm:py-16 md:py-24">
      <div className="site-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] text-[var(--esm-coral-600)]">What to expect</p>
          <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl font-extrabold text-[var(--esm-navy-900)] md:text-4xl lg:text-5xl">
            Simple, responsive B2B support
          </h2>
        </div>
        
        <div className="mx-auto mt-10 sm:mt-16 max-w-5xl">
          <div className="grid gap-6 sm:gap-10 md:grid-cols-3 relative">
            {/* Connecting Line for Timeline */}
            <div className="absolute top-6 sm:top-8 left-12 right-12 h-0.5 bg-border/60 hidden md:block" />
            
            {steps.map((item) => (
              <div key={item.step} className="relative z-10 flex flex-row items-start text-left md:flex-col md:items-center md:text-center gap-4 md:gap-0 bg-white/50 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none">
                <span className="shrink-0 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-white shadow-md shadow-black/5 border-[3px] md:border-4 border-[var(--esm-navy-50)] font-display text-lg md:text-xl font-bold text-[var(--esm-navy-900)] transition-transform hover:scale-110">
                  {item.step}
                </span>
                <div className="flex-1">
                  <h3 className="mt-0.5 md:mt-8 font-display text-base sm:text-lg md:text-xl font-bold text-[var(--esm-navy-900)]">{item.title}</h3>
                  <p className="mt-1 sm:mt-1.5 md:mt-3 text-[13px] sm:text-sm md:text-base leading-relaxed text-[var(--esm-navy-900)]/75">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
