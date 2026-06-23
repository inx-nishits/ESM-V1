"use client";

import { ChevronDown, LogIn, Package, MapPin, User, UserPlus, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const router = useRouter();

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
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setShowLogoutAlert(true);
              }}
              className="text-[var(--esm-coral-600)] focus:text-[var(--esm-coral-700)]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>B2B Account</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Create account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/orders" className="text-muted-foreground">
                <Package className="mr-2 h-4 w-4" />
                Track an order
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
      
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
    </DropdownMenu>
  );
}
