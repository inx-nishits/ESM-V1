"use client";

import { ChevronDown, LogIn, Package, MapPin, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/session-provider";

interface AccountMenuProps {
  className?: string;
}

export function AccountMenu({ className }: AccountMenuProps) {
  const { user, isAuthenticated } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "hidden gap-1.5 px-3 text-sm font-medium text-foreground hover:text-primary md:inline-flex",
            className,
          )}
        >
          <User className="h-4 w-4" />
          <span>{isAuthenticated && user ? user.firstName : "Account"}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isAuthenticated && user ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-semibold text-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/profile">
                <User />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/orders">
                <Package />
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/addresses">
                <MapPin />
                Addresses
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>B2B Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogIn />
                Sign in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">
                <UserPlus />
                Create account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/orders" className="text-muted-foreground">
                <Package />
                Track an order
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
