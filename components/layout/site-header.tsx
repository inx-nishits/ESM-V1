"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { AccountMenu } from "./account-menu";
import { CartBadgeButton } from "./cart-badge-button";
import { GlobalSearch } from "./global-search";
import { MegaMenu } from "./mega-menu";
import { MobileNavDrawer } from "./mobile-nav-drawer";
import { SiteLogo } from "./site-logo";
import { SITE_EMAIL, SITE_PHONE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { NavItem } from "@/types/cms";

interface SiteHeaderProps {
  categories: Category[];
  navigation: NavItem[];
  className?: string;
}

export function SiteHeader({ categories, navigation, className }: SiteHeaderProps) {
  const secondaryNav = navigation.filter(
    (item) => item.label !== "Shop" && item.href !== "/shop",
  );

  return (
    <header className={cn("border-b border-border bg-card", className)}>
      <div className="hidden border-b border-border bg-[var(--esm-navy-50)] lg:block">
        <div className="mx-auto site-container flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6 text-muted-foreground">
            <a
              href={`tel:${SITE_PHONE.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden />
              {SITE_PHONE}
            </a>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Mail className="h-3.5 w-3.5 text-accent" aria-hidden />
              {SITE_EMAIL}
            </a>
          </div>
          <p className="font-medium text-primary">
            Trusted PPE supplier since 1998 · B2B case pricing
          </p>
        </div>
      </div>

      <div className="mx-auto site-container flex h-[var(--header-height)] items-center justify-between gap-3 md:gap-4">
        <SiteLogo className="shrink-0" />

        <nav
          className="ml-2 hidden flex-1 items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          <MegaMenu categories={categories} />
          {secondaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <GlobalSearch />
          <AccountMenu />
          <CartBadgeButton />
          <div className="md:hidden">
            <MobileNavDrawer categories={categories} navigation={navigation} />
          </div>
        </div>
      </div>
    </header>
  );
}
