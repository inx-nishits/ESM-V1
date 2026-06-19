"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_KEY } from "@/lib/constants";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-card p-4 shadow-[0_-8px_30px_rgba(6,21,37,0.12)] md:p-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="mx-auto site-container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p id="cookie-consent-title" className="font-display text-sm font-bold text-foreground">
            Cookie preferences
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-sm text-muted-foreground">
            We use essential cookies to keep your cart and session working, and optional analytics
            to improve our B2B storefront. See our{" "}
            <Link href="/privacy" className="font-medium text-primary underline-offset-2 hover:underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button variant="outline" size="sm" onClick={decline}>
            Essential only
          </Button>
          <Button variant="default" size="sm" onClick={accept}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
