"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Profile",
    href: "/account/profile",
    icon: User,
  },
  {
    title: "Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              isActive 
                ? "bg-[var(--esm-coral-500)]/10 text-[var(--esm-coral-600)]" 
                : "text-muted-foreground hover:bg-muted hover:text-primary"
            )}
          >
            <item.icon className={cn("h-5 w-5", isActive ? "text-[var(--esm-coral-600)]" : "text-muted-foreground")} />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
