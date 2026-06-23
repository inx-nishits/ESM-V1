"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="w-full">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          {isLogin
            ? "Sign in to access your business pricing and orders."
            : "Register for tiered pricing and dedicated B2B support."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="firstName" className="text-sm font-semibold text-primary">
                  First name *
                </label>
                <Input id="firstName" name="firstName" required autoComplete="given-name" className="h-12 bg-gray-50/50" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="lastName" className="text-sm font-semibold text-primary">
                  Last name *
                </label>
                <Input id="lastName" name="lastName" required autoComplete="family-name" className="h-12 bg-gray-50/50" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-sm font-semibold text-primary">
                Business name (Optional)
              </label>
              <Input id="company" name="company" autoComplete="organization" className="h-12 bg-gray-50/50" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-sm font-semibold text-primary">
                Phone number *
              </label>
              <Input id="phone" name="phone" type="tel" required autoComplete="tel" className="h-12 bg-gray-50/50" />
            </div>
          </>
        )}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-primary">
            Work email {isLogin ? "" : "*"}
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" className="h-12 bg-gray-50/50" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-primary">
              Password {isLogin ? "" : "*"}
            </label>
            {isLogin && (
              <Link href="/forgot-password" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
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
            className="h-12 bg-gray-50/50"
          />
        </div>

        {!isLogin && (
          <>
            {/* Password Strength UI */}
            {password.length > 0 && (
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-gray-50/80 p-4 text-xs font-medium">
                <div className={cn("flex items-center gap-2", hasLength ? "text-success" : "text-muted-foreground")}>
                  {hasLength ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  8+ characters
                </div>
                <div className={cn("flex items-center gap-2", hasUpper ? "text-success" : "text-muted-foreground")}>
                  {hasUpper ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  Uppercase letter
                </div>
                <div className={cn("flex items-center gap-2", hasLower ? "text-success" : "text-muted-foreground")}>
                  {hasLower ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  Lowercase letter
                </div>
                <div className={cn("flex items-center gap-2", hasNumber ? "text-success" : "text-muted-foreground")}>
                  {hasNumber ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  Number
                </div>
                <div className={cn("flex items-center gap-2 col-span-2", hasSymbol ? "text-success" : "text-muted-foreground")}>
                  {hasSymbol ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  Special character
                </div>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-primary">
                Confirm password *
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                className="h-12 bg-gray-50/50"
              />
            </div>
            <div className="flex items-start gap-3 pt-2">
              <Checkbox 
                id="terms" 
                name="terms" 
                required 
                className="mt-1 transition-all"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                I agree to the <Link href="/terms" className="font-medium text-primary hover:text-accent transition-colors">Terms of Service</Link> and <Link href="/privacy" className="font-medium text-primary hover:text-accent transition-colors">Privacy Policy</Link>. *
              </label>
            </div>
          </>
        )}
        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all">
            {isLogin ? "Sign in to your account" : "Create business account"}
          </Button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:text-accent transition-colors">
              Sign up today
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:text-accent transition-colors">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
