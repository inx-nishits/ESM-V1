"use client";

import {
  ChevronRight,
  LogIn,
  Mail,
  Menu,
  Phone,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CategoryIcon } from "@/lib/navigation/category-icons";
import { SITE_EMAIL, SITE_PHONE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { NavItem } from "@/types/cms";
import { SiteLogo } from "./site-logo";

interface MobileNavDrawerProps {
  categories: Category[];
  navigation: NavItem[];
  className?: string;
}

export function MobileNavDrawer({ categories, navigation, className }: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("lg:hidden", className)}
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-full flex-col gap-0 p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border px-6 py-5 text-left items-start">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SiteLogo />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <ul className="mt-2 space-y-1">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/collections/${category.slug}`}
                  className="flex items-center gap-3 rounded-md px-2 py-3 transition-colors hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-primary">
                    <CategoryIcon slug={category.slug} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {category.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {category.productCount} products
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <p className="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Menu
          </p>
          <ul className="mt-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-2 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/compare"
                className="block rounded-md px-2 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                Compare products
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-border bg-muted/40 p-4">
          <div className="space-y-2 text-sm">
            <a
              href={`tel:${SITE_PHONE.replace(/\D/g, "")}`}
              className="flex items-center gap-2 font-medium text-foreground"
            >
              <Phone className="h-4 w-4 text-accent" />
              {SITE_PHONE}
            </a>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Mail className="h-4 w-4 text-accent" />
              {SITE_EMAIL}
            </a>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/signup" onClick={() => setOpen(false)}>
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
