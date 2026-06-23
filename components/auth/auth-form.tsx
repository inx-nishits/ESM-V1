"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [password, setPassword] = useState("");
  
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/account/profile");
  }

  return (
    <Card className="overflow-hidden border-border shadow-lg">
      <div className="border-b border-border bg-[var(--esm-navy-50)] px-6 py-8 text-center md:px-8">
        <div className="flex justify-center">
          <SiteLogo />
        </div>
        <h1 className="mt-6 font-display text-2xl font-extrabold text-primary">
          {isLogin ? "Sign in to your account" : "Create a business account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isLogin
            ? "Access order history, saved products, and contract pricing."
            : "Register for tiered pricing and dedicated B2B support."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8">
        {!isLogin && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold">
                  First name *
                </label>
                <Input id="firstName" name="firstName" required autoComplete="given-name" />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold">
                  Last name *
                </label>
                <Input id="lastName" name="lastName" required autoComplete="family-name" />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-semibold">
                Business name (Optional)
              </label>
              <Input id="company" name="company" autoComplete="organization" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">
                Phone number *
              </label>
              <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
            </div>
          </>
        )}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            Work email {isLogin ? "" : "*"}
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label htmlFor="password" className="text-sm font-semibold">
              Password {isLogin ? "" : "*"}
            </label>
            {isLogin && (
              <Link href="/forgot-password" className="text-xs font-semibold text-accent hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>

        {!isLogin && (
          <>
            {/* Password Strength UI */}
            {password.length > 0 && (
              <div className="grid grid-cols-2 gap-2 rounded-md border border-border bg-muted/50 p-3 text-xs">
                <div className={cn("flex items-center gap-1.5", hasLength ? "text-success" : "text-muted-foreground")}>
                  {hasLength ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  8+ characters
                </div>
                <div className={cn("flex items-center gap-1.5", hasUpper ? "text-success" : "text-muted-foreground")}>
                  {hasUpper ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  Uppercase letter
                </div>
                <div className={cn("flex items-center gap-1.5", hasLower ? "text-success" : "text-muted-foreground")}>
                  {hasLower ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  Lowercase letter
                </div>
                <div className={cn("flex items-center gap-1.5", hasNumber ? "text-success" : "text-muted-foreground")}>
                  {hasNumber ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  Number
                </div>
                <div className={cn("flex items-center gap-1.5 col-span-2", hasSymbol ? "text-success" : "text-muted-foreground")}>
                  {hasSymbol ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  Special character
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold">
                Confirm password *
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
              />
            </div>
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms" 
                required 
                className="mt-1 h-4 w-4 shrink-0 rounded-sm border-primary text-accent focus:ring-accent accent-accent cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the <Link href="/terms" className="text-accent hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>. *
              </label>
            </div>
          </>
        )}
        <Button type="submit" size="lg" className="w-full">
          {isLogin ? "Sign in" : "Create account"}
        </Button>
      </form>

      <p className="border-t border-border px-6 py-5 text-center text-sm text-muted-foreground md:px-8">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-accent hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </Card>
  );
}
