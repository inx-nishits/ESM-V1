"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, MapPin, LogOut } from "lucide-react";
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

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ... existing code
export function AccountSidebar() {
  const pathname = usePathname();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="flex flex-row overflow-x-auto pb-2 space-x-2 space-y-0 lg:flex-col lg:space-y-1 lg:space-x-0 lg:overflow-visible lg:pb-0 no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
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
        
        <button
          onClick={() => setShowLogoutAlert(true)}
          className="flex shrink-0 w-auto lg:w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
        >
          <LogOut className="h-5 w-5 text-muted-foreground" />
          Sign out
        </button>
      </nav>

      <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign back in to access your B2B pricing, address book, and order history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                setShowLogoutAlert(false);
                router.push("/login");
              }}
            >
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
