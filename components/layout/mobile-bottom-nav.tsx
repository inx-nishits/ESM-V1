"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cart } = useCart();
  const itemCount = cart?.lines?.length || 0;

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/shop", icon: Search },
    { label: "Cart", href: "/cart", icon: ShoppingBag, badge: itemCount },
    { label: "Account", href: "/account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-white pb-safe pt-1 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:hidden">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive ? "text-accent" : "text-muted-foreground hover:text-primary"
            )}
          >
            <div className="relative">
              <item.icon className={cn("h-6 w-6", isActive && "fill-accent/10")} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium leading-none">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
