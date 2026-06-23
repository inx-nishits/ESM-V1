"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface CheckoutStepFormProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  nextHref?: string;
  backHref?: string;
  hideNext?: boolean;
  children: React.ReactNode;
}

export function CheckoutStepForm({
  step,
  totalSteps,
  title,
  description,
  nextHref,
  backHref,
  hideNext,
  children,
}: CheckoutStepFormProps) {
  const router = useRouter();

  function handleContinue(event: React.FormEvent) {
    event.preventDefault();
    if (nextHref) router.push(nextHref);
  }

  return (
    <div className="max-w-xl">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Step {step} of {totalSteps}
      </p>
      <h1 className="mt-2 font-display text-2xl font-extrabold text-primary">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <form onSubmit={handleContinue} className="mt-8">
        {children}
        <div className="mt-8 flex gap-3">
          {!hideNext && nextHref && (
            <Button type="submit" size="lg">
              Continue
            </Button>
          )}
          {backHref && (
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href={backHref}>Back</Link>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
