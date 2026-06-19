import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { SiteLogo } from "./site-logo";
import { SITE_EMAIL, SITE_NAME, SITE_PHONE } from "@/lib/constants";
import type { NavigationConfig } from "@/types/cms";

interface SiteFooterProps {
  navigation: NavigationConfig;
}

export function SiteFooter({ navigation }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--esm-navy-600)] bg-[var(--esm-navy-900)] text-white">
      <div className="mx-auto site-container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <SiteLogo variant="onDark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {SITE_NAME} delivers FDA-compliant disposable PPE for food processing, healthcare,
              and industrial operations — with case pricing and reliable fulfillment.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navigation.footer.shop.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-[var(--esm-coral-400)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navigation.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-[var(--esm-coral-400)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--esm-coral-400)]" aria-hidden />
                <span>
                  1130 Carolina Drive Unit A
                  <br />
                  West Chicago, IL 60185
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE_PHONE.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--esm-coral-400)]"
                >
                  <Phone className="h-4 w-4 text-[var(--esm-coral-400)]" aria-hidden />
                  {SITE_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[var(--esm-coral-400)]"
                >
                  <Mail className="h-4 w-4 text-[var(--esm-coral-400)]" aria-hidden />
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/50">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            <Link href="/terms" className="transition-colors hover:text-white/80">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              Privacy
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white/80">
              FAQ
            </Link>
            <Link href="/disclaimer" className="transition-colors hover:text-white/80">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
